import React from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import backgroundImage from '../assets/background.jpg';
import { ReactComponent as Title } from '../assets/Titre_home.svg';

const Hero = () => (
  <BackgroundImage>
    <BlackFilter />
    <Container sx={{ position: 'relative', height: 500, padding: 2 }}>
        <Box position="absolute" top={0} left={0} padding={2}>
          <Typography color="white">
            <FontAwesomeIcon icon={faHouse} /> Accueil
          </Typography>
        </Box>
        <Box position="absolute" top={0} right={0} padding={2}>
          <Typography color="white" align="right">
            En savoir plus <FontAwesomeIcon icon={faPlus} /> 
          </Typography>
          <Typography color="white" align="right">
            Site de la Coopérative Oasis <FontAwesomeIcon icon={faArrowRight} />
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" padding={2} flexDirection="column">
          <Box sx={{ width: 300 }}>
            <Title />
          </Box>
          <Box sx={{ maxWidth: '75%', padding: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography color="white" align="right">
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
        </Box>
      <FiltersContainer>

      </FiltersContainer>   
      
    </Container>
  </BackgroundImage>
);

const BackgroundImage = styled('div')({
  position: 'relative',
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  minHeight: 500,
  marginBottom: 90
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

const FiltersContainer = styled('div')({
  backgroundColor: 'white',
  borderRadius: 10,
  height: 120,
  position: 'absolute',
  bottom: -80,
  left: 0,
  right: 0,
  margin: 24
});

export default Hero;
