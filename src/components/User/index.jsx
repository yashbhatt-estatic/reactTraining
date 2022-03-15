import React, { useState, useEffect } from 'react';
import DesktopWindows from '@mui/icons-material/DesktopWindows';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { Container } from 'react-bootstrap';
import User from './user';
import Counter from './counter';

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
  return (
    <>
      {windowWidth > 820 ? (
        <>
          <DesktopWindows fontSize="large" />
          <h2>
            You are using Desktop device and width is
            {windowWidth}
          </h2>
        </>
      ) : windowWidth > 480 ? (
        <>
          <TabletAndroidIcon fontSize="large" />
          <h2>
            You are using Tablet device and width is
            {windowWidth}
          </h2>
        </>
      ) : (
        <>
          <SmartphoneIcon fontSize="large" />
          <h2>
            You are using Mobile device and width is
            {windowWidth}
          </h2>
        </>
      )}
      <Container className="mt-5 text-dark">
        <Counter />
        <User width={windowWidth} />
      </Container>
    </>
  );
}

export default Width;
