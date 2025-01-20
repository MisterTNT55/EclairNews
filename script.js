const apiKey = 'cba37f4300a91711f5c5987d9ac29b62'; // Remplacez par votre clé API Mediastack
const newsContainer = document.querySelector('main');
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.get('/api/news', async (req, res) => {
    try {
        const response = await fetch(`http://api.mediastack.com/v1/news?access_key=cba37f4300a91711f5c5987d9ac29b62&languages=fr&limit=10`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`));

// Fonction pour charger les articles depuis Mediastack
async function loadArticles() {
        // Afficher l'animation de chargement
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block'; // Affiche l'animation
    try {
        // API Mediastack : récupérer les 10 dernières actualités en français
        const response = await fetch(`http://api.mediastack.com/v1/news?access_key=${apiKey}&languages=fr&limit=10`);
        const data = await response.json();
        displayArticles(data.data);
    } catch (error) {
        console.error('Erreur lors du chargement des articles :', error);
        newsContainer.innerHTML = `<p>Impossible de charger les articles. Veuillez réessayer plus tard.</p>`;
    }
}

// Fonction pour afficher les articles
function displayArticles(articles) {
    newsContainer.innerHTML = ''; // Réinitialiser le contenu
    articles.forEach(article => {
        const articleElement = document.createElement('section');
        articleElement.classList.add('article');

        // Ajouter une image si elle existe, sinon utiliser une image par défaut
        const image = article.image 
            ? `<img src="${article.image}" alt="Image de l'article">`
            : `<img src="placeholder.jpg" alt="Image par défaut">`;

        articleElement.innerHTML = `
            ${image}
            <h2>${article.title}</h2>
            <p>${article.description || 'Aucune description disponible.'}</p>
            <a href="${article.url}" target="_blank">Lire la suite</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

// Charger les articles au chargement de la page
document.addEventListener('DOMContentLoaded', loadArticles);
