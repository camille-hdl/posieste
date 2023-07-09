---
title: Mode maintenance pour Symfony
date: "2023-07-09T14:35:00.000Z"
description: Utiliser un fichier pour activer un mode maintenance indépendant de l'injection de dépendance et de l'autoloader.
image: symfony-mode-maintenance.jpg
---

Pour activer une page explicative le temps d'effectuer des opérations de maintenance sur le code source d'une application Symfony, on peut se baser sur la présence d'un fichier.

```diff
# Extrait d'un répertoire d'application Symfony
 bin/
     console
 public/
     index.php
+    maintenance.php
+maintenance.sh
+EN_MAINTENANCE # indique une maintenance en cours
```

Des fichiers essentiels de l'application, comme l'autoloader ou le cache du container Symfony, risquent d'être absents ou incomplets durant la maintenance.  

Cela signifie que pour ne pas se stresser, il ne faut pas utiliser l'injection de dépendance.  

On va donc modifier directement les 2 points d'entrée principaux d'une application Symfony :  

```php
// bin/console, tout en haut du fichier

if (is_readable(__DIR__.'/../EN_MAINTENANCE')) {
    echo "Mode maintenance est activé : CLI indisponible.";
    exit(1);
}
```
`exit(1)` retournera un code d'erreur qui pourra être interprété par les éventuelles tâches en arrière-plan qui utilisent la CLI.

```php
// public/index.php, tout en haut du fichier

if (is_readable(__DIR__.'/../EN_MAINTENANCE')) {
    http_response_code(503);
    include "./maintenance.php";
    die();
}
```
Le code de réponse [HTTP 503](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503) est approprié dans le cas d'une indisponibilité du service pour maintenance.  

<section class="warning">
    <p>
        Attention : il est crucial que les réponses 503 retournées durant la maintenance n'ont PAS de header autorisant la mise en cache, sans quoi vos utilisateurs risquent de voir la page explicative après la fin de la maintenance.
    </p>
</section>


```php
// public/maintenance.php
if (!is_readable(__DIR__ . '/../EN_MAINTENANCE')) {
    /**
     * La page de maintenance ne doit pas être visible
     * si le mode maintenance n'est pas actif
     */
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: /");
    die();
}
/** 
 * Ensuite, ajoutez le HTML de la page que vous
 * souhaitez afficher aux utilisateurs.
 */
```

Pour activer et désactiver le mode maintenance, on peut utiliser un script bash `maintenance.sh`.

```bash
#!/bin/bash

ACTION="$1"
MAINTENANCE_FILE=EN_MAINTENANCE

if [ "$ACTION" == activer ];
then
    if [ -f "$MAINTENANCE_FILE" ];
    then
        echo "$MAINTENANCE_FILE existe déjà"
    else
        touch "$MAINTENANCE_FILE"
        chmod 744 "$MAINTENANCE_FILE"
    fi
elif [ "$ACTION" == desactiver ];
then
    if [ -f "$MAINTENANCE_FILE" ];
    then
        if [[ ! -w "$MAINTENANCE_FILE" ]]
        then
            echo "$MAINTENANCE_FILE ne peut pas être supprimé : vérifiez les permissions"
            exit 1
        else
            rm "$MAINTENANCE_FILE"
        fi
    else
        echo "$MAINTENANCE_FILE n'existe pas"
    fi
else
    echo "Utilisation : \`maintenance.sh activer\`, \`maintenance.sh desactiver\`"
fi
```

Utilisation, depuis la racine de l'application : `./maintenance.sh activer`

## Limites

- Si, durant la maintenance, vous devez modifier `bin/console` ou `public/index.php`, vous risquez des complications. Cela dit, cela devrait être rare.
- Si votre application est distribuée sur plusieurs systèmes de fichiers, il faudra créer le fichier `EN_MAINTENANCE` sur chaque système de fichier. Ce problème n'existe pas si vous utilisez plutôt un mode maintenance basé sur un cache partagé.

## Avantages par rapport aux alternatives

Typiquement, cette fonctionnalité est implémentée avec les idiomes d'une application symfony :  
- une variable d'environnement pour l'activer, ou bien un fichier "flag",
- une classe qui offre une API pour vérifier si la mode maintenance est actif ou pas,
- transmettre l'information aux différents services par l'injection de dépendance.

D'autres frameworks, Laravel par exemple, proposent différentes façons de gérer le mode maintenance (notamment [à base de fichiers](https://github.com/laravel/framework/blob/10.x/src/Illuminate/Foundation/FileBasedMaintenanceMode.php)), mais utilisent aussi l'injection de dépendance pour tester si il est activé ou non.

Le problème de cette approche est qu'elle part du principe que les sources de l'application sont présentes, complètes et fonctionnelles, même durant la période de maintenance.  
Par exemple, pour que cela fonctionne, l'autoloader doit être présent et fonctionnel. Or, ce ne sera pas le cas pendant l'installation de vos dépendances.  

Bonne sieste