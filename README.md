# Projet-Software-Engineering

Edouard D'ABOVILLE, Mathéo DUGUE, Victor GELINEAU

## LiveChat – Système de Chat en Temps Réel

Système de chat en temps réel construit avec Node.js, React, et WebSockets via la bibliothèque **socket.io**. L’objectif est de permettre à plusieurs utilisateurs d’échanger des messages instantanément dans différents canaux (channels), tout en offrant des statistiques d’utilisation (nombre de messages, top des canaux, etc.). 

Ce projet fait partie d’un travail scolaire visant à se familiariser avec les applications web et l’usage des technologies courantes dans l’écosystème JavaScript.

## Fonctionnalités Principales

1. **Chat en temps réel** : Envoi et réception instantanés des messages via WebSockets.  
2. **Gestion de canaux (channels)** : Possibilité de créer et rejoindre plusieurs canaux de discussion.  
3. **Historique des discussions** : Consultation de l’historique des messages
5. **Interface conviviale** : Interface web développée en React, conçue pour faciliter la navigation et l’interaction.

## Architecture

1. **Backend** : 
   - Fait office de serveur, écoute sur le port 8080.  
   - Gère les événements WebSockets pour l’échange de messages.  
   - Communique avec PostgreSQL pour stocker et récupérer les messages, et pour fournir des statistiques.
   - Expose une documentation automatisée via Swagger pour visualiser et tester les endpoints.

2. **Frontend** : 
   - Application React (port par défaut 3000 en développement).  
   - Utilise **socket.io-client** pour se connecter au serveur en WebSocket.  
   - Affiche l’interface de chat et les canaux et gère l’envoi/réception de messages.

## **Présentation** : 



https://github.com/user-attachments/assets/03f77090-f8bb-4221-8e5e-17b8bf1692af










