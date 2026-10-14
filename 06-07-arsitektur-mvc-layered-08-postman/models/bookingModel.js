// let bookings = [
//   {
//     id: 1,
//     customerName: "Jiching",
//     vehicleNumber: "Z 11 PLI",
//     serviceType: "Tune Up & Ganti Oli",
//     bookingDate: "2026-10-01 10:00",
//     status: "Pending"
//   },
//   {
//     id: 2,
//     customerName: "Ahau",
//     vehicleNumber: "BG 44 HAU",
//     serviceType: "Detailing",
//     bookingDate: "2026-10-02 09:30",
//     status: "Completed"
//   },
//   {
//     id: 3,
//     customerName: "Tantok",
//     vehicleNumber: "T 4 NTK",
//     serviceType: "Ganti Kampas Rem",
//     bookingDate: "2026-10-03 09:00",
//     status: "Completed"
//   },
//   {
//     id: 4,
//     customerName: "Jakues",
//     vehicleNumber: "J 4 KUS",
//     serviceType: "Ganti Kaki kaki",
//     bookingDate: "2026-10-03 11:00",
//     status: "Pending"
//   },
//   {
//     id: 5,
//     customerName: "Derren",
//     vehicleNumber: "K 1 OPG",
//     serviceType: "Servis AS Roda Dan Detailing",
//     bookingDate: "2026-10-03 13:00",
//     status: "Pending"
//   }
// ];
let bookings = [
  {
    id: 1,
    customerId: 1,
    serviceId: 1,
    vehicleNumber: "Z 11 PLI",
    bookingDate: "2026-10-01 10:00",
    status: "Pending"
  },
  {
    id: 2,
    customerId: 2,
    serviceId: 2,
    vehicleNumber: "BG 44 HAU",
    bookingDate: "2026-10-02 09:30",
    status: "Completed"
  },
  {
    id: 3,
    customerId: 3,
    serviceId: 3,
    vehicleNumber: "T 4 NTK",
    bookingDate: "2026-10-03 09:00",
    status: "Completed"
  },
  {
    id: 4,
    customerId: 4,
    serviceId: 4,
    vehicleNumber: "J 4 KUS",
    bookingDate: "2026-10-03 11:00",
    status: "Pending"
  },
  {
    id: 5,
    customerId: 5,
    serviceId: 5,
    vehicleNumber: "K 1 OPG",
    bookingDate: "2026-10-03 13:00",
    status: "Pending"
  }
];
module.exports = {
  getAll: () => bookings,
  getById: (id) => bookings.find(b => b.id === id),
  create: (data) => {
    const newBooking = {
      id: bookings.length + 1,
      customerId: data.customerId,
      serviceId: data.serviceId,
      vehicleNumber: data.vehicleNumber,
      bookingDate: data.bookingDate,
      status: "Pending"
    };
    bookings.push(newBooking);
    return newBooking;
  },
  update: (id, data) => {
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    bookings[index] = { ...bookings[index], ...data };
    return bookings[index];
  },
  patch: (id, data) => {
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    bookings[index] = { ...bookings[index], ...data };
    return bookings[index];
  },
  remove: (id) => {
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    const deleted = bookings.splice(index, 1);
    return deleted[0];
  }
};
