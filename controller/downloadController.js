const asyncWrapper = require("../middleware/asyncWrapper")
const Image = require("../models/image")
const path = require("path");


const getItems = async (req, res) => {
  try {
    const items = await Image.find();
    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
  }
};


const download = asyncWrapper(async (req, res) => {
  const { file } = req.params;
  const item = await Image.findOne(file);
  if (!item) {
    return next(new Error("No item found"));
  }
  const files = item.file;
  const filePath = path.join(__dirname, `../${files}`);
  res.download(filePath);
});
module.exports = {
  download,
  getItems,
};