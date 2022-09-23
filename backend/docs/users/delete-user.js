module.exports = {
    // method of operation
    delete: {
      tags: ["utilisateurs"], // operation's tag.
      description: "Supprime le compte d'un utilisateur", // operation's desc.
      operationId: "deleteUser", // unique operation id.
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
      ], // expected params.
      // expected responses
      responses: {
        // response code
        201: {
          description: "Le compte de l'utilisateur a été supprimé", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SuccessMessage", // User model
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
          description: "Une erreur est survenue lors de la suppression des informations de l'utilisateur ou Id pas donnée", // response desc.
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