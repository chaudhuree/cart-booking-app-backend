const prisma = require('../prisma/index');

// add booking
exports.addBooking = async (req, res) => {

  const { carId, userId, from, to, totalHours, totalAmount, transactionId, driverRequired } = req.body;
  // check user total booking amount
  const bookedByUser = await prisma.booking.count({
    where: {
      userId
    }
  });
  let amountToPay = totalAmount;
  if (bookedByUser <= 3) {
    amountToPay = totalAmount - (totalAmount * 0.3);
  }
  const booking = await prisma.booking.create({
    data: {
      carId,
      userId,
      totalHours,
      totalAmount: amountToPay,
      transactionId,
      driverRequired,
      BookedTimeSlot: {
        create: {
          from,
          to
        }
      }
    },
    include: {
      car: true,
      user: true,
      BookedTimeSlot: true
    }
  });
  // after creating the car update the car bookedTimeSlots array with the new booking
  await prisma.car.update({
    where: {
      id: carId
    },
    data: {
      bookedTimeSlots: {
        connect: {
          id: booking.BookedTimeSlot.id
        }
      }
    }
  });
  res.json(booking);
}
// get all bookings
exports.getAllBookings = async (req, res) => {
  const bookings = await prisma.booking.findMany({
    include: {
      car: true,
      user: true,
      BookedTimeSlot: true
    }
  });
  res.json(bookings);
}

// exports.bookedTimeSlots = async (req, res) => {
//   await prisma.bookedTimeSlot.create({
//     data: {
//       from: '2021-03-01T00:00:00.000Z',
//       to: '2021-03-02T00:00:00.000Z'
//     }
//   });
//   res.json('done');
// }