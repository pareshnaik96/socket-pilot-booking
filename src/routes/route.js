const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const pilotController = require('../controllers/pilotController')
const userBookingController = require('../controllers/userBookingController')
const pilotBookingController = require('../controllers/pilotBookingController')
const event = require('../sockets/socket')
const path = require('path');

//user routes
router.post('/api/user', userController.createUser)
router.post('/api/user/login', userController.userLogin)
router.get('/api/user/:id', userController.getUser)

//pilot routes
router.post('/api/pilot', pilotController.createPilot)
router.post('/api/pilot/login', pilotController.pilotLogin)
router.get('/api/pilot/:id', pilotController.getPilot)

//user's booking routes
router.post('/api/booking/:userId', userBookingController.createBooking)  // user create booking api
router.get('/api/booking/:userId', userBookingController.getBooking) //get all bookings of user
router.get('/api/booking/get/:userId', userBookingController.getUserBookingId)
router.put('/api/booking/update/:bookingId', userBookingController.updateBooking)

//pilot's booking routes
router.get('/api/booking/get-id/:userId', pilotBookingController.getBookingId)
router.put('/api/booking/accept', pilotBookingController.acceptBooking)
router.put('/api/booking/update-accept', pilotBookingController.updateAcceptedBooking)

//socket event routes
router.post('/booking', event.sendBooking)
// router.post('/requested-booking/:id', event.requestBooking)
// router.post('/accepted-booking', event.acceptedBooking)
router.post('/showbooking', event.showBooking)
router.post('/pilot', event.showPilot)
router.post('/cancel', event.userCancelledBooking)
router.post('/cancelbooking', event.pilotCancelledBooking)

// routing 
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'login.html'))
});

router.get('/booking.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'booking.html'))
});

router.get('/pilot/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'pilotLogin.html'))
});

router.get('/pilot/pilot.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'pilot.html'))
});



module.exports = router;












