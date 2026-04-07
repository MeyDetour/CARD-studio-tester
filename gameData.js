export const originalGameData = {
  roomInDb: {
    id: 1,
    name: "Default Poker",
    image:
      "http://localhost:8000/media/cache/resolve/game_image/images/game/69a5ce026242d.jpg",
    isPublic: true,
    description:
      "Le poker est un jeu de cartes mêlant stratégie et psychologie. L'objectif est de remporter le pot, soit avec la main la plus forte (de la paire à la quinte flush), soit par le bluff en poussant les adversaires à abandonner avant l'abattage final.",
    averageNotes: 0,
    notes: [],
    playerCount: 0,
    gameCount: 0,
    types: "strategy,luck,smart",
    editionHistory: [
      {
        id: "1",
        evenement: "Dragon de feu",
        action: "Carte créée",
        date_relative: "2025-10-09T20:10",
      },
      {
        id: 2,
        evenement: "Deck Arcane",
        action: "Jeu modifié",
        date_relative: "2025-10-10T10:15",
      },
    ],
    globalValue: {
      smallBlind: {
        type: "number",
        value: 1,
      },
      allPlayersHasPlayed: {
        type: "boolean",
        value: false,
      },
      currentBet: {
        type: "number",
        value: 2,
      },
      state: {
        type: "string",
        value: "inProgress",
      },
      deck: {
        type: "cardList",
        value: [
          31, 22, 4, 32, 26, 15, 13, 37, 9, 18, 11, 36, 5, 40, 14, 44, 4, 24,
          46, 28, 30, 27, 41, 47, 49, 2, 38, 50, 8, 23, 34, 6, 39, 5, 52, 12,
          48, 20, 1, 21, 17, 25, 33, 51, 19, 35, 10, 7, 3, 42, 16, 2,
        ],
      },
      discardDeck: {
        type: "cardList",
        value: [],
      },
      groupPot: {
        type: "gainObject",
        value: {
          gain: {
            type: "gainObject",
            value: {
              1: {
                value: 0,
              },
            },
          },
        },
      },
      gain: {
        type: "gainObject",
        value: {
          1: {
            value: 0,
          },
        },
      },
      boardCard: {
        type: "cardList",
        value: [],
      },
      winners: {
        type: "playerList",
        value: [],
      },
    },
    playerGlobalValue: {
      currentBet: {
        type: "number",
        value: 0,
      },
      attachedEventForTour: {
        type: "array",
        value: [],
      },
      gain: {
        type: "object",
        value: {
          1: {
            value: 0,
          },
        },
      },
    },
    params: {
      globalGame: {
        jeuSolo: false,
        playersCanJoin: false,
        minPlayer: 2,
        maxPlayer: 5,
      },
      rendering: {
        menu: {
          template: 1,
          backgroundImage: null,
        },
        game: {
          template: 1,
          backgroundImage: null,
          displayHandDeck: true,
          displayCountAdversaryHandDeck: true,
          displayStatistics: true,
          displayHistory: true,
          displayTimer: false,
          displayChat: true,
        },
      },
      tours: {
        activation: true,
        sens: "incrementation",
        startNumber: 0,
        timerActivation: false,
        duration: 0,
        maxTour: 3,
        actionOnlyAtPlayerTour: true,
        endOfTour: ["allPlayersHasPlayed/endOfTour"],
        actions: [
          {
            id: 1,
            name: "Se coucher",
            condition: null,
            appearAtPlayerTurn: true,
            withValue: [
              {
                id: 7,
                player: "{currentPlayer}",
              },
              {
                id: 1,
                inputBool: true,
                player: "{currentPlayer}",
              },
            ],
          },
          {
            id: 2,
            name: "miser",
            type: "askPlayer",
            appearAtPlayerTurn: true,
            condition:
              "comp({currentPlayer#gain#1};isSuperiorNumber;{currentBet})",
            withValue: [
              {
                id: 11,
                player: "{currentPlayer}",
              },
            ],
          },
          {
            id: 3,
            name: "suivre",
            appearAtPlayerTurn: true,
            condition:
              "exp(comp({currentPlayer#currentBet};isNotEqualNumber;{currentBet})&&comp({currentPlayer#gain#1};isSuperiorNumber;calc({currentBet}-{currentPlayer#currentBet})))",
            return: "{currentPlayer}",
            withValue: [
              {
                id: 14,
                player: "{currentPlayer}",
                inputNumber: "calc({currentBet}-{currentPlayer#currentBet})",
              },
              {
                id: 1,
                inputBool: true,
                player: "{currentPlayer}",
              },
            ],
          },
          {
            id: 4,
            name: "Check",
            appearAtPlayerTurn: true,
            condition:
              "comp({currentPlayer#currentBet};isEqualNumber;{currentBet})",
            withValue: [
              {
                id: 1,
                inputBool: true,
                player: "{currentPlayer}",
              },
            ],
          },
          {
            id: 5,
            name: "Tapis",
            appearAtPlayerTurn: true,
            condition:
              "exp(comp({currentPlayer#currentBet};isInferiorOrEqual;{currentBet})&&comp({currentPlayer#gain#1};isSuperiorNumber;0))",
            withValue: [
              {
                id: 14,
                type: "withValueEvent",
                player: "{currentPlayer}",
                inputNumber: "{currentPlayer#gain#1}",
              },
              {
                id: 3,
                inputNumber: "{currentPlayer#currentBet}",
              },
              {
                id: 1,
                inputBool: true,
                player: "{currentPlayer}",
              },
              {
                id: 8,
                inputBool: true,
              },
            ],
          },
        ],
      },
      manches: {
        max: null,
        sens: "incrementation",
        startNumber: 0,
      },
      cards: {
        activeHandDeck: true,
        activPersonalHandDeck: true,
        activPersonalHandDiscard: true,
        activeDiscardDeck: false,
        discard: {
          quantity: {
            min: null,
            max: null,
          },
        },
        pickOnDeck: {
          quantity: {
            min: null,
            max: null,
          },
        },
        activeCardAsGain: true,
        handDeck: {
          activation: true,
          visibility: "nobody",
        },
        cardBoard: [],
      },
      gain: {
        activation: true,
        groupPot: true,
      },
      roles: {
        activation: true,
      },
    },
    events: {
      demons: [
        {
          id: 1,
          name: "Quand on arrive au tour 4 et que tous les joueurs ont joué",
          condition:
            "exp(comp({tour};isEqualNumber;4)&&allPlayersHasPlayed/endOfTour)",
          events: [13, 15, 16, 302],
        },
        {
          id: 2,
          name: "Quand on arrive au tour 5",
          condition: "exp(comp({tour};isEqualNumber;5)&&onChangeTour)",
          events: [],
        },
        {
          id: 3,
          name: "Quand un tour change",
          condition: "onChangeTour",
          events: [13, 18],
        },
        {
          id: 5,
          name: "Début de manche",
          condition: "eachStartOfManche",
          events: [3, 5, 6, 7, 9, 8, 10, 14],
        },
        {
          id: 6,
          name: "Quand tous les joueurs ont passé leur tour",
          boucle: "{allPlayersInGame}",
          condition:
            "exp(comp({playerBoucle};samePlayer;{currentPlayer})||comp({playerBoucle#attachedEventForTour};contain;<<skipPlayerTour>>))",
          events: [13, 17, 18, 302],
        },
        {
          id: 7,
          name: "Changement de tour",
          condition: "allPlayersHasPlayed/endOfTour",
          events: [14, 301],
        },
      ],
      events: [
        {
          id: 300,
          name: "win",
          condition: null,
          event: {
            for: "{currentPlayer}",
            give: null,
            attachedEventForTour: null,
            action: "win",
            value: null,
          },
        },
        {
          id: 301,
          name: "Change tour",
          loadMessage: "Changement de tour...",
          condition: null,
          event: {
            for: null,
            give: null,
            attachedEventForTour: null,
            action: "endOfTour",
            value: null,
          },
        },
        {
          id: 302,
          name: "Change manche",
          loadMessage: "Changement de manche...",
          condition: null,
          event: {
            for: null,
            give: null,
            attachedEventForTour: null,
            action: "changeManche",
            value: null,
          },
        },
        {
          id: 3,
          name: "Faire revenir tous les joueurs dans la partie",
          condition: null,
          loadMessage: "Réintégration des joueurs...",
          boucle: "{allPlayersInGame}",
          event: {
            for: "{playerBoucle}",
            give: null,
            action: "removeAllAtachedEventsForTour",
            value: null,
          },
        },
        {
          id: 4,
          name: "Distribute all gains",
          condition: null,
          boucle: "{allPlayersInGame}",
          loadMessage: "Distribution des gains...",
          event: {
            for: "{playerBoucle}",
            give: {
              "{gain#1}": 6250,
            },
            action: null,
            value: null,
          },
        },
        {
          id: 5,
          name: "Changer le joueur qui commence",
          loadMessage: "Changement du joueur de départ...",
          event: {
            for: null,
            give: null,
            action: "changeStartingPlayer",
            value: "next",
          },
        },
        {
          id: 6,
          name: "Pose des petites blind ",
          loadMessage: "Pose de la petite blinde...",
          condition: null,
          event: {
            from: "getPlayer(calc({startPlayer#position}+1))",
            for: "{getPlayer(calc({startPlayer#position}+1))#currentBet}",
            give: {
              "{gain#1}": "{smallBlind}",
            },
            action: null,
            value: null,
          },
        },
        {
          id: 7,
          name: "Pose de la grosse blind ",
          loadMessage: "Pose de la grosse blinde...",
          condition: null,
          event: {
            from: "getPlayer(calc({startPlayer#position}+2))",
            for: "{getPlayer(calc({startPlayer#position}+2))#currentBet}",
            give: {
              "{gain#1}": "calc(2*{smallBlind})",
            },
            action: null,
            value: null,
            params: {
              ifFromStackDoesNotHaveRessource: {
                giveAllRessourcePossible: false,
                doEvents: [],
              },
            },
            withValue: [
              {
                id: 3,
                inputNumber:
                  "{getPlayer(calc({startPlayer#position}+2))#currentBet}",
              },
            ],
          },
        },
        {
          id: 8,
          name: "Melanger le jeu",
          loadMessage: "Mélange du jeu...",
          condition: null,
          event: {
            from: null,
            for: "{deck}",
            give: null,
            action: "shuffle",
            value: null,
          },
        },
        {
          id: 9,
          name: "Rassembler les jeux",
          loadMessage: null,
          condition: null,
          event: {
            from: "{discardDeck}",
            for: "{deck}",
            give: {
              "{cards}": "*",
            },
            action: null,
            value: null,
          },
        },
        {
          id: 10,
          name: "Distribuer",
          condition: null,
          boucle: "{allPlayersInGame}",
          loadMessage: "Distribution des cartes aux joueurs...",
          event: {
            for: "{playerBoucle#handDeck}",
            from: "{deck}",
            give: {
              "{cards}": 2,
            },
            attachedEventForTour: null,
            action: null,
            value: null,
          },
        },
        {
          id: 13,
          name: "Recuperer les mises",
          loadMessage: "Récupération de la mise...",
          condition: null,
          boucle: "{allPlayersInGame}",
          event: {
            from: "{playerBoucle#currentBet}",
            for: "{groupPot}",
            give: {
              "{gain#1}": "{playerBoucle#currentBet}",
            },
            attachedEventForTour: null,
            action: null,
            value: null,
          },
        },
        {
          id: 14,
          name: "change play status to all player at start of game",
          loadMessage: "Réintégration des joueurs...",
          condition: null,
          boucle: "{allPlayersInGame}",
          event: {
            for: "{playerBoucle#hasPlayed}",
            action: "updateGlobalValue",
            value: "false",
          },
        },
        {
          id: 15,
          name: "Verification des combinaisons",
          condition: null,
          boucle: "{allPlayersInGame}",
          loadMessage: "Analyse des cartes...",
          event: {
            for: "{currentPlayer#handœCardDeck#type=french_standard}",
            action: "verificationCards",
            return: "{winnersPlayers}",
            withValue: [
              {
                id: 6,
                inputPlayers: "{winnersPlayers}",
              },
            ],
          },
        },
        {
          id: 16,
          name: "Reset global bet",
          loadMessage: "Réinitialisation de la mise globale...",
          condition: null,
          event: {
            for: "{groupPot#gain#1}",
            action: "updateGlobalValue",
            value: 0,
          },
        },
        {
          id: 17,
          name: "Donner les mises à un joueur",
          loadMessage: "Réinitialisation de la mise globale...",
          condition: null,
          event: {
            from: "{groupPot}",
            for: "{currentPlayer}",
            give: {
              "{gain#1}": "*",
            },
          },
        },
        {
          id: 18,
          name: "Reset current bet",
          condition: null,
          event: {
            for: "{currentBet}",
            action: "updateGlobalValue",
            value: 0,
          },
        },
      ],
      withValueEvent: [
        {
          id: 300,
          name: "Verifier une suite",
          condition: null,
          boucle: "{inputCardList#type=french_standard}",
          event: {
            condition: null,
            for: ["card"],
            give: null,
            action: "french-card-verify-straight",
            value: true,
          },
        },
        {
          id: 301,
          name: "Verifier une suite royale",
          condition: null,
          boucle: "{inputCardList#type=french_standard}",
          event: {
            condition: null,
            for: ["card"],
            give: null,
            action: "french-card-verify-royal-straight",
            value: true,
          },
        },
        {
          id: 302,
          name: "Verifier quinte flush",
          condition: null,
          boucle: "{inputCardList#type=french_standard}",
          event: {
            condition: null,
            for: ["card"],
            give: null,
            action: "french-card-verify-straight-flush",
            value: true,
          },
        },
        {
          id: 303,
          name: "Verifier carre",
          condition: null,
          boucle: "{inputCardList#type=french_standard}",
          event: {
            condition: null,
            for: ["card"],
            give: null,
            action: "french-card-verify-four-of-a-kind",
            value: true,
          },
        },
        {
          id: 304,
          name: "Verifier full",
          condition: null,
          boucle: "{inputCardList#type=french_standard}",
          event: {
            condition: null,
            for: ["card"],
            give: null,
            action: "french-card-verify-full-house",
            value: true,
          },
        },
        {
          id: 305,
          name: "Verifier couleur",
          condition: null,
          boucle: "{inputCardList#type=french_standard}",
          event: {
            condition: null,
            for: ["card"],
            give: null,
            action: "french-card-verify-flush",
            value: true,
          },
        },
        {
          id: 306,
          name: "Verifier brelan",
          condition: null,
          boucle: "{inputCardList#type=french_standard}",
          event: {
            condition: null,
            for: ["card"],
            give: null,
            action: "french-card-verify-three-of-a-kind",
            value: true,
          },
        },
        {
          id: 307,
          name: "Verifier deux paires",
          condition: null,
          boucle: "{inputCardList#type=french_standard}",
          event: {
            condition: null,
            for: ["card"],
            give: null,
            action: "french-card-verify-two-pair",
            value: true,
          },
        },
        {
          id: 308,
          name: "Verifier une paire",
          condition: null,
          boucle: "{inputCardList#type=french_standard}",
          event: {
            condition: null,
            for: ["card"],
            give: null,
            action: "french-card-verify-one-pair",
            value: true,
          },
        },
        {
          id: 309,
          name: "Verifier carte haute",
          condition: null,
          boucle: "{inputCardList#type=french_standard}",
          event: {
            condition: null,
            for: ["card"],
            give: null,
            action: "french-card-verify-high-card",
            value: true,
          },
        },
        {
          id: 1,
          name: "change status of 'hasPlayed' for one player",
          condition: null,
          boucle: null,
          event: {
            for: "{player#hasPlayed}",
            give: null,
            action: "updateGlobalValue",
            value: "{inputBool}",
          },
        },
        {
          id: 2,
          name: "when player bet or follow bet ",
          condition: null,
          boucle: null,
          event: {
            from: "{player}",
            for: "{player#currentBet}",
            give: {
              "{gain#1}": "{inputNumber}",
            },
            action: null,
            value: null,
          },
        },
        {
          id: 3,
          name: "updateGlobalBet",
          condition: null,
          boucle: null,
          event: {
            for: "{currentBet}",
            action: "updateGlobalValue",
            value: "{inputNumber}",
          },
        },
        {
          id: 4,
          name: "change play status to all player when player bet",
          condition: null,
          boucle: "{allPlayersInGame}",
          event: {
            condition:
              "exp(comp({playerBoucle#attachedEventForTour};notContain;<<skipPlayerTour>>)&&comp({playerBoucle};differentPlayer;{currentPlayer}))",
            for: "{playerBoucle#hasPlayed}",
            action: "updateGlobalValue",
            value: "false",
          },
        },
        {
          id: 14,
          name: "suivre une mise",
          condition: null,
          boucle: null,
          event: {
            from: "{player}",
            for: "{player#currentBet}",
            give: {
              "{gain#1}": "{inputNumber}",
            },
          },
        },
        {
          id: 11,
          name: "Miser",
          condition: null,
          event: {
            for: "{currentPlayer}",
            action: "askPlayer",
            requiresInput: {
              type: "number",
              label: "Choisissez le montant à miser",
              min: 1,
              max: "playerMaxGain",
              unit: "gain#1",
              return: ["{currentPlayer}", "{insertedValue}"],
            },
            withValue: [
              {
                id: 2,
                inputNumber: "{insertedValue}",
              },
              {
                id: 3,
                inputNumber: "{currentPlayer#currentBet}",
              },
              {
                id: 1,
                inputBool: true,
                player: "{currentPlayer}",
              },
              {
                id: 4,
                inputBool: true,
              },
            ],
            attachedEventForTour: null,
            value: null,
          },
        },
        {
          id: 5,
          name: "distribution de carte dans le pot",
          condition: null,
          boucle: null,
          event: {
            from: "{deck}",
            for: "{boardDeck}",
            give: {
              "card#comp({currentCard#type};isEqualString;<<french_standard>>)":
                "exp(comp({tour};isEqualNumber;1;return;1)||comp({tour};isEqualNumber;2;return;1)||comp({tour};isEqualNumber;3;return;3))",
            },
            action: null,
            value: "true",
          },
        },
        {
          id: 6,
          name: "distribution des gains  ",
          condition: null,
          boucle: "{inputPlayers}",
          event: {
            from: "{groupPot}",
            for: "{bouclePlayer#gain#1}",
            give: {
              "{gain#1}": "%",
            },
            action: null,
            value: null,
          },
        },
        {
          id: 7,
          name: "Se coucher",
          condition: null,
          event: {
            for: "{currentPlayer}",
            give: null,
            action: "skipPlayerTour",
            value: null,
          },
        },
        {
          id: 8,
          name: "change play status to all player when player bet",
          condition: null,
          boucle: "{allPlayersInGame}",
          event: {
            condition:
              "exp(exp(comp({playerBoucle#attachedEventForTour};notContain;<<skipPlayerTour>>)&&comp({playerBoucle};differentPlayer;{currentPlayer}))&&comp({playerBoucle#currentBet};isInferiorNumber;{currentBet}))",
            for: "{playerBoucle#hasPlayed}",
            action: "updateGlobalValue",
            value: "false",
          },
        },
      ],
    },
    assets: {
      cards: {
        1: {
          id: 1,
          value: 1,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        2: {
          id: 2,
          value: 2,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        3: {
          id: 3,
          value: 3,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        4: {
          id: 4,
          value: 4,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        5: {
          id: 5,
          value: 5,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        6: {
          id: 6,
          value: 6,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        7: {
          id: 7,
          value: 7,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        8: {
          id: 8,
          value: 8,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        9: {
          id: 9,
          value: 9,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        10: {
          id: 10,
          value: 10,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        11: {
          id: 11,
          value: 11,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        12: {
          id: 12,
          value: 12,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        13: {
          id: 13,
          value: 13,
          type: "french_standard",
          addedAttributs: {
            couleur: "pique",
          },
        },
        14: {
          id: 14,
          value: 1,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        15: {
          id: 15,
          value: 2,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        16: {
          id: 16,
          value: 3,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        17: {
          id: 17,
          value: 4,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        18: {
          id: 18,
          value: 5,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        19: {
          id: 19,
          value: 6,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        20: {
          id: 20,
          value: 7,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        21: {
          id: 21,
          value: 8,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        22: {
          id: 22,
          value: 9,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        23: {
          id: 23,
          value: 10,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        24: {
          id: 24,
          value: 11,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        25: {
          id: 25,
          value: 12,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        26: {
          id: 26,
          value: 13,
          type: "french_standard",
          addedAttributs: {
            couleur: "trefle",
          },
        },
        27: {
          id: 27,
          value: 1,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        28: {
          id: 28,
          value: 2,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        29: {
          id: 29,
          value: 3,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        30: {
          id: 30,
          value: 4,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        31: {
          id: 31,
          value: 5,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        32: {
          id: 32,
          value: 6,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        33: {
          id: 33,
          value: 7,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        34: {
          id: 34,
          value: 8,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        35: {
          id: 35,
          value: 9,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        36: {
          id: 36,
          value: 10,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        37: {
          id: 37,
          value: 11,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        38: {
          id: 38,
          value: 12,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        39: {
          id: 39,
          value: 13,
          type: "french_standard",
          addedAttributs: {
            couleur: "coeur",
          },
        },
        40: {
          id: 40,
          value: 1,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        41: {
          id: 41,
          value: 2,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        42: {
          id: 42,
          value: 3,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        43: {
          id: 43,
          value: 4,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        44: {
          id: 44,
          value: 5,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        45: {
          id: 45,
          value: 6,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        46: {
          id: 46,
          value: 7,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        47: {
          id: 47,
          value: 8,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        48: {
          id: 48,
          value: 9,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        49: {
          id: 49,
          value: 10,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        50: {
          id: 50,
          value: 11,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        51: {
          id: 51,
          value: 12,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
        52: {
          id: 52,
          value: 13,
          type: "french_standard",
          addedAttributs: {
            couleur: "carreau",
          },
        },
      },
      gains: [
        {
          id: 1,
          nom: "jetons",
          value: null,
          value_numérique: 1,
          quantite: null,
        },
      ],
      roles: [
        {
          nom: "dealer",
          attribution: "{startPlayer}",
        },
      ],
    },
  },
  roomId: "ZZP1IR",
  data: {
    players: [
      {
        position: 1,
        pseudo: "zvml,zv",
        socketID: "FBZRkLFYoBB5onM8AAAJ",
        id: "1q6lvq",
        currentBet: {
          type: "number",
          value: 2,
        },
        attachedEventForTour: {
          type: "array",
          value: [],
        },
        gain: {
          type: "object",
          value: {
            1: {
              value: 6248,
            },
          },
        },
        handDeck: {
          type: "cardList",
          value: [29, 45],
        },
        personalHandDeck: {
          type: "cardList",
          value: [],
        },
        personalHandDiscard: {
          type: "cardList",
          value: [],
        },
        hasPlayed: {
          type: "boolean",
          value: false,
        },
        haswin: {
          type: "boolean",
          value: false,
        },
        actions: {
          type: "array",
          value: [
            {
              id: 1,
              name: "Se coucher",
              condition: null,
              appearAtPlayerTurn: true,
              withValue: [
                {
                  id: 7,
                  player: "{currentPlayer}",
                },
                {
                  id: 1,
                  inputBool: true,
                  player: "{currentPlayer}",
                },
              ],
            },
            {
              id: 2,
              name: "miser",
              type: "askPlayer",
              appearAtPlayerTurn: true,
              condition:
                "comp({currentPlayer#gain#1};isSuperiorNumber;{currentBet})",
              withValue: [
                {
                  id: 11,
                  player: "{currentPlayer}",
                },
              ],
            },
            {
              id: 4,
              name: "Check",
              appearAtPlayerTurn: true,
              condition:
                "comp({currentPlayer#currentBet};isEqualNumber;{currentBet})",
              withValue: [
                {
                  id: 1,
                  inputBool: true,
                  player: "{currentPlayer}",
                },
              ],
            },
            {
              id: 5,
              name: "Tapis",
              appearAtPlayerTurn: true,
              condition:
                "exp(comp({currentPlayer#currentBet};isInferiorOrEqual;{currentBet})&&comp({currentPlayer#gain#1};isSuperiorNumber;0))",
              withValue: [
                {
                  id: 14,
                  type: "withValueEvent",
                  player: "{currentPlayer}",
                  inputNumber: "{currentPlayer#gain#1}",
                },
                {
                  id: 3,
                  inputNumber: "{currentPlayer#currentBet}",
                },
                {
                  id: 1,
                  inputBool: true,
                  player: "{currentPlayer}",
                },
                {
                  id: 8,
                  inputBool: true,
                },
              ],
            },
          ],
        },
        roles: {
          type: "array",
          value: [
            {
              nom: "dealer",
              attribution: "{startPlayer}",
            },
          ],
        },
      },
      {
        position: 2,
        pseudo: "zlef,flze",
        socketID: "UPRbWyVkbiojOvUyAAAH",
        id: "43y9ax",
        currentBet: {
          type: "number",
          value: 1,
        },
        attachedEventForTour: {
          type: "array",
          value: [],
        },
        gain: {
          type: "object",
          value: {
            1: {
              value: 6249,
            },
          },
        },
        handDeck: {
          type: "cardList",
          value: [3, 43],
        },
        personalHandDeck: {
          type: "cardList",
          value: [],
        },
        personalHandDiscard: {
          type: "cardList",
          value: [],
        },
        hasPlayed: {
          type: "boolean",
          value: false,
        },
        haswin: {
          type: "boolean",
          value: false,
        },
        actions: {
          type: "array",
          value: [],
        },
        roles: {
          type: "array",
          value: [],
        },
      },{
        position: 3,
        pseudo: "zlebzfekjf",
        socketID: "UPRbWyVkbiojOvUyAAAH",
        id: "43y9axkkk",
        currentBet: {
          type: "number",
          value: 1,
        },
        attachedEventForTour: {
          type: "array",
          value: [],
        },
        gain: {
          type: "object",
          value: {
            1: {
              value: 6249,
            },
          },
        },
        handDeck: {
          type: "cardList",
          value: [3, 43],
        },
        personalHandDeck: {
          type: "cardList",
          value: [],
        },
        personalHandDiscard: {
          type: "cardList",
          value: [],
        },
        hasPlayed: {
          type: "boolean",
          value: false,
        },
        haswin: {
          type: "boolean",
          value: false,
        },
        actions: {
          type: "array",
          value: [],
        },
        roles: {
          type: "array",
          value: [],
        },
      },{
        position: 4,
        pseudo: "zlebzjf",
        socketID: "UPRbWyVkbiojOvUyAAAH",
        id: "43fe554kk",
        currentBet: {
          type: "number",
          value: 1,
        },
        attachedEventForTour: {
          type: "array",
          value: [],
        },
        gain: {
          type: "object",
          value: {
            1: {
              value: 6249,
            },
          },
        },
        handDeck: {
          type: "cardList",
          value: [3, 43],
        },
        personalHandDeck: {
          type: "cardList",
          value: [],
        },
        personalHandDiscard: {
          type: "cardList",
          value: [],
        },
        hasPlayed: {
          type: "boolean",
          value: false,
        },
        haswin: {
          type: "boolean",
          value: false,
        },
        actions: {
          type: "array",
          value: [],
        },
        roles: {
          type: "array",
          value: [],
        },
      },{
        position: 5,
        pseudo: "zlezfefbzjf",
        socketID: "UPRbWyVkbiojOvUyAAAH",
        id: "43fe554fffff551451kk",
        currentBet: {
          type: "number",
          value: 1,
        },
        attachedEventForTour: {
          type: "array",
          value: [],
        },
        gain: {
          type: "object",
          value: {
            1: {
              value: 6249,
            },
          },
        },
        handDeck: {
          type: "cardList",
          value: [3, 43],
        },
        personalHandDeck: {
          type: "cardList",
          value: [],
        },
        personalHandDiscard: {
          type: "cardList",
          value: [],
        },
        hasPlayed: {
          type: "boolean",
          value: false,
        },
        haswin: {
          type: "boolean",
          value: false,
        },
        actions: {
          type: "array",
          value: [],
        },
        roles: {
          type: "array",
          value: [],
        }},{
        position: 6,
        pseudo: "z888888zjf",
        socketID: "UPRbWyVkbiojOvUyAAAH",
        id: "edze451kk",
        currentBet: {
          type: "number",
          value: 1,
        },
        attachedEventForTour: {
          type: "array",
          value: [],
        },
        gain: {
          type: "object",
          value: {
            1: {
              value: 6249,
            },
          },
        },
        handDeck: {
          type: "cardList",
          value: [3, 43],
        },
        personalHandDeck: {
          type: "cardList",
          value: [],
        },
        personalHandDiscard: {
          type: "cardList",
          value: [],
        },
        hasPlayed: {
          type: "boolean",
          value: false,
        },
        haswin: {
          type: "boolean",
          value: false,
        },
        actions: {
          type: "array",
          value: [],
        },
        roles: {
          type: "array",
          value: [],
        },
      },{
        position: 7,
        pseudo: "zrgre88888zjf",
        socketID: "UPRbWyVkbiojOvUyAAAH",
        id: "88622k",
        currentBet: {
          type: "number",
          value: 1,
        },
        attachedEventForTour: {
          type: "array",
          value: [],
        },
        gain: {
          type: "object",
          value: {
            1: {
              value: 6249,
            },
          },
        },
        handDeck: {
          type: "cardList",
          value: [3, 43],
        },
        personalHandDeck: {
          type: "cardList",
          value: [],
        },
        personalHandDiscard: {
          type: "cardList",
          value: [],
        },
        hasPlayed: {
          type: "boolean",
          value: false,
        },
        haswin: {
          type: "boolean",
          value: false,
        },
        actions: {
          type: "array",
          value: [],
        },
        roles: {
          type: "array",
          value: [],
        },
      },{
        position: 8,
        pseudo: "zrgre8f",
        socketID: "UPRbWyVkbiojOvUyAAAH",
        id: "8862mmmm2k",
        currentBet: {
          type: "number",
          value: 1,
        },
        attachedEventForTour: {
          type: "array",
          value: [],
        },
        gain: {
          type: "object",
          value: {
            1: {
              value: 6249,
            },
          },
        },
        handDeck: {
          type: "cardList",
          value: [3, 43],
        },
        personalHandDeck: {
          type: "cardList",
          value: [],
        },
        personalHandDiscard: {
          type: "cardList",
          value: [],
        },
        hasPlayed: {
          type: "boolean",
          value: false,
        },
        haswin: {
          type: "boolean",
          value: false,
        },
        actions: {
          type: "array",
          value: [],
        },
        roles: {
          type: "array",
          value: [],
        },
      },
    ],
    messages: [
      {
        content: "zlef,flze a crée la partie",
      },
      {
        content: "zvml,zv a rejoint la partie",
      },
    ],
    logs: [
      "La partie commence",
      "Mélange du jeu...",
      "Distribution des gains...",
      "Début de la manche",
      "Réintégration des joueurs...",
      "Changement du joueur de départ...",
      "Pose de la petite blinde...",
      "Pose de la grosse blinde...",
      "Mélange du jeu...",
      "Distribution des cartes aux joueurs...",
      "Réintégration des joueurs...",
    ],
    currentPlayerPosition: {
      value: 1,
    },
    tour: 0,
    manche: 0,
    smallBlind: {
      type: "number",
      value: 1,
    },
    allPlayersHasPlayed: {
      type: "boolean",
      value: false,
    },
    currentBet: {
      type: "number",
      value: 2,
    },
    state: {
      type: "string",
      value: "inProgress",
    },
    deck: {
      type: "cardList",
      value: [
        31, 22, 4, 32, 26, 15, 13, 37, 9, 18, 11, 36, 5, 40, 14, 44, 4, 24, 46,
        28, 30, 27, 41, 47, 49, 2, 38, 50, 8, 23, 34, 6, 39, 5, 52, 12, 48, 20,
        1, 21, 17, 25, 33, 51, 19, 35, 10, 7, 3, 42, 16, 2,
      ],
    },
    discardDeck: {
      type: "cardList",
      value: [],
    },
    groupPot: {
      type: "gainObject",
      value: {
        gain: {
          type: "gainObject",
          value: {
            1: {
              value: 0,
            },
          },
        },
      },
    },
    gain: {
      type: "gainObject",
      value: {
        1: 0,
      },
    },
    boardCard: {
      type: "cardList",
      value: [],
    },
    winners: {
      type: "playerList",
      value: [],
    },
    cards: {
      1: {
        id: 1,
        value: 1,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      2: {
        id: 2,
        value: 2,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      3: {
        id: 3,
        value: 3,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      4: {
        id: 4,
        value: 4,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      5: {
        id: 5,
        value: 5,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      6: {
        id: 6,
        value: 6,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      7: {
        id: 7,
        value: 7,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      8: {
        id: 8,
        value: 8,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      9: {
        id: 9,
        value: 9,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      10: {
        id: 10,
        value: 10,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      11: {
        id: 11,
        value: 11,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      12: {
        id: 12,
        value: 12,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      13: {
        id: 13,
        value: 13,
        type: "french_standard",
        addedAttributs: {
          couleur: "pique",
        },
      },
      14: {
        id: 14,
        value: 1,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      15: {
        id: 15,
        value: 2,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      16: {
        id: 16,
        value: 3,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      17: {
        id: 17,
        value: 4,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      18: {
        id: 18,
        value: 5,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      19: {
        id: 19,
        value: 6,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      20: {
        id: 20,
        value: 7,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      21: {
        id: 21,
        value: 8,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      22: {
        id: 22,
        value: 9,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      23: {
        id: 23,
        value: 10,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      24: {
        id: 24,
        value: 11,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      25: {
        id: 25,
        value: 12,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      26: {
        id: 26,
        value: 13,
        type: "french_standard",
        addedAttributs: {
          couleur: "trefle",
        },
      },
      27: {
        id: 27,
        value: 1,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      28: {
        id: 28,
        value: 2,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      29: {
        id: 29,
        value: 3,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      30: {
        id: 30,
        value: 4,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      31: {
        id: 31,
        value: 5,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      32: {
        id: 32,
        value: 6,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      33: {
        id: 33,
        value: 7,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      34: {
        id: 34,
        value: 8,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      35: {
        id: 35,
        value: 9,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      36: {
        id: 36,
        value: 10,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      37: {
        id: 37,
        value: 11,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      38: {
        id: 38,
        value: 12,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      39: {
        id: 39,
        value: 13,
        type: "french_standard",
        addedAttributs: {
          couleur: "coeur",
        },
      },
      40: {
        id: 40,
        value: 1,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      41: {
        id: 41,
        value: 2,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      42: {
        id: 42,
        value: 3,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      43: {
        id: 43,
        value: 4,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      44: {
        id: 44,
        value: 5,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      45: {
        id: 45,
        value: 6,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      46: {
        id: 46,
        value: 7,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      47: {
        id: 47,
        value: 8,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      48: {
        id: 48,
        value: 9,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      49: {
        id: 49,
        value: 10,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      50: {
        id: 50,
        value: 11,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      51: {
        id: 51,
        value: 12,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
      52: {
        id: 52,
        value: 13,
        type: "french_standard",
        addedAttributs: {
          couleur: "carreau",
        },
      },
    },
    gains: [
      {
        id: 1,
        nom: "jetons",
        value: null,
        value_numérique: 1,
        quantite: null,
      },
    ],
    roles: [
      {
        nom: "dealer",
        attribution: "{startPlayer}",
      },
    ],
  },
  admin: {
    position: 1,
    pseudo: "zlef,flze",
    socketID: "UPRbWyVkbiojOvUyAAAH",
    id: "43y9ax",
    currentBet: {
      type: "number",
      value: 0,
    },
    attachedEventForTour: {
      type: "array",
      value: [],
    },
    gain: {
      type: "object",
      value: {
        1: {
          value: 0,
        },
      },
    },
    handDeck: {
      type: "cardList",
      value: [],
    },
    personalHandDeck: {
      type: "cardList",
      value: [],
    },
    personalHandDiscard: {
      type: "cardList",
      value: [],
    },
    hasPlayed: {
      type: "boolean",
      value: false,
    },
    haswin: {
      type: "boolean",
      value: false,
    },
    actions: {
      type: "array",
      value: [],
    },
    roles: {
      type: "array",
      value: [],
    },
  },
};
