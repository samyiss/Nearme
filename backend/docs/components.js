module.exports = {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer", 
          bearerFormat: "JWT"
        }
      },
      parameters: {
        
        // modele pour connexion
        IdPayload: {
          name: "id", // name of the param
          type: "parameter", // type of the object
          description: "Id de l'utilisateur", // param desc.
          in: "path", // location of the param
          required: true, // Mandatory param
          schema: {
            type: "string", // data type
            example: "rM6hQMDHP9nACbds1XjV", // example of the data
          },
        },
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
          required: ["IdService", "vendeur", "categorie", "nomService", "prix", "datePublication"],
          properties: {
            vendeur: {
              type: "object",
              $ref: '#/components/schemas/UserLink',
            },
            categorie: {
              type: "object",
              $ref: '#/components/schemas/cartegorieResponse',
            },
            IdService: {
              type: "int",
            },
            nomService: {
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
            IdService: 1,
            nomService: "jardinier", 
            prix : "10.99", 
            photoDeCouverture: "https://pokemonsapi.herokuapp.com/sprites/1.png", 
            datePublication : "2022-09-10T20:23", 
            avis : "liste de type avis", 
            photos : "liste de type photos" 
          },
        },
        

        // modele pour un seul service
        OneServiceResponse: {
          type: "object", // type of the object
          required: ["IdService", "vendeur", "categorie", "nomService", "description", "prix", "datePublication"],
          properties: {
            vendeur: {
              type: "object",
              $ref: '#/components/schemas/UserLink',
            },
            categorie: {
              type: "object",
              $ref: '#/components/schemas/cartegorieResponse',
            },
            IdService: {
              type: "int",
            },
            nomService: {
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
            IdService: 1,
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
          required: ["id_vendeur", "id_categorie", "nomService", "description", "prix", "datePublication", "photoCouverture"],
          properties: {
            id_vendeur: {
              type: "string",
            },
            id_categorie: {
              type: "int",
            },
            nomService: {
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
            photoCouverture: {
              type: "string",
            },
          },
          example: { 
            Id_user: "rM6hQMDHP9nACbds1XjV", 
            Id_categorie : 2, 
            nomService: "jardinier", 
            description: ". . .", 
            prix : "10.99", 
            photoCouverture: "https://pokemonsapi.herokuapp.com/sprites/1.png",
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
          required: ["id_user", "nom_user", "prenom_user", "email_user", "employe", "pays", "prevince", "codePostal", "date_naissance"], // required fields
          properties: {
            nom_user: {
              type: "string", // data-type
            },
            prenom_user: {
              type: "string", // data-type
            },
            telephone: {
              type: "string", // data-type
            },
            date_naissance: {
              type: "date-time", // data-type
            },
            email_user: {
              type: "string", // data-type
            },
            password: {
              type: "string", // data-type
            },
            employe: {
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
                telephone: "0666666666",
                email_user: "e1234567@site.com", 
                password: "12345678",
                date_naissance: "1999-09-10T20:23",
                employe: false,
                pays: "CANADA",
                province: "QUEBEC",
                codePostal: "H1S1B4", 
                photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png", 
            },
        },

        // modele de input pour le user
        SellerPayload: {
          type: "object", // data-type
          required: ["nom_user", "prenom_user", "email_user", "employe", "rue", "pays", "prevince", "codePostal", "photoProfil", "date_naissance"], // required fields
          properties: {
            nom_user: {
              type: "string", // data-type
            },
            prenom_user: {
              type: "string", // data-type
            },
            telephone: {
              type: "string", // data-type
            },
            date_naissance: {
              type: "string", // data-type
            },
            email_user: {
              type: "string", // data-type
            },
            password: {
              type: "string", // data-type
            },
            employe: {
              type: "string", // data-type
            },
            rue: {
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
                password: "123456",
                date_naissance: "1999-09-10T20:23",
                employe: false,
                employe: true,
                rue: "123 rue de la paix",
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

        // sswervice link
        ServiceLink: {
          type: "object", // data-type
          required: ["IdService", "nomService", "prix", "photoCouverture", "datePublication "], // required fields
          properties: {
            IdService: {
              type: "int", // data-type
            },
            nomService: {
              type: "string", // data-type
            },
            prix: {
              type: "double", // data-type
            },
            photoCouverture: {
              type: "string", // data-type
            },
            datePublication : {
              type: "date-time", // data-type
            },
          },
          example: { 
              IdService: 1,
              nomService: "jardinier", 
              prix : "10.99",
              photoCouverture: "https://pokemonsapi.herokuapp.com/img/1.png",
              datePublication : "2017-07-21T17:32:28Z"  
            },
        },

        // modele de client
        SellerResponse: {
          type: "object", // data-type
          required: ["id_user", "nom_user", "prenom_user", "email_user", "employe", "rue", "pays", "province", "codePostal", "photoProfil", "date_naissance"], // required fields
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
            telephone: {
              type: "string", // data-type
            },
            date_naissance: {
              type: "string", // data-type
            },
            email_user: {
              type: "string", // data-type
            },
            employe: {
              type: "string", // data-type
            },
            rue: {
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
                telephone: "0666666666",
                date_naissance: "1999-09-10T20:23",
                email_user: "e1234567@site.com",
                employe: true,
                rue: "123 rue de la paix",
                pays: "CANADA",
                province: "QUEBEC",
                codePostal: "H1S1B4", 
                photoProfil: "https://pokemonsapi.herokuapp.com/img/1.png", 
            },
        },

        // modele de client
        UserResponse: {
          type: "object", // data-type
          required: ["id_user", "nom_user", "prenom_user", "email_user", "employe", "pays", "prevince", "codePostal", "date_naissance"], // required fields
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
            employe: {
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
                telephone: "0666666666",
                date_naissance: "1999-09-10T20:23",
                email_user: "e1234567@site.com",
                employe: false,
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
  