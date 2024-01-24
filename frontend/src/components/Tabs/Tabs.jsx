import React from 'react';
import './Tabs.css';

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs-container">
      <div
        className={`tab ${activeTab === 'exercise' ? 'active' : ''}`}
        onClick={() => onTabChange('exercise')}
      >
        Exercise
      </div>
      <div
        className={`tab ${activeTab === 'code' ? 'active' : ''}`}
        onClick={() => onTabChange('code')}
      >
        Code
      </div>
      <div
        className={`tab ${activeTab === 'website' ? 'active' : ''}`}
        onClick={() => onTabChange('website')}
      >
        Website
      </div>
    </div>
  );
};

export default Tabs;
