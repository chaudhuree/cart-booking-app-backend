const express = require('express');
const router = express.Router();

const { addBooking, getAllBookings, bookedTimeSlots } = require('../controllers/booking');

router.post('/addbooking', addBooking);
router.get('/getallbookings', getAllBookings);
// router.get('/bookedtimeslots', bookedTimeSlots);

module.exports = router;