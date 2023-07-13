import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { faHouse, faCircleArrowRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import backgroundImage from '../assets/header_circle.png';
import { ReactComponent as Title } from '../assets/Titre_soustitre_fiche.svg';
import TopLink from './TopLink';

const Header = () => {
  const xs = useMediaQuery(theme => theme.breakpoints.down('md'), { noSsr: true });
  const theme = useTheme();
  return (
    <BackgroundImage p={{ xs: 0, md: 2 }}>
      <Container sx={{ position: 'relative', padding: xs ? 1 : 2 }}>
        {!xs && <Box position="absolute" top={0} left={0} padding={2}>
          <TopLink to="/" icon={faHouse} labelColor="secondary.main" iconColor={theme.palette.primary.main}>
            Accueil
          </TopLink>
        </Box>}
        {!xs && <Box position="absolute" top={0} right={0} padding={2}>
          <TopLink to="/pages/a-propos" icon={faCirclePlus} align="right" labelColor="secondary.main" iconColor={theme.palette.primary.main}>
            En savoir plus
          </TopLink>
          <TopLink to="https://cooperative-oasis.org" target="_blank" icon={faCircleArrowRight} align="right" labelColor="secondary.main" iconColor={theme.palette.primary.main}>
            La Coopérative Oasis
          </TopLink>
        </Box>}
        {xs && <Box display="flex" justifyContent="space-between" padding={1}>
          <TopLink to="/" icon={faHouse} labelColor="secondary.main" iconColor={theme.palette.primary.main}>
            Accueil
          </TopLink>
          <TopLink to="/pages/a-propos" icon={faCirclePlus} align="right" labelColor="secondary.main" iconColor={theme.palette.primary.main}>
            En savoir plus
          </TopLink>
          <TopLink to="https://cooperative-oasis.org" target="_blank" icon={faCircleArrowRight} align="right" labelColor="secondary.main" iconColor={theme.palette.primary.main}>
            La Coopérative Oasis
          </TopLink>
        </Box>}
        <Box display="flex" alignItems="center" justifyContent="center" padding={2} flexDirection="column">
          <Box sx={{ width: xs ? 250 : 300 }} pt={{ xs: 2, md: 0 }}>
            <Link to="/">
              <Title />
            </Link>
          </Box>
        </Box>
      </Container>
    </BackgroundImage>
  )
};

const BackgroundImage = styled(Box)({
  position: 'relative',
  backgroundImage: `url(${backgroundImage})`,
  backgroundPositionY: "100%",
  backgroundPositionX: "center",
  backgroundSize: 800,
  backgroundRepeat: "no-repeat",
  height: 280
});


export default Header;
