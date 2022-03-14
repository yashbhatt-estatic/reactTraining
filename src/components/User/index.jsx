import React, { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";
import DesktopWindows from "@mui/icons-material/DesktopWindows";
import TabletAndroidIcon from "@mui/icons-material/TabletAndroid";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import User from "./user";
import { Container } from "react-bootstrap";

const Width = () => {
  const [width] = useWindowSize();

  const [windowWidth, setWindowWidth] = useState(width);
  
  useEffect( () => {
    console.log("window did mount.")

    return () => {
      setWindowWidth(null);
    }
  }, [])

  useEffect(() => {
    setWindowWidth(width);
  }, [width]);

  return (
    <>
      {windowWidth > 820 ? (
        <>
          <DesktopWindows fontSize="large"  />
          <h2>You are using Desktop device and width is {windowWidth}</h2>
        </>
      ) : windowWidth > 480 ? (
        <>
          <TabletAndroidIcon fontSize="large"  />
          <h2>You are using Tablet device and width is {windowWidth}</h2>
        </>
      ) : (
        <>
          <SmartphoneIcon fontSize="large" />
          <h2>You are using Mobile device and width is {windowWidth}</h2>
        </>
      )}
      <Container className="mt-5 text-dark">
      <User width = {windowWidth}/>
      </Container>
    </>
  );
  
};

export default Width
