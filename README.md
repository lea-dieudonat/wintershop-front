# ❄️ WinterShop - Frontend

> Application e-commerce moderne pour équipements de sports d'hiver, développée avec React, TypeScript et Tailwind CSS.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📋 À propos

WinterShop est une application e-commerce full-stack développée comme **projet portfolio** pour démontrer mes compétences en développement web moderne. L'application permet aux utilisateurs de parcourir un catalogue de produits de sports d'hiver, gérer leur panier, passer des commandes et gérer leur profil utilisateur.

**🔗 Backend Repository:** [wintershop-backend](https://github.com/lea-dieudonat/wintershop-backend)

## ✨ Fonctionnalités

### 🛍️ Catalogue & Panier

- Parcours du catalogue de produits avec filtres et recherche
- Page détail produit avec galerie d'images
- Gestion du panier (ajout, modification, suppression)
- Persistance du panier côté serveur

### 🔐 Authentification

- Système d'authentification JWT
- Connexion / Inscription
- Routes protégées
- Gestion de session

### 📦 Commandes

- Processus de checkout complet
- Sélection d'adresse de livraison
- Choix de méthode de livraison
- Intégration Stripe pour le paiement
- Historique des commandes
- Détails et suivi de commande
- Demande d'annulation et de remboursement

### 👤 Profil Utilisateur

- Gestion des informations personnelles
- CRUD complet des adresses de livraison
- Adresse par défaut
- Historique des commandes

### 🌍 Internationalisation

- Support multilingue (FR/EN)
- Utilisation de Tolgee en mode autonome
- Traductions complètes de l'interface

## 🛠️ Stack Technique

### Core

- **React 18** - Bibliothèque UI avec hooks
- **TypeScript 5** - Typage statique
- **Vite 6** - Build tool moderne et rapide
- **React Router 7** - Routing côté client

### État & Data Fetching

- **React Query (TanStack Query)** - Gestion de l'état serveur
- **Axios** - Client HTTP avec intercepteurs

### Styling

- **Tailwind CSS 3** - Framework CSS utility-first
- **Responsive Design** - Mobile-first approach

### Paiement

- **Stripe Checkout** - Intégration de paiement sécurisée

### Internationalisation

- **Tolgee** - i18n avec mode autonome (pas de dépendance externe)

### Qualité du Code

- **ESLint** - Linting
- **Prettier** - Formatage du code
- **TypeScript Strict Mode** - Typage strict

## 🚀 Installation

### Prérequis

- Node.js >= 20.0.0
- npm ou yarn
- Backend WinterShop en cours d'exécution

### Installation locale

```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/wintershop-frontend.git
cd wintershop-frontend

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local

# 4. Lancer le serveur de développement
npm run dev
```

### Variables d'environnement

Créer un fichier `.env.local` :

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### Scripts disponibles

```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build de production
npm run lint         # Linter le code
npm run type-check   # Vérifier les types TypeScript
```

## 📁 Structure du Projet

```
src/
├── api/                # Clients API (axios)
├── components/         # Composants réutilisables
│   ├── ui/            # Composants UI de base
│   └── layout/        # Composants de mise en page
├── contexts/          # Contextes React (Auth, etc.)
├── features/          # Fonctionnalités par domaine
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   └── products/
├── hooks/             # Hooks React Query personnalisés
├── i18n/              # Configuration i18n & traductions
├── pages/             # Composants de pages
├── router/            # Configuration du routing
├── services/          # Services métier
├── types/             # Types TypeScript
└── utils/             # Fonctions utilitaires
```

## 🎯 Architecture & Patterns

### Clean Architecture

- Séparation claire entre logique métier et UI
- Composants présentationnels vs conteneurs
- Hooks personnalisés pour la logique réutilisable

### State Management

- **React Query** pour l'état serveur (cache, invalidation automatique)
- **Context API** pour l'état global (authentification)
- **useState/useReducer** pour l'état local

### API Communication

- Client Axios centralisé avec intercepteurs
- Gestion automatique des tokens JWT
- Redirection automatique en cas de 401

### Type Safety

- Types TypeScript pour toutes les entités
- DTOs pour les requêtes/réponses API
- Validation des formulaires

## 🔒 Sécurité

- Tokens JWT stockés dans localStorage
- Routes protégées avec HOC `ProtectedRoute`
- Refresh automatique du token
- Validation côté client et serveur
- Protection CSRF

## 🌐 Intégration Backend

Cette application communique avec l'API REST Symfony :

**Endpoints principaux :**

- `POST /api/login` - Authentification
- `GET /api/products` - Liste des produits
- `GET /api/cart` - Panier utilisateur
- `POST /api/checkout` - Créer une session de paiement
- `GET /api/orders` - Historique des commandes
- `GET/POST/PUT/DELETE /api/addresses` - CRUD adresses

Voir le [repository backend](https://github.com/lea-dieudonat/wintershop-backend) pour plus de détails.

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront générés dans `/dist`.

### Déploiement sur Vercel/Netlify

Le projet est prêt pour être déployé sur :

- **Vercel** (recommandé pour React)
- **Netlify**
- **AWS S3 + CloudFront**
- Tout service supportant les SPA

Configuration requise :

- Build command: `npm run build`
- Output directory: `dist`
- Variables d'environnement à configurer

## 🎓 Objectifs d'Apprentissage

Ce projet m'a permis de :

- ✅ Maîtriser React 18 avec hooks modernes
- ✅ Implémenter une architecture clean et scalable
- ✅ Utiliser TypeScript en production
- ✅ Gérer un état complexe avec React Query
- ✅ Intégrer des API tierces (Stripe)
- ✅ Créer une UI responsive avec Tailwind
- ✅ Gérer l'authentification JWT

## 🤝 Contribution

Ce projet étant un portfolio personnel, les contributions ne sont pas acceptées. Cependant, n'hésitez pas à :

- ⭐ Star le projet si vous le trouvez intéressant
- 🐛 Ouvrir une issue pour signaler un bug
- 💡 Partager vos idées d'amélioration

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

⭐ **Si ce projet vous a plu, n'hésitez pas à lui donner une étoile !**
