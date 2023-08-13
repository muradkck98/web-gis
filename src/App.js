import React from 'react';
import LayerManager from './components/LayerManager/index'; 
import MapComponent from './components/MapComponent/index'; 
import Header from './components/Header';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex' }}>
        <LayerManager />
        <MapComponent />
      </div>
    </div>
  );
}

export default App;
