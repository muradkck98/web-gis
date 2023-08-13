import React, { useCallback, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Popup, ImageOverlay } from 'react-leaflet';


import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [wmsLink, setWmsLink] = useState('');
  const [geotiffLink, setGeotiffLink] = useState('');
  const [bounds, setBounds] = useState(null);

  const layers = useSelector(state => state.layers);

  const renderLayers = useCallback(() => {
  return layers.map(layer => {
    if (layer.data && layer.data.features) {
      return layer.data.features.map(feature => {
        const properties = feature.properties;

        if (Object.keys(properties).length >= 0) {
          return (
            <GeoJSON data={feature} key={feature.id}>
              <Popup>
                <div>
                  {Object.entries(properties).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
                </div>
              </Popup>
            </GeoJSON>
          );
        }
        return null;
      });
    }
    return null;
  });
}, [layers]);

const handleInputChange = (event) => {
  setWmsLink(event.target.value);
};

const handleAddWmsLayer = () => {
  const trimmedUrl = wmsLink.trim();
  //Example wms link:  https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
  setWmsLink(trimmedUrl !== '' ? trimmedUrl : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
};

const handleGeotiffInputChange = (event) => {
  setGeotiffLink(event.target.value);
};

const handleAddGeotiffLayer = () => {
  const trimmedUrl = geotiffLink.trim();
  if (trimmedUrl !== '') {
    const southWest = [38.0, 32.0];
    const northEast = [40.0, 34.0];
    setBounds([southWest, northEast]);
    setGeotiffLink(trimmedUrl);
  }
};

  return (
    <div style={{width: '100%'}}>
    <MapContainer center={[39.92077, 32.85411]} zoom={6} style={{ width: '100%', height: '90vh' }}>
    <LayersControl position="topright">
    <LayersControl.BaseLayer checked name="Add Layer">
        <TileLayer url={wmsLink !== '' ?  wmsLink : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="OpenStreetMap">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Satellite">
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      </LayersControl.BaseLayer>
    </LayersControl>
    <div style={{ position: 'absolute', top: '10px', right: '150px', zIndex: '1000' }}>
          <input type="text" value={wmsLink} onChange={handleInputChange} placeholder="Enter WMS URL" />
          <button onClick={handleAddWmsLayer}>Add WMS</button>
        </div>
        <div style={{ position: 'absolute', top: '35px', right: '145px', zIndex: '1000' }}>
          <input
            type="text"
            value={geotiffLink}
            onChange={handleGeotiffInputChange}
            placeholder="Enter Geotiff URL"
          />
          <button onClick={handleAddGeotiffLayer}>Add Geotiff</button>
        </div>
    {renderLayers()}
    {bounds && (
          <ImageOverlay url={geotiffLink} bounds={bounds}>
          </ImageOverlay>
        )}
  </MapContainer>
  </div>
  );
};

export default MapComponent;

