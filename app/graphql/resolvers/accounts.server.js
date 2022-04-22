const mongoose = require('mongoose');
const Account = require('mongoose').model('Account');
const Patient = require('mongoose').model('Patient');
const Nurse = require('mongoose').model('Nurse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

const jwtExpirySeconds = 60 * 60 * 2;
const jwtKey =config.secretKey;

module.exports = {
createAccount: async args => {
	try {
		const existingAccount = await Account.findOne({ email: args.accountInput.email });
		if (existingAccount) {
			throw new Error('Account exists already.');
		}

		let newAccount = new Account({
			firstName: args.accountInput.firstName,
			lastName: args.accountInput.lastName,
			email: args.accountInput.email,
			password: args.accountInput.password,
			address: args.accountInput.address,
			city: args.accountInput.city,
			phoneNumber: args.accountInput.phoneNumber,
			accountType: args.accountInput.accountType
		});

		await newAccount.save();

		if (args.accountInput.accountType === 'PATIENT') {
			let patient = new Patient();
			patient.account = newAccount;
			patient.nurse = new mongoose.Types.ObjectId(args.accountInput.nurseId);
			await patient.save();
		} else {
			let nurse = new Nurse();
			nurse.account = newAccount;
			await nurse.save();
		}

		const payload = {
			user: {
				id: newAccount._id,
				accountType: newAccount.accountType
			}
		}

		// Create token with the id of the user in the payload and expires as per jwtExpirySeconds
		jwt.sign(payload, jwtKey,
			{
				algorithm: 'HS256', expiresIn: jwtExpirySeconds
			},
			(err, token) => {
				if (err) {
					throw err;
				}
				return ({ token: token });
			}
		);

	} catch(err) {
		throw err;
	}
},
isLoggedInUser: async (req, res) => {

	try {
		const user = await Account.findById(req.user.id).select('-password');
		res.json(user);S
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server Error');
	}

},

loginUser: async ({ email, password }) => {

	try{

		let user = await Account.findOne({ email: email });
		// Checks to see if the user is not null
		if(!user) {
			throw new Error('Invalid Credentials');
		}
		// matches the password of user with the stored password
		const isMatch = await bcrypt.compare(password, user.password);
		// reports invalid if password doesn't match
		if (!isMatch) {
			throw new Error('Password is incorrect!');
		}
		
		const payload = {
			user:{
				id: user._id,
				type: user.accountType
			}
		}

		// Create token with the id of the user in the payload and expires as per jwtExpirySeconds
		const token =jwt.sign(payload, jwtKey,
			{
				algorithm: 'HS256', expiresIn: jwtExpirySeconds
			}
		);

		return { token: token }

	} catch (err) {
		console.error(err.message);
		throw err;
	}
}
}