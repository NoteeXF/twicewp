const express = require("express");
const router = express.Router();
const controllerAuth = require("../controller/authController");

let routes = (app) => {

  router.post("/auth", controllerAuth.auth);
  router.post("/auth", controllerAuth.validate);

  app.use(router);
};

module.exports = routes;