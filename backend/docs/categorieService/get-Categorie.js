module.exports = {
    // operation's method
    get: {
      tags: ["Categories de services"], // operation's tag.
      summary: "La categorie dont le IdCategorie est envoyé en paramétre", // operation's desc.
      operationId: "getCategorie", // unique operation email
      parameters: [
        {
            $ref: '#/components/parameters/IdCategorie' // data model of the param
        },
      ], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "les données de la categorie sont retournées", // response desc.
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