module.exports = {
    // operation's method
    get: {
      tags: ["Categories de services"], // operation's tag.
      summary: "liste de categories", // operation's desc.
      operationId: "getAllCategories", // unique operation email
      // expected responses
      responses: {
        // response code
        200: {
          description: "les données des categories sont retournées", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/categorieResponse", // user data model
              },
            },
          },
        },
        // response code
        404: {
          description: "réponse si aucune categorie n'est trouvé", // response desc.
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