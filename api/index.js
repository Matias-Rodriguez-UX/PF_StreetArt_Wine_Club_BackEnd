const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {LoadingDb} = require('./src/DbLoad.js')
const {LoadingProducts} = require('./src/DbLoadProducts.js')
// Sincronización de todos los modelos:
conn.sync({ force: true}).then( () => {
  server.listen(3001, async() => {
    await LoadingDb()
    await LoadingProducts()  
    console.log('%s listening at 3001');
  });
});