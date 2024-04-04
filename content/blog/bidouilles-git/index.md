---
title: Bidouilles git
date: "2024-04-04T18:00:00.000Z"
description: Commandes git que j'oublie tout le temps.
---

Quelques commandes, scripts, alias, one-liners autour de `git` que j'oublie tout le temps.

## Commandes
### Exclure des fichiers par pattern
```shell

git status -- ':(exclude)*.min.js'
git diff -- src ':(exclude)*.min.js'
```

ou à l'arrache:
```shell

git status --porcelain |grep -v a-exclure
```


### Déplacer 3 commits (pas encore poussés) vers une autre branche
```shell

# Récupérer et noter les IDs des commits en question
git log
# Revenir sur master, où à la base de la nouvelle racine
git switch master
git switch -c nouvelle-branche
# Appliquer les commits sur la nouvelle branche
git cherry-pick commit1 commit2 commit...
git switch ancienne-branche
# sur la branche originale,
# "annuler" les commits. Par exemple 3 commits:
git reset --hard HEAD~3
```

### Mettre de côté les changements locaux
[git stash](https://camillehdl.dev/git-stash/)

### En résolution de conflit, garder "theirs"
```shell

git checkout --theirs src/
git status |grep "both deleted"|awk '{print $3}'|xargs git rm
```


### Diff entre dernier commit (HEAD) et changements stagés
```shell

git diff HEAD
```

### Trouver un commit en greppant une chaine dans le diff
```shell

# pour rechercher "MA_CHAINE"
git log -SMA_CHAINE
git log -GMA_CHAINE
```

### 20 derniers fichiers ajoutés
```shell

git log --diff-filter=A --summary | grep 'create mode' | head -n 20
```

### ID de la branche active
```shell

git rev-parse --abbrev-ref HEAD
```

### ID court du commit

```shell

git rev-parse --short HEAD
```

## Alias

Chaque alias est une entrée dans `~/.gitconfig`, rubrique `alias`:

```

# ~/.gitconfig
[alias]
    # ...
```
### Liste les branches récentes
```
# inspiration: http://ses4j.github.io/2020/04/01/git-alias-recent-branches/
lb = !git reflog show --pretty=format:'%gs ~ %gd' --date=relative | grep 'checkout:' | grep -oE '[^ ]+ ~ .*' | awk -F~ '!seen[$1]++' | head -n 10 | awk -F' ~ HEAD@{' '{printf(\"  \\033[33m%s: \\033[37m %s\\033[0m\\n\", substr($2, 1, length($2)-1), $1)}'
```

Utilisation: `git lb`

### Ebauche de pull-request à partir des messages de commit en avance de origin/master

```
prdraft = !git --no-pager log --abbrev-commit --reverse origin/master...HEAD
```

Utilisation: `git prdraft`

## Scripts

### Quels fichiers sont modifiés souvent
https://github.com/garybernhardt/dotfiles/blob/main/bin/git-churn

```shell

#!/bin/bash
#
# Corey Haines, Gary Bernhardt
#
# Put this anywhere on your $PATH (~/bin is recommended)
#
# Examples:
#   $ git churn
#   $ git churn app lib
#   $ git churn --since='1 month ago'
#

set -e
git log --all -M -C --name-only --format='format:' "$@" | sort | grep -v '^$' | uniq -c | sort -n
```

## Autres

### `git-fame`: qui a le plus de commits survivants

https://github.com/casperdcl/git-fame

```shell

pip3 install "git+https://github.com/casperdcl/git-fame.git@master#egg=git-fame"

git-fame --excl='(public|bootstrap|doc)/.*' --incl='\.(php|jsx?|html|css|twig|conf|cjs|json|sh|yaml|yml|properties|md)$' --format="csv" -tw
```

### Déterminer quand un commit a été mergé dans quelle branche

https://github.com/mhagger/git-when-merged

```shell

brew install git-when-merged
git when-merged -l 73d7f0806d
```
