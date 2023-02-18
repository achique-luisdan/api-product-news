/**  @description Used CommonJS as Module System */
const express  = require('express');
const cors = require('cors');

const { configs } = require('../configs/configs');
const sequelize = require('../libs/database');

const routes = require('../src/routes/routes');

const app = express();
const port = configs.port;

app.use(cors());
app.use(express.json());
routes(app);

async function main(){
  try {
    await sequelize.sync({force: false});
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }

}

main();
