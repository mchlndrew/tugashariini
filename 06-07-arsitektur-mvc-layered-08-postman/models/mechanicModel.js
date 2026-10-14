let mechanics = [
  { id: 1, name: "Joko", specialty: "Spesialis Mesin & Tune Up", status: "Available" },
  { id: 2, name: "Bambang", specialty: "Kelistrikan & Detailing", status: "On Duty" },
  { id: 3, name: "Agus", specialty: "Sistem Pengereman & Kaki-kaki", status: "Available" }
];

function getAll() {
  return mechanics;
}

function getById(id) {
  return mechanics.find((item) => item.id === id);
}

function create(data) {
  const newId = mechanics.length > 0 ? mechanics[mechanics.length - 1].id + 1 : 1;
  const baru = { id: newId, status: "Available", ...data };
  mechanics.push(baru);
  return baru;
}

function update(id, data) {
  const index = mechanics.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const updated = { ...mechanics[index], ...data, id };
  mechanics[index] = updated;
  return updated;
}

function remove(id) {
  const index = mechanics.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const deleted = mechanics[index];
  mechanics.splice(index, 1);
  return deleted;
}

module.exports = { getAll, getById, create, update, remove };