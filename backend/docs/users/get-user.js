module.exports = {
    // operation's method
    get: {
      tags: ["Utilisateurs client/employé"], // operation's tag.
      security: [
        {
          bearerAuth: []
        }
      ],
      summary: "Utilisateur dont le IdUser est envoyé en paramétre client/employé", // operation's desc.
      operationId: "getUser", // unique operation email
      // expected responses
      parameters: [
        {
            $ref: '#/components/parameters/IdUser' // data model of the param
        },
      ], // expected params.
      responses: {
        // response code
        200: {
          description: "les données de l'utilisateur sont retournées", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserResponse", // user data model
              },
            },
          },
        },
        /*// response code
        401: {
          description: "réponse si l'utilisateur n'est pas connecteé", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorMessage", // user data model
              },
            },
          },
        },*/
        // response code
        404: {
          description: "réponse si l'utilisateur n'est pas trouvé", // response desc.
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