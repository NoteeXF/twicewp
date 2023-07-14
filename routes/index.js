const express = require("express");
const router = express.Router();
const { getItems,download }  = require("../controller/downloadController");
const controllerUser = require("../controller/userController");
const {upload} = require("../middleware/uploud");
const {singleUploadFile} = require("../controller/uploadController")
const {imageSearch} = require("../controller/searchController")
const multer = require('multer');
const auth = require("../middleware/auth")
const authz = require("../middleware/admin")



let routes = (app) => {
  
  router.get("/files", auth, getItems);
  router.get("/files/:name",auth, download);
  router.post("/api/upload", authz, upload.single("file"), singleUploadFile);
  router.get("/api/", imageSearch);
  app.use(router);
};

module.exports = routes;
  


