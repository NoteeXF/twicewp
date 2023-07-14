const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({

	title: { type: String, required: true },
	file: { type: String, required: [true, "please provide a file"]},
	imageUrl: { type: String, required: true },
});


module.exports = mongoose.model("image", imageSchema);
