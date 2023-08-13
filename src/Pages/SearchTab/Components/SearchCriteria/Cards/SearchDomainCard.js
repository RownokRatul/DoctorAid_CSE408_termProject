import React from 'react';
import { Card, CardContent, Checkbox, FormControlLabel } from '@mui/material';

const SearchDomainCard = ({ criteria, handleCriteriaChange }) => (
  <Card>
    <CardContent>
      <h3>Search Domain</h3>
      <FormControlLabel
        control={
          <Checkbox
            checked={criteria.domains.medicalHistory}
            onChange={() => handleCriteriaChange('domains', { ...criteria.domains, medicalHistory: !criteria.domains.medicalHistory })}
          />
        }
        label="Medical History"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={criteria.domains.prescription}
            onChange={() => handleCriteriaChange('domains', { ...criteria.domains, prescription: !criteria.domains.prescription })}
          />
        }
        label="Prescription"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={criteria.domains.tests}
            onChange={() => handleCriteriaChange('domains', { ...criteria.domains, tests: !criteria.domains.tests })}
          />
        }
        label="Tests"
      />
    </CardContent>
  </Card>
);

export default SearchDomainCard;
