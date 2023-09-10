import React, { useState ,useEffect} from 'react';
import { Box } from '@mui/material';
import SearchDomainCard from './Cards/SearchDomainCard';
import SearchKeyCard from './Cards/SearchKeyCard';
import DateRangeCard from './Cards/DateRangeCard';
import TagsCard from './Cards/TagsCard';


const SearchCriteria = ({ onSearch, tags, setIsLoading }) => {
  
  const [criteria, setCriteria] = useState({
    domains: {
      medicalHistory: false,
      prescription: false,
      tests: false,
    },
    searchKey: '',
    fromDate: null,
    toDate: null,
    tags: [],
  });

  const [results, setResults] = useState(null);
  useEffect(() => {
    console.log("Updated results:", results);
  }, [results]);

  const handleCriteriaChange = (key, value) => {
    setCriteria((prev) => ({ ...prev, [key]: value }));
    console.log("From Search Criteria:",criteria)
  };

  const handleSearch = (newResults) => {
    // Update the state with the new results
    setResults(newResults);
    console.log("Newresults:",newResults);
    console.log("Parent:  ",results);
    onSearch(newResults);
  };

  return (
    // move the box a bit lower 
    // <Box width="30%" style={{ marginTop: '20px' }}>
    <Box width="30%"  style={{ marginTop: '20px' }}>
      <SearchDomainCard criteria={criteria} handleCriteriaChange={handleCriteriaChange} />
      <SearchKeyCard criteria={criteria} handleCriteriaChange={handleCriteriaChange} handleSearch={handleSearch} tags={tags} setIsLoading={setIsLoading} />
      <DateRangeCard criteria={criteria} handleCriteriaChange={handleCriteriaChange} />
    </Box>
  );
};

export default SearchCriteria;