const Pilot = require('../models/pilot');


const createPilot = async (req, res) => {
    const data = req.body;

    try {
        const newPilot = await Pilot.create({
            name: data.name,
            phone_number: data.phoneNumber,
            password: data.password
        });

        return res.status(201).send({ status: true, message: 'Pilot created successfully', data: newPilot });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: 'An error occurred while creating pilot data' });
    }
};


const pilotLogin = async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const pilot = await Pilot.findOne({
            where: {
                phone_number: phoneNumber,
                password: password
            }
        });

        if (pilot) {
            return res.status(200).send({ status: true, message: 'Login successful', pilotId: pilot.id });
        } else {
            return res.status(401).send({ status: false, message: 'Invalid phone number or password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An error occurred while performing pilot login' });
    }
};


const getPilot = async (req, res) => {
    const pilotId = req.params.id;

    try {
        const pilot = await Pilot.findByPk(pilotId);

        if (pilot) {
            return res.status(200).send({ status: true, message: 'Pilot data access successfully', result: pilot });
        } else {
            return res.status(404).send({ status: false, message: 'Pilot not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An error occurred while fetching pilot data' });
    }
};


module.exports = {
    createPilot,
    pilotLogin,
    getPilot
}
