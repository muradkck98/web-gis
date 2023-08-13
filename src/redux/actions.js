// actions.js

// Action to add a new geojson layer
export const addLayer = ({id, name, data}) => ({
  type: 'ADD_LAYER',
  payload: { id, name, data },
});

// Action to remove a geojson layer
export const removeLayer = id => ({
  type: 'REMOVE_LAYER',
  payload: id,
});
