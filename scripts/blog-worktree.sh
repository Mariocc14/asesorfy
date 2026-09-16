#!/usr/bin/env bash
# Árbol de trabajo aislado para publicar artículos en el blog de Asesorfy.
#
# La tarea diaria no puede escribir en el repositorio de siempre: puede haber una
# sesión abierta con cambios sin guardar. Esto crea una copia aparte a partir de
# `origin/main`, se trabaja ahí y se borra al terminar. El árbol de trabajo real
# no se toca en ningún momento.
#
#   scripts/blog-worktree.sh open
#   scripts/blog-worktree.sh publish <ruta> "<mensaje>"
#   scripts/blog-worktree.sh close <ruta>
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cmd="${1:-}"

die() { echo "blog-worktree: $1" >&2; exit 1; }

# Ficheros que un artículo nuevo puede tocar. Cualquier otro cambio aborta la publicación.
# Se permite editar artículos antiguos (blog-*.html) solo para añadir enlaces al nuevo.
ALLOWED='^(blog-[^/]+\.html$|blog\.html$|sitemap\.xml$|plan-editorial-seo\.md$|editorial/topic-queue\.json$|llms\.txt$)'

case "$cmd" in
  open)
    git -C "$REPO" fetch --quiet origin main || die "no se pudo traer origin/main"
    stamp="$(date +%Y%m%d-%H%M%S)"
    path="/tmp/asesorfy-blog-$stamp"
    branch="blog/auto-$stamp"
    git -C "$REPO" worktree add --quiet -b "$branch" "$path" origin/main \
      || die "no se pudo crear el árbol de trabajo"
    echo "$path"
    ;;

  publish)
    path="${2:-}"; msg="${3:-}"
    [ -d "$path" ] || die "ruta no válida: $path"
    [ -n "$msg" ] || die "falta el mensaje de commit"

    # llms.txt se regenera siempre a partir de los artículos: nunca se edita a mano.
    node "$REPO/scripts/build-llms.mjs" "$path" >/dev/null || die "no se pudo regenerar llms.txt"

    fuera="$(git -C "$path" status --porcelain --untracked-files=all | awk '{print $2}' \
      | grep -Ev "$ALLOWED" || true)"
    if [ -n "$fuera" ]; then
      die "hay cambios fuera del blog, no se publica:
$fuera"
    fi
    nuevo="$(git -C "$path" status --porcelain --untracked-files=all | awk '$1=="??" && $2 ~ /^blog-.*\.html$/ {print $2}')"
    [ -n "$nuevo" ] || die "no hay ningún artículo nuevo blog-*.html, no se publica"
    [ "$(echo "$nuevo" | wc -l | tr -d ' ')" = "1" ] || die "hay más de un artículo nuevo; publica uno por día"
    editados="$(git -C "$path" status --porcelain | awk '$1=="M" && $2 ~ /^blog-.*\.html$/ {print $2}' | wc -l | tr -d ' ')"
    [ "$editados" -le 3 ] || die "se han editado $editados artículos antiguos; máximo 3 (solo para enlazar al nuevo)"

    node "$REPO/scripts/validate-blog.mjs" "$path" "$nuevo" || die "la validación del artículo ha fallado"

    git -C "$path" add -A -- 'blog-*.html' blog.html sitemap.xml plan-editorial-seo.md editorial/topic-queue.json llms.txt
    git -C "$path" -c user.name="Asesorfy Blog" -c user.email="noreply@asesorfy.app" \
      commit --quiet -m "$msg"

    git -C "$path" fetch --quiet origin main
    git -C "$path" rebase --quiet origin/main || die "el rebase sobre origin/main ha fallado"
    git -C "$path" push --quiet origin HEAD:main || die "el push a main ha fallado"
    echo "publicado: $(git -C "$path" log --oneline -1)"
    ;;

  close)
    path="${2:-}"
    [ -n "$path" ] || die "falta la ruta"
    branch="$(git -C "$path" rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
    git -C "$REPO" worktree remove --force "$path" 2>/dev/null || rm -rf "$path"
    [ -n "$branch" ] && git -C "$REPO" branch -D "$branch" >/dev/null 2>&1 || true
    git -C "$REPO" worktree prune
    echo "cerrado"
    ;;

  *)
    die "uso: $0 open | publish <ruta> <mensaje> | close <ruta>"
    ;;
esac
