import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { booleanWithin } from "@turf/turf";
import { addLayer } from "../../redux/actions";
import { uniqueId } from "lodash";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";



const QueryData = () => {
  const dispatch = useDispatch();
  const layers = useSelector((state) => state.layers);
  const [selectedLayers, setSelectedLayers] = useState([]);
  const [selectedLayers2, setSelectedLayers2] = useState([]);
  const [queryResult, setQueryResult] = useState([]);

  const handleSelectLayer = (layerId, isSecondSelect) => {
    const layer = layers.find((layer) => layer.id === layerId);
    if (isSecondSelect) {
      setSelectedLayers2((prev) => [...prev.filter((prevLayer) => prevLayer.id !== layerId), layer]);
    } else {
      setSelectedLayers((prev) => [...prev.filter((prevLayer) => prevLayer.id !== layerId), layer]);
    }
  };

  const handleQueryFeatures = () => {
    if (selectedLayers.length >= 1 && selectedLayers2.length >= 1) {
      const firstLayerFeatures = selectedLayers[0].data.features;
      const secondLayerFeatures = selectedLayers2[0].data.features;


      const withinFeatures = [];
      firstLayerFeatures.forEach((firstFeature) => {
        secondLayerFeatures.forEach((secondFeature) => {
          if (booleanWithin(secondFeature, firstFeature)) {
            withinFeatures.push(secondFeature);
          }
        });
      });


      if (withinFeatures.length > 0) {
        const featureCollection = {
          type: "FeatureCollection",
          features: withinFeatures,
        };
        setQueryResult(featureCollection);
        const data = { name: "intersectData", id: uniqueId(), data: featureCollection };
        dispatch(addLayer(data));
      }
    }
  };

  return (
    <div>
        <div style={{ display: "flex", alignItems: "center" }}>
        <h4>Select Layers for Query</h4>
        <Tooltip title="Geometrik olarak; First Layer verisinin içinde Second Layer versini sorgular!">
          <InfoCircleOutlined style={{ marginLeft: 8 }} />
        </Tooltip>
      </div>
      <p>First Layer:</p>
      <select onChange={(e) => handleSelectLayer(e.target.value, false)}>
        <option value="">Select a layer</option>
        {layers.map((layer) => (
          <option key={layer.id} value={layer.id} disabled={selectedLayers2.some((selected) => selected.id === layer.id)}>
            {layer.name}
          </option>
        ))}
      </select>

      <p>Second Layer:</p>
      <select onChange={(e) => handleSelectLayer(e.target.value, true)}>
        <option value="">Select a layer</option>
        {layers.map((layer) => (
          <option key={layer.id} value={layer.id} disabled={selectedLayers.some((selected) => selected.id === layer.id)}>
            {layer.name}
          </option>
        ))}
      </select>

      {selectedLayers.length >= 1 && selectedLayers2.length >= 1 && (
        <div>
          <br></br>
          <button onClick={handleQueryFeatures}>Query Features</button>
        </div>
      )}
      {queryResult.length > 0 && (
        <div>
          <h3>Query Result</h3>
          <ul>
            {queryResult.map((feature) => (
              <li key={feature.properties.id}>{feature.properties.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QueryData;
