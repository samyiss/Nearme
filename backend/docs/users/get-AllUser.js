module.exports = {
    // operation's method
    get: {
      tags: ["Utilisateurs client/employé"], // operation's tag.
      summary: "liste d'utilisateur", // operation's desc.
      operationId: "getAllUser", // unique operation email
      // expected responses
      parameters: [ ], // expected params.
      responses: {
        // response code
        200: {
          description: "les données de l'utilisateur sont retournées", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserLink", // user data model
              },
            },
          },
        },
        // response code
        404: {
          description: "aucun utilisateur n'est trouvé", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorMessage", // error data model
              },
            },
          },
        },
        // response code
        500: {
          description: "réponse si le serveur a rencontré une situation qu'il ne sait pas gérer", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorMessage", // error data model
              },
            },
          },
        },
      },
    },
  };