import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundImage1 from '../../assets/background1.jpg';
import backgroundImage2 from '../../assets/background2.jpg';
import backgroundImage3 from '../../assets/background3.jpg';

const BackgroundSlider = ({ children, ...rest }) => {
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (visible === 3) {
        setVisible(1);
      } else {
        setVisible(visible+1);
      }
    }, 7000);
    return () => clearInterval(intervalId); 
  }, [visible, setVisible]);

  return (
    <Box position="relative" minHeight={500} {...rest}>
      <BackgroundImage src={backgroundImage1} opacity={visible === 1 ? 1 : 0} delay="0s" />
      <BackgroundImage src={backgroundImage2} opacity={visible === 2 ? 1 : 0} delay="7s" />
      <BackgroundImage src={backgroundImage3} opacity={visible === 3 ? 1 : 0} delay="14s" />
      <BlackFilter />
      {children}
    </Box>
  )
};

// https://tympanus.net/codrops/2012/01/02/fullscreen-background-image-slideshow-with-css3/
const BackgroundImage = styled('div')(({ src, opacity, delay }) => ({
  // "@keyframes imageAnimation": {
  //   "0%": {
  //     opacity: 0,
  //     animationTimingFunction: "ease-in"
  //   },
  //   "16%": {
  //     opacity: 1,
  //     animationTimingFunction: "ease-out"
  //   },
  //   "33%": {
  //     opacity: 1
  //   },
  //   "50%": {
  //     opacity: 0
  //   },
  //   "100%": {
  //     opacity: 0
  //   },
  // },
  // animation: "imageAnimation 21s linear infinite 0s",
  // animationDelay: delay,
  backgroundImage: `url(${src})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  opacity,
  transition: 'opacity 3s',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}));

const BlackFilter = styled('div')({
  backgroundColor: '#000000',
  opacity: 0.2,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

export default BackgroundSlider;
