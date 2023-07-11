FILES=$(git diff --name-only --diff-filter d | rg -e '\.(svelte|ts|md)$' | xargs)

if [[ ! -z "${FILES}" ]]; then
  yarn run prettier --check $FILES && eslint .
fi
