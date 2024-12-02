une application simple d'inscription avec Node.js et Express en version 1.0. L'application aura les fonctionnalités suivantes :

Système d'inscription : Permet aux utilisateurs de s'inscrire.
Message de remerciement : Affiche un message après l'inscription réussie.
Authentification : Vérifie les utilisateurs avec leurs informations d'identification.
Étapes à suivre
1. Initialisation du projet Node.js
Commencez par créer un projet Node.js et installer les dépendances nécessaires.

mkdir inscription-app
cd inscription-app
npm init -y
npm install express bcryptjs body-parser
express : framework pour créer l'API.
bcryptjs : pour hacher les mots de passe.
body-parser : pour parser les données envoyées par les utilisateurs.
2. Créer l'API Express
Créez un fichier server.js qui va contenir votre serveur Express et l'API d'inscription.

