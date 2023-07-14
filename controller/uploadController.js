const Image = require("../models/image")
const path = require("path");
const asyncWrapper = require("../middleware/asyncWrapper");

const singleUploadFile = asyncWrapper(async (req, res, next) => {
    const { title } = req.body;
    const file = req.file.filename;
    const imageUrl = `http://localhost:8080/files/${req.file.filename}`;
    const item = await Image.create({ title, file, imageUrl });
    res.status(201).json({ item });
    });

   const getAllimage = async (req, res) => {
        const songs = await Image.find();
        res.status(200).send({ data: songs });
    };
    
module.exports = {
    singleUploadFile,
    getAllimage,
};