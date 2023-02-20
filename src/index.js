const app = require('./app');

const { configs } = require('./configs/configs');
const sequelize = require('./configs/database');

const port = configs.port;

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
