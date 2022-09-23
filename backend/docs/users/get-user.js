module.exports = {
    // operation's method
    get: {
      tags: ["utilisateurs"], // operation's tag.
      security: [
        {
          bearerAuth: []
        }
      ],
      summary: "Utilisateur dont le IdUser est envoyé en paramétre", // operation's desc.
      operationId: "getUserByEmail", // unique operation email
      parameters: [
        // expected params.
        {
          name: "idUser", // name of the param
          in: "query", // location of the param
          schema :{
            type: "integer", // type of the param
          }, 
          required: true, // Mandatory param
          description: "le IdUser de l'utilisateur", // param desc.
        },
      ],
      // expected responses
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
        400: {
          description: "réponse si le paramétre est invalide ou manque de données", // response desc.
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