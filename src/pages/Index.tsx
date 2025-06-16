
import React, { useState } from 'react';
import LaunchPage from '../components/LaunchPage';
import MainApp from '../components/MainApp';

const Index = () => {
  const [hasLaunched, setHasLaunched] = useState(false);

  if (!hasLaunched) {
    return <LaunchPage onLaunch={() => setHasLaunched(true)} />;
  }

  return <MainApp />;
};

export default Index;
