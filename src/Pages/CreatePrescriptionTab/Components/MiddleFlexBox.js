import React, { useState, useEffect } from 'react';
import { Card, TextField, Table, TableBody, TableCell, TableHead, TableRow, Button, List, ListItem, Dialog, DialogTitle, DialogActions,DialogContent,DialogContentText } from '@mui/material';
import remove from './Image/trash-bin.png'; // Make sure you have this path correct

function MiddleFlexbox({ selectedMedicines, setSelectedMedicines, selectedMedicineNames, setSelectedMedicineNames }) {
  const [genericSearchText, setGenericSearchText] = useState('');
  const [brandSearchText, setBrandSearchText] = useState('');
  const [selectedGeneric, setSelectedGeneric] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [allGenericDrugs, setAllGenericDrugs] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  useEffect(() => {
    // Replace these with actual API calls
    fetch('/api/v0/get_all_generic_drugs')
      .then(res => res.json())
      .then(data => setAllGenericDrugs(data.data));

    fetch('/api/v0/get_all_brands')
      .then(res => res.json())
      .then(data => setAllBrands(data.data));
  }, []);

  const filteredGenerics = genericSearchText ? allGenericDrugs.filter(drug => drug.name.toLowerCase().includes(genericSearchText.toLowerCase())) : [];
  const filteredBrands = brandSearchText ? allBrands.filter(brand => brand.brand_name.toLowerCase().includes(brandSearchText.toLowerCase())) : [];

  const handleRemoveMedicine = (index) => {
    const newSelectedMedicines = [...selectedMedicines];
    newSelectedMedicines.splice(index, 1);
    setSelectedMedicines(newSelectedMedicines);
  };

  const [isEditingGeneric, setIsEditingGeneric] = useState(false);
  const [isEditingBrand, setIsEditingBrand] = useState(false);

  const handleGenericChange = (e) => {
    setGenericSearchText(e.target.value);
    setIsEditingGeneric(true);  // Set editing to true
  }

  const handleBrandChange = (e) => {
    setBrandSearchText(e.target.value);
    setIsEditingBrand(true);  // Set editing to true
  }
  const [open, setOpen] = useState(false); // State to manage dialog box visibility
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };


  const handleSearch = async () => {
    try {
      const response = await fetch('api/v0/get_brand_drug_by_brand_generic_id/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand_id: selectedBrand?.id,
          generic_drug_id: selectedGeneric?.id
        })
      });
      
      if (response.status === 404) {
        setOpen(true);
        return;
      }
      
      const result = await response.json();
      if (result.message === 'Success') {
        setSelectedDetails(result.data[0]);
        setDetailsDialogOpen(true);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };


  const handleDetailsClose = (choice) => {
    if (choice) {
      const medicine = {
        brandName: selectedDetails.brandName,
        dose: choice === 'adult' ? selectedDetails.adultDosage : selectedDetails.childDosage,
        sideEffects: selectedDetails.adverseEffects.join(', ')
      };
      console.log("Details------: ", selectedDetails);
      setSelectedMedicines([...selectedMedicines, medicine]); // Updating selectedMedicines
      setSelectedMedicineNames([...selectedMedicineNames, selectedDetails.drugId]); // Updating selectedMedicineNames
    }
  
    setDetailsDialogOpen(false);
  };
  






  return (
    <div className="middle-flexbox" style={{ width: '95%', backgroundColor: '#f0f0f0' }}>
      <h3 style={{ textAlign: 'center', paddingTop: '15px' }}>Add Medicines</h3>
        <Card style={{ padding: '10px', height: '100%', backgroundColor: '#d6eaf8' }}>
          <TextField
            fullWidth
            label="Search Generic Name"
            value={isEditingGeneric ? genericSearchText : (selectedGeneric ? selectedGeneric.name : '')}
            onFocus={() => setIsEditingGeneric(true)}
            onBlur={() => setIsEditingGeneric(false)}
            onChange={handleGenericChange}
          />
          <List>
            {filteredGenerics.map((generic, index) => (
              <ListItem key={index} button onClick={() => { setSelectedGeneric(generic); setGenericSearchText(generic.name); }}>  {/* Update here */}
                {generic.name}
              </ListItem>
            ))}
          </List>
          <TextField
            fullWidth
            label="Search Brand Name"
            value={isEditingBrand ? brandSearchText : (selectedBrand ? selectedBrand.brand_name : '')}
            onFocus={() => setIsEditingBrand(true)}
            onBlur={() => setIsEditingBrand(false)}
            onChange={handleBrandChange}
          />
          <List>
            {filteredBrands.map((brand, index) => (
              <ListItem key={index} button onClick={() => { setSelectedBrand(brand); setBrandSearchText(brand.brand_name); }}>  {/* Update here */}
                {brand.brand_name}
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
      
      <div style={{ maxHeight: '400px', overflow: 'auto' }}>
      <Table style={{ backgroundColor: 'azure' }}>
      <TableHead>
        <TableRow>
          <TableCell>Brand Name</TableCell>
          <TableCell>Dose</TableCell>
          <TableCell>Side Effects</TableCell>
          <TableCell>Action</TableCell> {/* Added this new column header */}
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedMedicines.map((medicine, index) => (
          <TableRow key={index}>
            <TableCell>{medicine.brandName}</TableCell>
            <TableCell>{medicine.dose}</TableCell>
            <TableCell>{medicine.sideEffects}</TableCell>
            <TableCell> {/* Added this new column */}
              <Button onClick={() => handleRemoveMedicine(index)}>
                <img src={remove} alt="Delete" style={{ width: '24px', height: '24px' }} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

      </div>
      </Card>
      <Dialog
        open={detailsDialogOpen}
        onClose={() => handleDetailsClose(null)}
      >
        <DialogTitle>{"Select Dosage"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Adult Dosage: </strong> {selectedDetails ? selectedDetails.adultDosage : ''}
          </DialogContentText>
          <DialogContentText>
            <strong>Child Dosage: </strong> {selectedDetails ? selectedDetails.childDosage : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDetailsClose('adult')} color="primary">
            Adult
          </Button>
          <Button onClick={() => handleDetailsClose('child')} color="primary">
            Child
          </Button>
        </DialogActions>
      </Dialog>
  
      {/* Existing Drug Not Found Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Drug Not Found"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
}

export default MiddleFlexbox;
