const Booking = require('../models/booking');


const createBooking = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.findAll({
      where: {
        user_id: userId
      },
      order: [['id', 'DESC']],
      limit: 1
    });

    if (bookings.length === 0) {
      // No booking found for the user
      const data = req.body;
      const status = 'ongoing';

      const newBooking = await Booking.create({
        pickup_location: data.pickup_location,
        user_id: userId,
        status: status
      });

      const bookingId = newBooking.id;
      return res.status(201).send({ status: true, message: 'Booking created successfully', userId, bookingId, data });
    } else {
      const booking = bookings[0];
      if (booking.status === 'ongoing') {
        return res.status(400).send({ status: false, message: 'Already has an ongoing booking' });
      } else if (booking.status === 'cancelled' || booking.status === 'completed') {
        const data = req.body;
        const status = 'ongoing';

        const newBooking = await Booking.create({
          pickup_location: data.pickup_location,
          user_id: userId,
          status: status
        });

        const bookingId = newBooking.id;
        return res.status(201).send({ status: true, message: 'Booking created successfully', userId, bookingId, data });
      } else {
        return res.status(400).send({ status: false, message: 'Booking already done', results: bookings });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: 'An error occurred while creating booking' });
  }
}



const getBooking = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.findAll({
      where: {
        user_id: userId
      },
      order: [['id', 'DESC']]
    });

    if (bookings.length === 0) {
      // No booking found for the user
      return res.status(404).send({ status: false, message: 'No booking found for the user' });
    } else {
      const bookingId = bookings[0].id;
      return res.status(200).send({ status: true, message: 'Booking already done', bookingId, results: bookings });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: 'An error occurred while fetching booking data' });
  }
};



const getUserBookingId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.findAll({
      where: {
        user_id: userId
      },
      order: [['id', 'DESC']],
      limit: 1
    });

    if (bookings.length === 0) {
      // No booking found for the user
      return res.status(404).send({ status: false, message: 'No booking found for the user' });
    } else {
      const status = bookings[0].status;
      const bookingId = bookings[0].id;

      if (status === 'cancelled') {
        return res.status(400).send({ status: false, message: 'Booking cancelled' });
      }
      if (status === 'ongoing' || status === 'booked') {
        return res.status(200).send({ status: true, message: 'Access booking and BookingId', bookingId, results: bookings });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: 'An error occurred while fetching booking data' });
  }
};



const updateBooking = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      // No booking found for the provided booking ID
      return res.status(404).send({ status: false, message: 'No booking found for the provided ID' });
    } else {
      const bookingStatus = booking.status;

      if (bookingStatus === 'ongoing' || bookingStatus === 'booked') {
        const updatedBooking = await booking.update({
          status: 'cancelled'
        });

        return res.status(200).send({ status: true, message: 'Booking updated successfully', result: updatedBooking });
      }
      if (bookingStatus === 'cancelled') {
        return res.status(400).send({ status: false, message: 'Booking already cancelled' });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: 'An error occurred while updating the booking' });
  }
};


module.exports = {
  createBooking,
  getBooking,
  getUserBookingId,
  updateBooking
}