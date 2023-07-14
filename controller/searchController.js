const Image = require("../models/image");

const imageSearch = async (req, res) => {
  const search = req.query.search;
  if (typeof search === "string" && search !== "") {
    const image = await Image.find({
      title: { $regex: search, $options: "i" },
    }).limit(10);
    const result = { image };
    res.status(200).send(result);
  } else {
    res.status(200).send({});
  }
};

module.exports = {
    imageSearch,
}