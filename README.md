# covid-app

## Projet de développement Fullstack
FrontEnd Angular dans le dossier vaccination-app
BackEnd Spring Boot dans le dossier covid-api

## Pré-requis
Vous devez posséder :
- JDK >=21.0.1 : https://adoptium.net/fr/temurin/releases/
- Gradle >=8.3 : https://gradle.org/install/
- NodeJS >=21.5 : https://nodejs.org/en/download/current
- PostgreSQL >=15 : https://www.postgresql.org/download/

Vous devez également créer un compte Postgres avec les identifiants postgres/admin une base de données appelée covid-db. En cas de doute consultez le fichier application.yaml.

## Etudiants ayant travaillés sur ce projet
*WAGNER Frédéric*\
*REY Thibault*

## Tâches effectuées dans le projet
Mise en place des features demandées\
Authentification par JWT\
Tests unitaires et tests d'implémentations pour tous les services (les tests d'implémentation empêchent un déploiement en container, penser à les désactiver avant de déployer) \
Mise en place de metrics prometheus (2 timed et 2 counted) accessible à l'URL : http://localhost:8080/actuator/prometheus

## Utilisation
Lancer le backend :
```
cd covid-api
gradle bootRun 
```
Lancer le frontend :
```
cd vaccination-app
npm install
ng serve
```

Vous pouvez accéder au site depuis : http://localhost:4200
Vous pouvez faire tester des call APIS sur : http://localhost:8080
Des comptes sont déjà créés par défaut (email / password): 
- UTILISATEUR : utilisateur@utilisateur.fr / utilisateur123
- MEDECIN : medecin@medecin.fr / medecin123
- ADMIN : admin@admin.fr / admin123
- SUPERADMIN : superadmin@superadmin.fr / superadmin123

2 centres de vaccination sont aussi créés par défaut.