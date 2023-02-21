/* eslint-disable max-len */
const path = require('path');
const { configs } = require('./configs');
const pathInitial = configs.pathInitial;

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API REST Valuable Product News 💜',
      description: 'Noticias o novedades de un producto digital valioso 💜',
      version: '1.0.0',

    },
    servers: [
      {
        url: pathInitial,
        description: 'Development server'
      },
    ],
    components:{
      securitySchemes:{
        bearerAuth:{
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas:{
        Category : {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Identificador de categoría',
              example: '9a1bec'
            },
            name: {
              type: 'string',
              description: 'Nombre de categoría',
              example: 'Eventos'
            },
            description: {
              type: 'string',
              description: 'Descripción de categoría',
              example: 'Categoría de noticias sobre eventos o actividades.'
            },
          }
        },
      },
    },
  },

  apis: [path.join(process.cwd(), 'src/routes/*.js')],

};

module.exports = options;
