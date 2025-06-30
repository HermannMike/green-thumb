import api from './api';

export const getPlants = async () => {
  try {
    const response = await api.get('/plants');
    return response.data;
  } catch (error) {
    console.error('Get plants error:', error);
    throw error;
  }
};

export const addPlant = async (plant) => {
  try {
    const response = await api.post('/plants', plant);
    return response.data;
  } catch (error) {
    console.error('Add plant error:', error);
    throw error;
  }
};

export const updatePlant = async (updated) => {
  try {
    const response = await api.put(`/plants/${updated.id}`, updated);
    return response.data;
  } catch (error) {
    console.error('Update plant error:', error);
    throw error;
  }
};

export const deletePlant = async (id) => {
  try {
    await api.delete(`/plants/${id}`);
  } catch (error) {
    console.error('Delete plant error:', error);
    throw error;
  }
};
