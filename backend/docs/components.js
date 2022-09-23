module.exports = {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer", 
          bearerFormat: "JWT"
        }
      },
      schemas: {
        // modele pour connexion
        TokenCreationPayload: {
          type: "object", // type of the object
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
          example: {
              email: "e2072931@site.com",
              password: "e2072931",
            },
        },

        // modele pour service
        ServiceResponse: {
          type: "object", // type of the object
          required: ["vendeur", "categorie", "nom", "prix", "datePublication"],
          properties: {
            vendeur: {
              type: "object",
              $ref: '#/components/schemas/UserLink',
            },
            categorie: {
              type: "object",
              $ref: '#/components/schemas/cartegorieResponse',
            },
            nom: {
              type: "string",
            },
            prix: {
              type: "double",
            },
            datePublication: {
              type: "date-time",
            },
          },
          example: { 
            vendeur : { 
                        Id_user: "rM6hQMDHP9nACbds1XjV", 
                        nom_user: "issiakhem",
                        prenom_user: "samy", 
                        photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png"
                      }, 
            nomService: "jardinier", 
            prix : "10,99", 
            photoDeCouverture: "https://pokemonsapi.herokuapp.com/sprites/1.png", 
            datePublication : "2022-09-10T20:23", 
            avis : "liste de type avis", 
            photos : "liste de type photos" 
          },
        },
        

        // modele pour un seul service
        OneServiceResponse: {
          type: "object", // type of the object
          required: ["vendeur", "categorie", "nom", "description", "prix", "datePublication"],
          properties: {
            vendeur: {
              type: "object",
              $ref: '#/components/schemas/UserLink',
            },
            categorie: {
              type: "object",
              $ref: '#/components/schemas/cartegorieResponse',
            },
            nom: {
              type: "string",
            },
            description: {
              type: "string",
            },
            prix: {
              type: "double",
            },
            datePublication: {
              type: "date-time",
            },
          },
          example: { 
            vendeur : { 
                        Id_user: "rM6hQMDHP9nACbds1XjV", 
                        nom_user: "issiakhem",
                        prenom_user: "samy", 
                        photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png"
                      }, 
            categorie : {
                          idCategorie: 1,
                          nomCategorie: "jardinerie"
                        }, 
            nomService: "jardinier", 
            description: ". . .", 
            prix : "10,99", 
            photoDeCouverture: "https://pokemonsapi.herokuapp.com/sprites/1.png", 
            datePublication : "2022-09-10T20:23", 
          },
        },

        // modele pour service
        ServicePayload: {
          type: "object", // type of the object
          required: ["id_vendeur", "id_categorie", "nom", "description", "prix", "datePublication"],
          properties: {
            id_vendeur: {
              type: "string",
            },
            id_categorie: {
              type: "int",
            },
            nom: {
              type: "string",
            },
            description: {
              type: "string",
            },
            prix: {
              type: "double",
            },
            datePublication: {
              type: "date-time",
            },
          },
          example: { 
            Id_vendeur : "rM6hQMDHP9nACbds1XjV", 
            Id_categorie : 2, 
            nomService: "jardinier", 
            description: ". . .", 
            prix : "10,99", 
            datePublication : "2017-07-21T17:32:28Z" 
          } ,
        },

        // modele de token
        TokenCreationResponse: {
          type: "object", // type of the object
          required: ["token"],
          properties: {
            token: {
              type: "string",
            },
          },
          example: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsIm5hbWUiOiJNYXJpZSBDdXJpZSIsImVtYWlsIjoibWFjdXJpZUBzY2llbmNlLmNvbSIsImlhdCI6MTYxOTIyNjkxNn0.Nn0SP4ZzW4jaOu_Q47Cq-NPm545zfxJmY7ww7GWyJL0"
            },
        },

        // modele de input pour le user
        UserPayload: {
          type: "object", // data-type
          required: ["id_user", "nom_user", "prenom_user", "email_user", "password", "pays", "prevince", "codePostal", "photoProfil"], // required fields
          properties: {
            nom_user: {
              type: "string", // data-type
            },
            prenom_user: {
              type: "string", // data-type
            },
            email_user: {
              type: "string", // data-type
            },
            password: {
              type: "string", // data-type
            },
            pays: {
              type: "string", // data-type
            },
            province: {
              type: "string", // data-type
            },
            codePostal: {
              type: "string", // data-type
            },
            photoProfil: {
              type: "string", // data-type
            },
          },
          example: { 
                nom_user: "issiakhem", 
                prenom_user: "samy", 
                email_user: "e1234567@site.com", 
                pays: "CANADA",
                province: "QUEBEC",
                codePostal: "H1S1B4", 
                photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png", 
            },
        },

        // user link
        UserLink: {
          type: "object", // data-type
          required: ["id_user", "nom_user", "prenom_user", "photoProfil"], // required fields
          properties: {
            id_user: {
              type: "string", // data-type
            },
            nom_user: {
              type: "string", // data-type
            },
            prenom_user: {
              type: "string", // data-type
            },
            photoProfil: {
              type: "string", // data-type
            },
          },
          example: { 
                Id_user: "rM6hQMDHP9nACbds1XjV", 
                nom_user: "issiakhem", 
                prenom_user: "samy", 
                photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png", 
            },
        },

        // modele de client
        UserResponse: {
          type: "object", // data-type
          required: ["id_user", "nom_user", "prenom_user", "email_user", "password", "pays", "prevince", "codePostal", "photoProfil"], // required fields
          properties: {
            id_user: {
              type: "string", // data-type
            },
            nom_user: {
              type: "string", // data-type
            },
            prenom_user: {
              type: "string", // data-type
            },
            email_user: {
              type: "string", // data-type
            },
            password: {
              type: "string", // data-type
            },
            pays: {
              type: "string", // data-type
            },
            province: {
              type: "string", // data-type
            },
            codePostal: {
              type: "string", // data-type
            },
            photoProfil: {
              type: "string", // data-type
            },
          },
          example: { 
                Id_user: "rM6hQMDHP9nACbds1XjV", 
                nom_user: "issiakhem", 
                prenom_user: "samy", 
                email_user: "e1234567@site.com", 
                pays: "CANADA",
                province: "QUEBEC",
                codePostal: "H1S1B4", 
                photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png", 
            },
        },
        // message de succes
        SuccessMessage: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string", // data-type
            },
            success: {
              type: "boolean", // data-type
            },
          },
          example: {
            message: "Un message d'erreur descriptif",
            success: true,
          },
        },
        // message d'erreur
        ErrorMessage: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string", // data-type
            },
            success: {
              type: "boolean", // data-type
            },
          },
          example: {
            message: "Un message d'erreur descriptif",
            success: false,
          },
        },
        cartegorieResponse: {
          type: "object",
          required: ["idCategorie", "nomCategorie"],
          properties: {
            idCategorie: {
              type: "string", // data-type
            },
            nomCategorie: {
              type: "string", // data-type
            },
          },
          example: { 
            idCategorie: 1, 
            nomCategorie: "jardinerie", 
          } ,
        },        
      },
    },
  };
  