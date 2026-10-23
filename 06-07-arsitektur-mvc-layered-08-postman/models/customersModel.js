let customers = [
  { id: 1, name: "Jiching", phone: "08123456789", vehicleNumber: "Z 11 PLI" },
  { id: 2, name: "Ahau", phone: "08987654321", vehicleNumber: "BG 44 HAU" },
  { id: 3, name: "Tantok", phone: "08112233445", vehicleNumber: "T 4 NTK" },
  { id: 4, name: "Jakues", phone: "08526677889", vehicleNumber: "J 4 KUS" },
  { id: 5, name: "Derren", phone: "08139900112", vehicleNumber: "K 1 OPG" }
];

function getAll() {
  return customers;
}

function getById(id) {
  return customers.find((item) => item.id === id);
}


function findByPhone(phone) {
  return customers.find((item) => item.phone === phone);
}

function create(data) {
  const newId = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
  const baru = { id: newId, ...data };
  customers.push(baru);
  return baru;
}

function update(id, data) {
  const index = customers.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const updated = { ...customers[index], ...data, id };
  customers[index] = updated;
  return updated;
}

function remove(id) {
  const index = customers.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const deleted = customers[index];
  customers.splice(index, 1);
  return deleted;
}

module.exports = { getAll, getById, findByPhone, create, update, remove };