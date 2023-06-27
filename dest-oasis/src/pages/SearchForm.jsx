import React from 'react';
import { Box, Button, Select, MenuItem, Input } from '@mui/material';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchForm = () => (
  <Box display="flex" mt={3} mb={3} sx={{ width: 600 }} alignItems="center" justifyContent="center">
    <Input 
      disableUnderline
      placeholder="Mots-clés" 
      sx={{ margin: 1, paddingLeft: 3, paddingTop: '3px', height: 40, backgroundColor: 'white', borderRadius: 10 }} 
      fullWidth 
    />
    <Select variant="standard" disableUnderline sx={{ height: 40, margin: 1, paddingLeft: 3, paddingTop: '3px', backgroundColor: 'white', borderRadius: 10, '& .MuiSelect-icon': { right: 10 } }} fullWidth>
      {/* <MenuItem disabled value=""><em>Région</em></MenuItem> */}
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
    <Button sx={{ backgroundColor: 'primary.main', borderRadius: '100%', minWidth: 40, width: 40, height: 40, margin: 1 }}>
      <FontAwesomeIcon icon={faMagnifyingGlass} color="white" fontSize={18} />
    </Button>
  </Box>
);

export default SearchForm;
