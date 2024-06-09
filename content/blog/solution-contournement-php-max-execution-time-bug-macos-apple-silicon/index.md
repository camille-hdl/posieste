---
title: Solution pour PHP max_execution_time atteint trop tôt sur Apple Silicon
date: "2024-06-09T11:00:00.000Z"
description: Concerne php-fpm et le serveur intégré, sur macOS > 14 avec puces M1/M2/M3
---

Un bug dans PHP provoque le déclenchement précoce de l'erreur "Max execution time of X seconds exceeded", parfois instantanément, sur macOS 14 Sonoma avec puces Apple Silicon (M1/M2/M3).

J'ai rencontré l'erreur sur macOS 14.5 et puce M3 pro, mais d'autres utilisateurs l'ont signalé sur d'autres configurations.

## Solution temporaire

Assigner une très grande valeur à `max_execution_time` dans php.ini :

```ini

max_execution_time=99999999
```

Utiliser `0` ou `-1` ne résoud pas le problème.

## Solution à long-terme

Un correctif officiel sera disponible dans PHP 8.2 et 8.3. Il n'est pas encore intégré dans 8.2.19.  

Pour plus d'informations, voir :  
- https://github.com/php/php-src/issues/12814
- https://github.com/php/php-src/pull/13567/files

PHP 8.1 n'étant plus maintenu, il ne devrait pas recevoir de correctif officiel. En revanche, la [formule homebrew de shivammathur](https://github.com/shivammathur/homebrew-php/issues/2732) a été patchée pour corriger le bug.

