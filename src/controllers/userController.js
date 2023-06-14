const User = require('../models/user');


const createUser = async (req, res) => {
    const data = req.body;

    try {
        const newUser = await User.create({
            name: data.name,
            phone_number: data.phoneNumber,
            password: data.password
        });

        return res.status(201).send({ status: true, message: 'User created successfully', result: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: 'An error occurred while creating user data' });
    }
};



const userLogin = async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                phone_number: phoneNumber,
                password: password
            }
        });

        if (user) {
            // User is authenticated
            return res.status(200).send({ status: true, message: 'Login successful', id: user.id });
        } else {
            // User credentials are incorrect
            return res.status(401).send({ status: false, message: 'Invalid phone number or password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An error occurred while performing user login' });
    }
};



const getUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);

        if (user) {
            return res.status(200).send({ status: true, message: 'User data access successfully', result: user });
        } else {
            return res.status(404).send({ status: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An error occurred while fetching user data' });
    }
};




module.exports = {
    createUser,
    userLogin,
    getUser
}





