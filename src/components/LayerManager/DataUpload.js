import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addLayer, removeLayer } from "../../redux/actions";
import { uniqueId } from "lodash";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";


const DataUpload = () => {
    const dispatch = useDispatch();
    const layers = useSelector(state => state.layers); 
    
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const uploadedData = JSON.parse(e.target.result);
                    const data = { name: file.name, id: uniqueId(), data: uploadedData };
                    dispatch(addLayer(data));
                } catch (error) {
                    console.error('GeoJSON dosyasını analiz ederken bir hata oluştu:', error);
                }
            };
            reader.readAsText(file);
        }
    };

    const handleRemoveLayer = (layerId) => {
        dispatch(removeLayer(layerId));
    };

    return (
        <div>
            <div >
                <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                     Upload Data <UploadOutlined />
                </label>

                <input 
                    id="file-upload"
                    type="file" 
                    accept=".json" 
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                />
                <br></br>
            </div>
            <br></br>
            <hr></hr>
            <h3>Layers</h3>
            <hr></hr>
            <br></br>
            {layers?.map((layer) => (
                <div key={layer.id} style={{ display: "flex", alignItems: "center" }}>
                <span style={{ flex: 1 }}>{layer.name}</span>
                <button onClick={() => handleRemoveLayer(layer.id)}>
                     <DeleteOutlined />
                </button>
            </div>

            ))}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
};

export default DataUpload;
