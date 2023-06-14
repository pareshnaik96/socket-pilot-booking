const Booking = require('../models/booking');



const getBookingId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const booking = await Booking.findOne({
            where: { user_id: userId },
            order: [['id', 'DESC']]
        });

        if (!booking) {
            // No booking found for the user
            return res.status(404).send({ status: false, message: 'No booking found for the user' });
        } else {
            const status = booking.status;
            const bookingId = booking.id;

            if (status === 'booked') {
                return res.status(400).send({ status: false, message: 'Booking already done' });
            }
            if (status === 'cancelled') {
                return res.status(400).send({ status: false, message: 'Booking cancelled' });
            }
            if (status === 'ongoing') {
                return res.status(200).send({ status: true, message: 'Ready for booking', bookingId, results: [booking] });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An unexpected error occurred' });
    }
};



const acceptBooking = async (req, res) => {
    const { pilotId, bookingId } = req.body;
    const updatedStatus = 'booked';

    try {
        const [affectedRows] = await Booking.update(
            { pilot_id: pilotId, status: updatedStatus },
            { where: { id: bookingId } }
        );

        if (affectedRows === 0) {
            return res.status(404).send({ status: false, message: 'Booking not found' });
        } else {
            return res.status(200).send({ status: true, message: 'Booking updated successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An error occurred while updating the booking' });
    }
};


const updateAcceptedBooking = async (req, res) => {
    const { pilotId, bookingId } = req.body;

    try {
        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).send({ status: false, message: 'No booking found for the user' });
        }

        const bookingStatus = booking.status;
        const updatedStatus = 'completed';

        if (bookingStatus === 'booked') {
            booking.pilot_id = pilotId;
            booking.status = updatedStatus;
            await booking.save();
            return res.status(200).send({ status: true, message: 'Booking updated successfully' });
        } else if (bookingStatus === 'cancelled') {
            return res.status(400).send({ status: false, message: 'Booking cancelled by user' });
        } else {
            return res.status(400).send({ status: false, message: 'Invalid booking status' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: 'An error occurred while updating the booking' });
    }
};



module.exports = {
    getBookingId,
    acceptBooking,
    updateAcceptedBooking
}