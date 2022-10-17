module.exports = {
    // operation's method
    get: {
      tags: ["Services"], // operation's tag.
      summary: "Le service dont le IdService est envoyé en paramétre", // operation's desc.
      operationId: "getService", // unique operation email
      parameters: [
        {
            $ref: '#/components/parameters/IdService' // data model of the param
        },
      ], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "les données du service sont retournées", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OneServiceResponse", // user data model
              },
            },
          },
        },
        // response code
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
        },
        // response code
        404: {
          description: "réponse si le service voulu n'est pas trouvé", // response desc.
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