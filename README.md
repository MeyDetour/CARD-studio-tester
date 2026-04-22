 
# Concept
il y a deux applications : 
- CARD Studio qui permet de créer des jeux de cartes personnalisés, en modifiant n’importe quel élément du jeu et/ou paramètre de la logique.
- Quant à CARD Games, il permet d’accueillir les joueurs ; ils arrivent sur une interface leur permettant de se connecter avec un code et ils rejoignent un menu leur demandant leur pseudo. Ils peuvent sinon choisir de créer une partie parmi plusieurs jeux publics proposés. Dans le cas où un utilisateur de CARD Studio a créé un jeu complet en privé, il obtiendra un code unique. Sur CARD Games, les joueurs pourront alors créer une partie à partir d’un code d’un jeu et non d’un jeu public.


# L'application
CARD Studio tester est une application module de CARD Studio, elle permet aux utilisateurs de tester directement la configuration de leur jeu en ayant la vision sur tous les démons et événements utilisés. Ils ont accès aussi à la vue de chaque utilisateur et peuvent contrôler leurs actions et voir les données relatives.

# Stack technique 
- JavaScript (ES Modules) : langage principal du front-end et de la logique d’interface.
- HTML/CSS : structure des pages et styles des composants.
- Architecture modulaire : séparation en pages, composants, contrôleurs, routeur et helpers.
- WebSocket (Socket.IO côté client) : synchronisation en temps réel des rooms, joueurs et événements de partie.
- API HTTP : récupération des jeux disponibles et de leurs configurations.
- Outils de projet : Makefile pour les commandes de développement et tests JavaScript via tests.js.
# Architecture
 
## Organisation des dossiers

| Dossier | Rôle |
|---------|------|
| **pages/** | Pages principales de l'application (accueil, catalogue jeux, saisie code/pseudo, interface de jeu) |
| **components/** | Composants UI réutilisables (boutons, cartes, messages, salle d'attente) |
| **src/** | Cœur métier : routeur, WebSocket, contrôleurs et helpers |
| **src/router/** | Gère la navigation et le chargement des pages |
| **src/websocket/** | Connexion Socket.IO et gestion des événements temps réel |
| **src/controller/** | Logique métier des actions (parties, messages, joueurs) |
| **src/helpers/** | Fonctions utilitaires (copie de code, etc.) |
| **assets/** | Images et ressources statiques |

## Flux de communication

1. **Utilisateur clique** → **Router** décide quelle page afficher
2. **Page charge** → Utilise **Composants** et appelle **Controllers**
3. **Controller** → Émet des événements via **WebSocket** ou effectue appels **HTTP**
4. **Serveur WebSocket** → Retourne les mises à jour de partie
5. **Composants** → Se réactualisent avec les nouvelles données





# Connexion à un jeu

 
```mermaid
sequenceDiagram
    participant CS as Card Studio (Main App)
    participant Front as Studio Tester (Front)
    participant API as API (Authentification & Data)
    participant WS as Serveur Websocket

    Note over CS, Front: Phase d'Initialisation & Auth
    CS->>Front: Ouvre Tester avec Token + Game ID
    activate Front
    Front->>Front: Stocke Token + ID (Storage)
    Front->>API: Requête GET données Game (avec Token)
    
    alt Token Invalide / Expiré
        API-->>Front: Erreur 401 (Unauthorized)
        Front-->>CS: Redirection pour Reconnexion
        deactivate Front
    else Token Valide
        API-->>Front: Données de la Game (JSON)
        activate Front
    
        Note over Front, WS: Connexion & Création Test
        Front->>WS: Connexion + Demande création session "test"
        WS-->>Front: Confirmation Session Créée
        
        Note right of Front: L'utilisateur configure la simulation<br/>(ex: ajout de bots/joueurs fictifs)
   
        Note over Front, WS: Lancement du Test
        Front->>WS: Lancer la partie de test
        WS->>WS: Initialisation State Machine (Test mode)
        WS-->>Front: Update : État initial complet
    end

    loop Boucle de Test (Temps réel)
        Note right of Front: Action de test de l'utilisateur
        Front->>WS: Envoi action simulée (Joueur X)
        WS->>WS: Calcul logique
        WS-->>Front: Broadcast : Nouvel état du jeu
    end

    Note over Front, WS: Gestion du Refresh (F5)
    Note right of Front: L'utilisateur rafraîchit la page
    Front->>Front: Récupère Token + ID du Storage
    Front->>WS: Reconnexion à la session "test" existante
    WS-->>Front: Update : État actuel du jeu

```

