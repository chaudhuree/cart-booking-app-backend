const prisma = require('../prisma/index');

// add car
exports.addCar = async (req, res) => {
  const { name, image, capacity, fuelType, rentPerHour } = req.body;
  const car = await prisma.car.create({
    data: {
      name,
      image,
      capacity,
      fuelType,
      rentPerHour
    }
  });
  res.json(car);
}

// get all cars
exports.getAllCars = async (req, res) => {
  const cars = await prisma.car.findMany({
    include: {
      bookedTimeSlots: true,
      Booking: true
    }
  });
  res.json(cars);
}


// edit car
exports.editCar = async (req, res) => {
  const { id, name, image, capacity, fuelType, rentPerHour } = req.body;
  const car = await prisma.car.update({
    where: {
      id: id
    },
    data: {
      name,
      image,
      capacity,
      fuelType,
      rentPerHour
    }
  });
  res.json(car);
}

// get car by id
exports.getCarById = async (req, res) => {
  const { id } = req.body;
  const car = await prisma.car.findFirst({
    where: {
      id: id
    },
    include: {
      bookedTimeSlots: true,
      Booking: true
    }
  });
  res.json(car);
}

//disconnect single bookedTimeSlot
exports.disconnectSingleBookedTimeSlot = async (req, res) => {
  const { id } = req.body;
  const car = await prisma.car.update({
    where: {
      id: id
    },
    data: {
      bookedTimeSlots: {
        disconnect: { id: "6432c31cfef5ec70a9870897" }
      }
    },
    include: {
      bookedTimeSlots: true
    }
  });
  res.json(car);
}
//disconnect all bookedTimeSlots
exports.disconnectBookedTimeSlots = async (req, res) => {
  const { id } = req.body;
  const car = await prisma.car.update({
    where: {
      id: id
    },
    data: {
      bookedTimeSlots: {
        deleteMany: {}
      }
    },
    include: {
      bookedTimeSlots: true
    }
  });
  res.json(car);
}

// delete car
exports.deleteCar = async (req, res) => {
  const { id } = req.body;
  const car = await prisma.car.delete({
    where: {
      id: id
    }
  });
  res.json({ message: "Car deleted successfully" });
}
