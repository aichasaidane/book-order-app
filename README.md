# Application de Gestion de Commandes de Livres en Ligne 📚

---

## 🎯 Objectif

Créer une mini-application où :  
- Les utilisateurs peuvent consulter des livres disponibles.  
- Passer des commandes.  
- Suivre les commandes.  
- Kafka est utilisé pour notifier un service de log ou d’envoi d’e-mail.  
- Front-end basique (HTML/JS) pour tester les appels API.  
- Tests via Postman.  

---

## 🧱 Architecture choisie

- **Microservice Livres** → REST  
- **Microservice Commandes** → gRPC  
- **Microservice Notification** → Kafka Consumer  
- **API Gateway (Express.js)** → Point d’entrée exposant un endpoint GraphQL  
- **Base de données** : MongoDB  

---

## Technologies

- Node.js (Express.js, gRPC)  
- Kafka.js  
- Apollo Server (GraphQL)  
- MongoDB avec Mongoose  
- Postman (tests)  

---

## Description du fonctionnement

- API Gateway reçoit la commande (REST)  
- Elle transmet au orders-service via gRPC  
- orders-service publie la commande dans Kafka  
- notifications-consumer la reçoit et l’affiche dans son terminal  

---

