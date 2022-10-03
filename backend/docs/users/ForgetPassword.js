module.exports = {
    // method of operation
    post: {
      tags: ["Utilisateurs client/employé"], // operation's tag.
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
            $ref: '#/components/parameters/EmailPayload' // data model of the param
        },
      ], // expected params.
      summary: "mot de passe oublié", // operation's desc.
      operationId: "forgetPassword", // unique operation id.
      // expected responses
      responses: {
        // response code
        201: {
          description: "mot de passe réinitialisé", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SuccessMessage", // user data model
              },
            },
          },
        },
        // response code
        400: {
          description: "réponse si aucun email n'est donné", // response desc.
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
        404: {
          description: "réponse si l'email de l'utilisateur n'est pas trouvé", // response desc.
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
          description: "non vérifier", // response desc.
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