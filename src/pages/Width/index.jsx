import React, { useState, useEffect } from 'react';
import DesktopWindows from '@mui/icons-material/DesktopWindows';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

function Width() {
  const size = useWindowSize();
  const windowWidth = size.width;

  const [deviceName, setDeviceName] = useState();
  const [device, setDevice] = useState();

  useEffect(() => {
    setDeviceName(
      windowWidth > 820 ? 'Desktop' : windowWidth > 480 ? 'Tablet' : 'Mobile',
    );

    setDevice(
      windowWidth > 820 ? <DesktopWindows fontSize="large" /> : windowWidth > 480 ? <TabletAndroidIcon fontSize="large" /> : <SmartphoneIcon fontSize="large" />,
    );
  }, [windowWidth]);

  return (
    <h3 className="text-center my-3">
      {device}
      {'  '}
      You are using
      {deviceName}
      {' '}
      device and width is :
      {' '}
      {windowWidth}
    </h3>
  );
}

export default Width;
