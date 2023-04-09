const express = require("express");
const router = express.Router();
const { authenticated, admin } = require('../middleware/authentication');


const { addCar, getAllCars, getCarById, editCar, deleteCar, disconnectSingleBookedTimeSlot, disconnectBookedTimeSlots } = require("../controllers/cars");

router.post("/addcar", addCar);
router.get("/getallcars", getAllCars);
router.post("/getcarbyid", getCarById);
router.put("/editcar", editCar);
router.post("/deletecar", deleteCar);
router.post("/disconnectsinglebookedtimeslot", disconnectSingleBookedTimeSlot);
router.post("/disconnectbookedtimeslots", disconnectBookedTimeSlots);

module.exports = router;
