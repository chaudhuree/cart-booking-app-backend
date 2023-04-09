const prisma = require('../prisma/index');

// add booking
exports.addBooking = async (req, res) => {
  const { carId, userId, from, to } = req.body;
  const booking = await prisma.booking.create({
    data: {
      carId,
      userId,
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
      car: true
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