import React, { useState, useCallback } from 'react';
import { useGetList, useListContext } from 'react-admin';
import { Box, Button, Select, MenuItem, Input } from '@mui/material';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchForm = () => {
  const { filterValues, setFilters } = useListContext();
  const [keyword, setKeyword] = useState(filterValues.q || "");
  const [region, setRegion] = useState(filterValues['cdlt:hasRegion'] || ""); 
  const search = useCallback((e) => {
    e.preventDefault();
    setFilters({ ...filterValues, 'q': keyword, 'cdlt:hasRegion': region });
  }, [setFilters, filterValues, keyword, region]);
  const { data } = useGetList('Region', { pagination: { page: 1, perPage: 100 } });
  return (
    <form onSubmit={search} style={{ width: '100%', maxWidth: 600 }}>
      <Box display="flex" mt={3} mb={3} alignItems="center" justifyContent="center">
        <Input 
          source="keyword"
          disableUnderline
          placeholder="Mots-clés" 
          sx={{ margin: 0, paddingLeft: 3, paddingTop: '3px', height: 40, backgroundColor: 'white', borderRadius: 10 }} 
          fullWidth 
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <Select 
          variant="standard" 
          disableUnderline 
          sx={{ height: 40, margin: 1, paddingLeft: 3, paddingTop: '3px', backgroundColor: 'white', borderRadius: 10, '& .MuiSelect-icon': { right: 10 } }} 
          fullWidth
          value={region}
          onChange={e => {
            setRegion(e.target.value);
            setFilters({ ...filterValues, 'q': keyword, 'cdlt:hasRegion': e.target.value });
          }}
        >
          <MenuItem value=""></MenuItem>
          {data && data.map(record => (
            <MenuItem value={record.id} key={record.id}>{record['pair:label']}</MenuItem>
          ))}
        </Select>
        <Button 
          type="submit"
          sx={{ backgroundColor: 'primary.main', borderRadius: '100%', minWidth: 40, width: 40, height: 40, margin: 0 }} 
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} color="white" fontSize={18} />
        </Button>
      </Box>
    </form>
  )
};

export default SearchForm;
