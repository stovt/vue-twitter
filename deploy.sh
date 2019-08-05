#!/usr/bin/env sh

set -e

yarn run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:stovt/vue-boilerplate.git master:gh-pages

cd -