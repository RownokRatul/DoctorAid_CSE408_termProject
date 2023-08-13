import React, { useState } from 'react';
import { Box } from '@mui/material';
import SearchDomainCard from './Cards/SearchDomainCard';
import SearchKeyCard from './Cards/SearchKeyCard';
import DateRangeCard from './Cards/DateRangeCard';
import TagsCard from './Cards/TagsCard';


const SearchCriteria= ({ onSearch }) => {
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

  // Define some common tags
  const commonTags = ['headache', 'stroke', 'brain', 'migraine'];

  const handleCriteriaChange = (key, value) => {
    setCriteria((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    onSearch(criteria);
  };

  return (
    // move the box a bit lower 
    // <Box width="30%" style={{ marginTop: '20px' }}>
    <Box width="30%"  style={{ marginTop: '20px' }}>
      <SearchDomainCard criteria={criteria} handleCriteriaChange={handleCriteriaChange} />
      <SearchKeyCard criteria={criteria} handleCriteriaChange={handleCriteriaChange} handleSearch={handleSearch} />
      <DateRangeCard criteria={criteria} handleCriteriaChange={handleCriteriaChange} />
      <TagsCard commonTags={commonTags} criteria={criteria} handleCriteriaChange={handleCriteriaChange} />
    </Box>
  );
};

export default SearchCriteria;