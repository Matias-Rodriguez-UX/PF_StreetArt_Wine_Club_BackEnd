const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { LoadingDb } = require("./src/DbLoad.js");
const { LoadingProducts } = require("./src/DbLoadProducts.js");
// Sincronización de todos los modelos:
const port = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  server.listen(port, async () => {
    await LoadingDb();
    await LoadingProducts();
    console.log("%s listening at 3001");
  });
});
