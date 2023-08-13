import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import DataUpload from './DataUpload';
import QueryData from './QueryData';


const LayerManager = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#C0C0C0',
        boxSizing: 'border-box',
        width: collapsed ? '50px' : '320px',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px',
          cursor: 'pointer',
        }}
        onClick={toggleCollapse}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      {!collapsed && (
        <div style={{ padding: '30px' }}>
          <h2>Layer Manager</h2>
          <hr></hr>
          <br></br>
          <DataUpload />
          <hr></hr>
          <QueryData />
        </div>
      )}
    </div>
  );
};

export default LayerManager;
