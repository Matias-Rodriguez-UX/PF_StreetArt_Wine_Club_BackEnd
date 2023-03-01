require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_DEPLOY,
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/products`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

// ------------------------Para deployar -------
const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});
// --------------------------------------------------------

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Type, Grape, State, Region, Review, User, Membership, ShoppingCart, Order, Address, Newsletter } = sequelize.models;


// Aca vendrian las relaciones

//relación producto → tipo
Product.belongsToMany(Type, { through: 'Product_Type', timestamps: false });
Type.belongsToMany(Product, { through: 'Product_Type', timestamps: false });

//relación producto → cepa
Product.belongsToMany(Grape, { through: 'Product_Grape', timestamps: false })
Grape.belongsToMany(Product, { through: 'Product_Grape', timestamps: false })

//relación producto → provincia
Product.belongsToMany(State, { through: 'Product_State', timestamps: false })
State.belongsToMany(Product, { through: 'Product_State', timestamps: false })

//relación producto → ciudad
Product.belongsToMany(Region, { through: 'Product_Region', timestamps: false })
Region.belongsToMany(Product, { through: 'Product_Region', timestamps: false })

//relación nro de orden → carrito
Order.belongsToMany(Product, { through: ShoppingCart });
Product.belongsToMany(Order, { through: ShoppingCart });

//relación User → Membership
User.belongsToMany(Membership, { through: 'User_Membership' });
Membership.belongsToMany(User, { through: 'User_Membership' });

//relacion usuario → producto
User.belongsToMany(Product, { through: 'Favourite' });
Product.belongsToMany(User, { through: 'Favourite' });

//relación producto → review: en Review voy a tener la FK productId (el id del product al que pertenece dicha review)
Product.hasMany(Review);
Review.belongsTo(Product);

//relación usuario → review: en review voy a tener la FK userId (el id del usuario al que pertenece dicha review)
User.hasMany(Review);
Review.belongsTo(User);

//relacion usuario → carrito
User.hasMany(ShoppingCart);
ShoppingCart.belongsTo(User);

//relación usuario → pedido
User.hasMany(Order);
Order.belongsTo(User)

//relación usuario → dirección
User.hasMany(Address);
Address.belongsTo(User);

//relación dirección → pedido
Address.hasMany(Order);
Order.belongsTo(Address);

//relación usuario → newsletter
User.hasMany(Newsletter);
Newsletter.belongsTo(User);

//relación usuario → newsletter
Product.hasMany(Newsletter);
Newsletter.belongsTo(Product);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importar la conexión { conn } = require('./db.js');
};
