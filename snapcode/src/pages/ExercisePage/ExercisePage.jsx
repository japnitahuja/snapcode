import React, {useState} from 'react';
import './ExercisePage.css'; // Create a CSS file for styling
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Tabs from '../../components/Tabs/Tabs';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import CodeTabContent from '../../components/CodeTabContent/CodeTabContent';

const ExercisePage = () => {
  const [activeTab, setActiveTab] = useState('exercise');

  const renderContent = () => {
    switch (activeTab) {
      case 'exercise':
        return <div>Exercise content</div>;
      case 'code':
        return <CodeTabContent/>;
      case 'website':
        return <div>Website Page</div>;
      default:
        return null;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <TopNavbar />
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="content-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default ExercisePage;