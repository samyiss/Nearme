module.exports = {
    // method of operation
    post: {
      tags: ["Utilisateurs client/employé"], // operation's tag.
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [ ], // expected params.
      requestBody:{
        required: true, // Mandatory param
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PasswordPayload", // user data model   
            },
          },  
        },
      },
      summary: "changement de mot de passe", // operation's desc.
      operationId: "updatePassword", // unique operation id.
      // expected responses
      responses: {
        // response code
        201: {
          description: "mot de passe mis à jour", // response desc.
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