const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");


const auth = async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const admin = await User.findOne({ role: req.body.role });
		if (user.role == "admin")
			return res.status(200).json({ message: 'Login berhasil sebagai admin.'});

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
			
		const token = user.generateAuthToken();
		res.status(200).send({data: token, message: "logged in successfully user" });
		
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
};

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = {
    auth,
    validate,
  };