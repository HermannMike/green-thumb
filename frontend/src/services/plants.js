let plants = [];

export const getPlants = () => Promise.resolve(plants);
export const addPlant = (plant) => {
  plant.id = Date.now();
  plants.push(plant);
  return Promise.resolve(plant);
};
export const updatePlant = (updated) => {
  plants = plants.map((p) => (p.id === updated.id ? updated : p));
  return Promise.resolve(updated);
};
export const deletePlant = (id) => {
  plants = plants.filter((p) => p.id !== id);
  return Promise.resolve();
};