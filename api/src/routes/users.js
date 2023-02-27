const { Router } = require("express");
const {
  User,
  Product,
  Membership,
  ShoppingCart,
  Order,
  Review,
} = require("../db");
const { createUser } = require("../controllers/createUser");
const { deleteUser } = require("../controllers/deleteUser");
const { getUserID } = require("../controllers/getUserID");
const { updateUser } = require("../controllers/updateUser");
const { deleteItemCart } = require("../controllers/deleteItemCart");
const { addCart } = require("../controllers/addCart");
const { updateCart } = require("../controllers/updateCart");
const { assignMembership } = require("../controllers/assignMembership");
const { getMembership } = require("../controllers/getMembership");
const { updateMembership } = require("../controllers/updateMembership");
const { authenticator } = require("../controllers/authenticator");
const { getUserByEmail } = require("../controllers/getUserByEmail");
const { emailUser } = require("../controllers/email");
const { addFavourite } = require("../controllers/addFavourite");
const { getFavourites } = require("../controllers/getFavourites");
const { deleteFavourite } = require("../controllers/deleteFavourite");
const { setCancelCart } = require("../controllers/setCancelCart");
const { Op } = require("sequelize");

const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const { isAdmin, isAuthenticated } = require("../utils/middleware");

const router = Router();

//Traer usuario por ID
router.post("/auth", async (req, res) => {
  try {
    const { email, name, picture, role, birthdate } = req.body;
    const fullname = name;
    let result = await authenticator(email, fullname, picture, role, birthdate);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//traer los favoritos
router.get("/favourites/:email", async (req, res) => {
  try {
    const { email } = req.params;
    let result = await getFavourites(email);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    let result = await getUserByEmail(email);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    let result = await getUserID(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//traer todos los usuarios

// crear usuario
router.post("/", async (req, res) => {
  try {
    const { email, role, fullname, profile, avatar, birthdate } = req.body;
    let result = await createUser(
      email,
      role,
      fullname,
      profile,
      avatar,
      birthdate
    );
    // emailUser(email, fullname)
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//eliminar permanentemente usuario
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await deleteUser(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//modificar datos del usuario

router.put("/", async (req, res) => {
  try {
    const {
      id,
      email,
      role,
      fullname,
      profile,
      avatar,
      status,
      birthdate,
      dni,
    } = req.body;

    let result = await updateUser(
      id,
      email,
      role,
      fullname,
      profile,
      avatar,
      status,
      birthdate,
      dni
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(console.log(error.message));
  }
});

//Agregar item al carrito
router.post("/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  const { totalPrice, quantity, email, productId } = req.body;
  try {
    let result = await addCart(userId, totalPrice, quantity, email, productId);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  const { totalPrice, quantity, email, productId } = req.body;
  try {
    let result = await updateCart(
      userId,
      totalPrice,
      quantity,
      email,
      productId
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// ruta para eliminar el carrito completo
router.delete("/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  let usuario = await User.findOne({ where: { id: userId } });
  try {
    const result = await Order.destroy({
      where: { userEmail: usuario.email, status: "cart" },
    });
    if (result) {
      res.status(200).send({ message: "Cart delete" });
    } else {
      res.status(200).send({ message: "Cannot be deleted" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Ruta para traer todos los productos del carrito u order por id
//
router.get("/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  let usuario = await User.findOne({ where: { id: userId } });
  try {
    const result = await Order.findOne({
      where: {
        userEmail: usuario.email,
        [Op.or]: [{ status: "cart" }, { status: "processing payment" }],
      },
      include: [
        { model: Product, as: "products" },
        { model: User, as: "user" },
      ],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Eliminar carrito de un usuario en realidad se debe cambiar a un estado de cancelado
router.put("/cancel/:idCart", async (req, res) => {
  try {
    const { idCart } = req.params;
    let result = await setCancelCart(idCart);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Eliminar un producto carrito de un usuario
router.delete("/:id/cart/:idProduct", async (req, res) => {
  const userId = req.params.id;
  let usuario = await User.findOne({ where: { id: userId } });
  // console.log(usuario)
  try {
    const { idProduct } = req.params;
    let result = await deleteItemCart(usuario.email, idProduct);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//agregar membresia
router.post("/membership", async (req, res) => {
  try {
    const { name, discount, price, description } = req.body;
    let result = await Membership.findOrCreate({
      where: {
        name: name,
        discount: discount,
        price: price,
        description: description,
      },
    });
    res.status(200).send({ message: "Membership created" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//traer membresia por id

router.get("/membership/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await getMembership(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//actualizar membresia
router.put("/membership/:idMembership", async (req, res) => {
  try {
    const { idMembership } = req.params;
    const { name, discount, price, description } = req.body;
    let result = await updateMembership(
      idMembership,
      name,
      discount,
      price,
      description
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// asignar membresia al usuario
router.put("/:userId/membership/", async (req, res) => {
  try {
    const { userId } = req.params;
    const { idMembership } = req.body;
    let result = await assignMembership(userId, idMembership);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//agregar favorito a usuario

router.post("/fav/:email/:id", async (req, res) => {
  const { email, id } = req.params;

  try {
    const result = await addFavourite(email, id);
    // console.log(result)
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//borrar favorito

router.delete("/deleteFav/:email/:id", async (req, res) => {
  const { email, id } = req.params;
  try {
    const result = await deleteFavourite(email, id);
    res.send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
