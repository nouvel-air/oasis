import React from 'react';
import { Container, Box, Grid, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCircleArrowRight, faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import backgroundImage from '../assets/background.jpg';
import { ReactComponent as Title } from '../assets/Titre_soustitre_home.svg';

const TopLink = ({ icon, children, align = "left", iconColor = 'white' }) => {
  const iconStyle = { marginRight: 10, position: 'relative', top: 5, height: 26 };
  if (align === 'left') iconStyle.marginRight = 10;
  if (align === 'right') iconStyle.marginLeft = 10;
  const faIcon = <FontAwesomeIcon icon={icon} color={iconColor} style={iconStyle} />;
  return (
    <Typography color="white" variant="body2" align={align}>
      {align === "left" && faIcon}
      {children}
      {align === "right" && faIcon}
    </Typography>
  )
}

const Hero = () => {
  const theme = useTheme();
  return (
    <BackgroundImage>
      <BlackFilter />
      <Container sx={{ position: 'relative', minHeight: 550, padding: 2 }}>
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
            Site de la Coopérative Oasis
          </TopLink>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" padding={2} flexDirection="column">
          <Box sx={{ width: 300 }}>
            <Title />
          </Box>
          <Box sx={{ width: 80, height: 10, backgroundColor: 'primary.main', marginTop: 3 }} />
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
          <Box display="flex" sx={{ width: 600 }} alignItems="center" justifyContent="center">
            <Box padding={1}>
              <TextField label="Mots-clés" sx={{ height: 40 }} fullWidth />
            </Box>
            <Box padding={1}>
              <Select label="Région" sx={{ height: 40 }}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Box>
            <Box>
              <Button sx={{ backgroundColor: 'primary.main', borderRadius: '100%', minWidth: 40, width: 40, height: 40 }}>
                <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
              </Button>
            </Box>
          </Box>
          <Typography color="white" sx={{ fontWeight: 500, fontSize: 24 }}>
            Types d'hébergements
          </Typography>
        </Box>
        <FiltersContainer>
        </FiltersContainer>   
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
  marginBottom: 90,
  padding: 30
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
