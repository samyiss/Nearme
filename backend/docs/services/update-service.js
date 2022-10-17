module.exports = {
    // method of operation
    put: {
      tags: ["Services"], // operation's tag.
      security: [
        {
          bearerAuth: []
        }
      ],
      summary: "Route pour update un service", // operation's desc.
      operationId: "updateService", // unique operation id.
      parameters: [
        {
            $ref: '#/components/parameters/IdService' // data model of the param
        },
      ], // expected params.
      requestBody:{
        required: true, // Mandatory param
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ServicePayload", // user data model   
            },
          }, 
        },
      },
      // expected responses
      responses: {
        // response code
        201: {
          description: "La réponse lorsque le service est mis à jour", // response desc.
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
            description: "réponse si l'utilisateur n'est pas autorisé", // response desc.
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
        404: {
            description: "réponse si le service n'est pas trouvé", // response desc.
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