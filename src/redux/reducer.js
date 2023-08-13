// layersReducer.js

// Initial state for geojson layers
const initialState = {
  layers: [],
};

// Reducer function
const layersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LAYER':
      return {
        ...state,
        layers: [...state.layers, action.payload],
      };
    case 'REMOVE_LAYER':
      return {
        ...state,
        layers: state.layers.filter(layer => layer.id !== action.payload),
      };
    default:
      return state;
  }
};

export default layersReducer;
