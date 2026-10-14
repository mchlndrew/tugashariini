let services = [
  { id: 1, name: "Tune Up & Ganti Oli", price: 350000, duration: "60 menit" },
  { id: 2, name: "Detailing", price: 500000, duration: "120 menit" },
  { id: 3, name: "Ganti Kampas Rem", price: 200000, duration: "45 menit" },
  { id: 4, name: "Ganti Kaki kaki", price: 750000, duration: "180 menit" },
  { id: 5, name: "Servis AS Roda Dan Detailing", price: 850000, duration: "210 menit" }
];

function getAll() {
  return services;
}

function getById(id) {
  return services.find((item) => item.id === id);
}

function create(data) {
  const newId = services.length > 0 ? services[services.length - 1].id + 1 : 1;
  const baru = { id: newId, ...data };
  services.push(baru);
  return baru;
}

function update(id, data) {
  const index = services.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const updated = { ...services[index], ...data, id };
  services[index] = updated;
  return updated;
}

function remove(id) {
  const index = services.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const deleted = services[index];
  services.splice(index, 1);
  return deleted;
}

module.exports = { getAll, getById, create, update, remove };

