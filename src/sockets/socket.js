const pusher = require('../config/pusher')
const User = require('../models/user');


const sendBooking = (req, res) => {

  const newBooking = {
    userId: req.body.userId,
    pickup: req.body.pickup,
    drop: req.body.drop,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  }
  pusher.trigger('send-booking-request', 'new_booking', newBooking)
  res.json({ created: true })
}


const showBooking = (req, res) => {
  console.log(req.body)

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
  sendBooking,
  showBooking,
  showPilot,
  userCancelledBooking,
  pilotCancelledBooking,
}