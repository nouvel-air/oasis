import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { faHouse, faCircleArrowRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import backgroundImage from '../../assets/header_circle.png';
import { ReactComponent as Title } from '../../assets/Titre_soustitre_fiche.svg';
import TopLink from '../TopLink';

const Header = () => {
  const theme = useTheme();
  return (
    <BackgroundImage>
      <Container sx={{ position: 'relative', padding: 2 }}>
        <Box position="absolute" top={0} left={0} padding={2}>
          <TopLink icon={faHouse} labelColor="secondary.main" iconColor={theme.palette.primary.main}>
            Accueil
          </TopLink>
        </Box>
        <Box position="absolute" top={0} right={0} padding={2}>
          <TopLink icon={faCirclePlus} align="right" labelColor="secondary.main" iconColor={theme.palette.primary.main}>
            En savoir plus
          </TopLink>
          <TopLink icon={faCircleArrowRight} align="right" labelColor="secondary.main" iconColor={theme.palette.primary.main}>
            La Coopérative Oasis
          </TopLink>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" padding={2} flexDirection="column">
          <Box sx={{ width: 300 }}>
            <Link to="/">
              <Title />
            </Link>
          </Box>
        </Box>
      </Container>
    </BackgroundImage>
  )
};

const BackgroundImage = styled('div')({
  position: 'relative',
  backgroundImage: `url(${backgroundImage})`,
  backgroundPositionY: "100%",
  backgroundPositionX: "center",
  backgroundSize: 800,
  backgroundRepeat: "no-repeat",
  height: 280,
  padding: 10
});


export default Header;
