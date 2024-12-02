// server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const fs = require('fs');
const { join } = require('path');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Charger les utilisateurs
let users = JSON.parse(fs.readFileSync('data.json', 'utf8'));


//a
 
app.use(express.static(path.join(__dirname, "public/")));

// Route d'inscription
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Vérification si l'utilisateur existe déjà
    if (users.some(user => user.username === username)) {
        return res.status(400).send('Utilisateur déjà existant');
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajouter l'utilisateur à la liste
    users.push({ username, password: hashedPassword });

    // Sauvegarder les données dans le fichier JSON
    fs.writeFileSync('data.json', JSON.stringify(users, null, 2));

    res.status(201).send('Inscription réussie ! Merci pour votre inscription.');
});

// Route d'authentification
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).send('Utilisateur non trouvé');
    }

    // Comparer les mots de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Mot de passe incorrect');
    }

    res.send('Authentification réussie');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
