import React from 'react';
import { Container, Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { faHouse, faCircleArrowRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as Title } from '../../assets/Titre_soustitre_home.svg';
import TopLink from '../../layout/TopLink';
import Filters from './Filters';
import SearchForm from './SearchForm';
import Separator from '../Separator';
import BackgroundSlider from './BackgroundSlider';

const Hero = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme => theme.breakpoints.down('md'), { noSsr: true });
  return (
    <>
      <BackgroundSlider mb={xs ? 0 : 20} p={2}>
        <Container sx={{ position: 'relative', padding: { xs: 0, md: 2 } }}>
          {!xs && <Box position="absolute" top={0} left={0} padding={2}>
            <TopLink to="/" icon={faHouse}>
              Accueil
            </TopLink>
          </Box>}
          {!xs && <Box position="absolute" top={0} right={0} padding={2}>
            <TopLink to="/pages/a-propos" icon={faCirclePlus} align="right" iconColor={theme.palette.primary.main}>
              En savoir plus
            </TopLink>
            <TopLink to="https://cooperative-oasis.org" target="_blank" icon={faCircleArrowRight} align="right" iconColor={theme.palette.primary.main}>
              La Coopérative Oasis
            </TopLink>
          </Box>}
          {xs && <Box display="flex" justifyContent="space-between" padding={1}>
            <TopLink to="/" icon={faHouse} >
              Accueil
            </TopLink>
            <TopLink to="/pages/a-propos" icon={faCirclePlus} align="right" iconColor={theme.palette.primary.main}>
              En savoir plus
            </TopLink>
            <TopLink to="https://cooperative-oasis.org" target="_blank" icon={faCircleArrowRight} align="right"iconColor={theme.palette.primary.main}>
              La Coopérative Oasis
            </TopLink>
          </Box>}
          <Box display="flex" alignItems="center" justifyContent="center" padding={xs ? 1 : 2} flexDirection="column">
            <Box sx={{ width: xs ? 250 : 300 }} pt={{ xs: 2, md: 0 }}>
              <Title />
            </Box>
            <Separator mt={2} mb={2} />
            <Box sx={{ maxWidth: 1080, padding: { xs: 0, md: 2 } }}>
              <Grid container spacing={{ xs: 2, md: 4 }}>
                <Grid item xs={12} md={6}>
                  <Typography color="white" align={xs ? 'left' : 'right'} variant="body1" fontSize={xs ? 14 : undefined}>
                    Les oasis sont des écolieux collectifs. On y expérimente un mode de vie basé sur le partage, la sobriété, 
                    l'autonomie et la solidarité. Plusieurs oasis proposent des séjours ou des locations pour découvrir ce mode de vie.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography color="white" align="left" variant="body1" fontSize={xs ? 14 : undefined}>
                    Avec Destination Oasis, trouvez une oasis pour faire l'expérience de la vie en écolieu. Seul, en famille ou avec des 
                    amis, venez partager un peu du quotidien de ces collectifs et ainsi soutenir leur développement !
                  </Typography>
                </Grid> 
              </Grid>
            </Box>
            <SearchForm />
            <Typography color="white" sx={{ fontWeight: 500, fontSize: xs ? 18 : 24, marginTop: xs ? 0 : 3, marginBottom: xs ? 0 : 4 }}>
              Types d'hébergements
            </Typography>
          </Box>
          {!xs && <Filters />}
        </Container>
      </BackgroundSlider>
      {xs && <Filters />}
    </>
  )
};

export default Hero;
