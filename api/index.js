const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {LoadingDb} = require('./src/DbLoad.js')
// Sincronización de todos los modelos:
conn.sync({ force: true}).then(() => {
  server.listen(3001, () => {
    LoadingDb()
    console.log('%s listening at 3001');
  });
});