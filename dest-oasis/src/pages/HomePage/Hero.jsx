import React from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { faHouse, faCircleArrowRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import backgroundImage from '../../assets/background.jpg';
import { ReactComponent as Title } from '../../assets/Titre_soustitre_home.svg';
import TopLink from '../TopLink';
import Filters from './Filters';
import SearchForm from './SearchForm';
import Separator from '../Separator';

const Hero = () => {
  const theme = useTheme();
  return (
    <BackgroundImage>
      <BlackFilter />
      <Container sx={{ position: 'relative', padding: 2 }}>
        <Box position="absolute" top={0} left={0} padding={2}>
          <TopLink icon={faHouse}>
            Accueil
          </TopLink>
        </Box>
        <Box position="absolute" top={0} right={0} padding={2}>
          <TopLink icon={faCirclePlus} align="right" iconColor={theme.palette.primary.main}>
            En savoir plus
          </TopLink>
          <TopLink icon={faCircleArrowRight} align="right" iconColor={theme.palette.primary.main}>
            La Coopérative Oasis
          </TopLink>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" padding={2} flexDirection="column">
          <Box sx={{ width: 300 }}>
            <Title />
          </Box>
          <Separator mt={3} mb={2} />
          <Box sx={{ maxWidth: 1050, padding: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography color="white" align="right" variant="body1">
                  Certaines oasis proposent des offres de séjours qui leur permettent de faire vivre leur lieu en ouvrant aux curieux 
                  qui souhaitent découvrir ce mode de vie, partager un peu de leur quotidien ou encore louer des salles d'ateliers.
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="white" align="left">
                  Voici une page pour vous permettre de <strong>trouver l'oasis de votre prochain séjour</strong>. Utilisez les filtres pour trouver ce
                  que vous cherchez, puis cliquer sur les vignettes pour être redirigés vers le site web du lieu ou leur envoyer un mail.
                </Typography>
              </Grid> 
            </Grid>
          </Box>
          <SearchForm />
          <Typography color="white" sx={{ fontWeight: 500, fontSize: 24, marginTop: 3, marginBottom: 4 }}>
            Types d'hébergements
          </Typography>
        </Box>
        <Filters>
        </Filters>   
      </Container>
    </BackgroundImage>
  )
};

const BackgroundImage = styled('div')({
  position: 'relative',
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  minHeight: 500,
  marginBottom: 150,
  padding: 10
});

const BlackFilter = styled('div')({
  backgroundColor: '#000000',
  opacity: 0.2,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

export default Hero;
