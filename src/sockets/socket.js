const pusher = require('../config/pusher')
const User = require('../models/user');


const requestBooking = async (req, res) => {
  const userId = req.params.id
  const pilotIds = ['1', '2']

  try {
    const user = await User.findByPk(userId);

    if (user) {
      const bookingPromises = pilotIds.map(pilotId => {
        let newBooking = {
          userId: req.params.id,
          pilotId: pilotId,
          pickup: req.body.newBooking.pickup,
          drop: req.body.newBooking.drop,
          name: user.name,
          phoneNumber: user.phone_number
        }

        pusher.trigger(`pilot-${pilotId}`, 'requested_booking', newBooking)
      })
      await Promise.all(bookingPromises);
      return res.status(200).send({ status: true, message: 'Requested User data' })
    } else {
      return res.status(404).send({ status: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: 'An error occurred while fetching requested user data' });
  }
}


const showBooking = (req, res) => {
  // console.log(req.body)

  const showBooking = {
    pickup: req.body.pickup,
    drop: req.body.drop,
  }
  pusher.trigger('show-booking', 'show_booking', showBooking)
  res.json({ created: true })
}


const showPilot = (req, res) => {

  const newPilot = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  }
  pusher.trigger('show-pilot', 'new_pilot', newPilot)
  res.json({ created: true })
}


const userCancelledBooking = (req, res) => {

  const cancelMessage = {
    message: req.body.message
  }
  pusher.trigger('cancel-booking', 'cancel_booking', cancelMessage)
  res.json({ cancelled: true })
}


const pilotCancelledBooking = (req, res) => {

  const cancelMessage = {
    message: req.body.message
  }
  pusher.trigger('cancel-byPilot', 'cancel_byPilot', cancelMessage)
  res.json({ cancelled: true })
}




module.exports = {
  // sendBooking,
  requestBooking,
  showBooking,
  showPilot,
  userCancelledBooking,
  pilotCancelledBooking,
}