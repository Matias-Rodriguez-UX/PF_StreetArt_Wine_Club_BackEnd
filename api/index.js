const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {LoadingDb} = require('./src/DbLoad.js')
const {LoadingProducts} = require('./src/DbLoadProducts.js')
// Sincronización de todos los modelos:
conn.sync({ force: false}).then(() => {
  server.listen(3001, () => {
    LoadingDb()
    LoadingProducts() 
    console.log('%s listening at 3001');
  });
});