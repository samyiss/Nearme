module.exports = {
    // method of operation
    post: {
      tags: ["utilisateurs client/employé"], // operation's tag.
      security: [
        {
          bearerAuth: []
        }
      ],
      summary: "valider le courriel du user", // operation's desc.
      operationId: "validation", // unique operation id.
      // expected responses
      responses: {
        // response code
        200: {
          description: "verification réussite", // response desc.
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