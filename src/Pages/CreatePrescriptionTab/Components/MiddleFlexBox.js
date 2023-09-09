import React, { useState, useEffect } from 'react';
import { Card, TextField, Table, TableBody, TableCell, TableHead, TableRow, Button, List, ListItem, Dialog, DialogTitle, DialogActions,DialogContent,DialogContentText } from '@mui/material';
import remove from './Image/trash-bin.png'; // Make sure you have this path correct

function MiddleFlexbox({ selectedMedicines, setSelectedMedicines, selectedMedicineNames, setSelectedMedicineNames,doses,setDoses,allInteractions,setAllInteractions }) {
  const [genericSearchText, setGenericSearchText] = useState('');
  const [brandSearchText, setBrandSearchText] = useState('');
  const [selectedGeneric, setSelectedGeneric] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [allGenericDrugs, setAllGenericDrugs] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [customDose, setCustomDose] = useState('');  // State for customized dose


  const [showInitialDialog, setShowInitialDialog] = useState(true);

  useEffect(() => {
    // Replace these with actual API calls
    fetch('/api/v0/get_all_generic_drugs')
      .then(res => res.json())
      .then(data => setAllGenericDrugs(data.data));

    fetch('/api/v0/get_all_brands')
      .then(res => res.json())
      .then(data => setAllBrands(data.data));

    fetch('/api/v0/get_all_drug_interactions')
      .then(res => res.json())
      .then(data => {
        setAllInteractions(data.data);
        setShowInitialDialog(false);  // Set the dialog box to close after data is fetched
      });

  }, []);

  const filteredGenerics = genericSearchText ? allGenericDrugs.filter(drug => drug.name.toLowerCase().includes(genericSearchText.toLowerCase())) : [];
  const filteredBrands = brandSearchText ? allBrands.filter(brand => brand.brand_name.toLowerCase().includes(brandSearchText.toLowerCase())) : [];

  const handleRemoveMedicine = (index) => {
    const newSelectedMedicines = [...selectedMedicines];
    newSelectedMedicines.splice(index, 1);
    setSelectedMedicines(newSelectedMedicines);
    // remove the corresponding medicine name from selectedMedicineNames and doses
    const newSelectedMedicineNames = [...selectedMedicineNames];
    newSelectedMedicineNames.splice(index, 1);
    setSelectedMedicineNames(newSelectedMedicineNames);
    const newDoses = [...doses];
    newDoses.splice(index, 1);
    setDoses(newDoses);

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
        console.log("SCEUSUSUSUSUSSSSSSS");
        setSelectedDetails(result.data[0]);
        setDetailsDialogOpen(true);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    
    console.log("Eta to kaaj kore na");
  };


  const handleDetailsClose = (choice) => {
    if (choice === 'custom') {
      const medicine = {
        brandName: selectedDetails.brandName,
        dose: customDose,
        sideEffects: selectedDetails.adverseEffects.join(', ')
      };
      
      setSelectedMedicines([...selectedMedicines, medicine]); // Updating selectedMedicines
      setSelectedMedicineNames([...selectedMedicineNames, selectedDetails.drugId]); // Updating selectedMedicineNames
      setDoses([...doses, customDose]); // Updating doses
    }
  
    setCustomDose('');  // Reset custom dose
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
        open={showInitialDialog}
        onClose={() => setShowInitialDialog(false)}
      >
        <DialogTitle>{"All Interactions Data"}</DialogTitle>
        <DialogContent>
          <pre>{JSON.stringify(allInteractions, null, 2)}</pre>  {/* Pretty-print the data */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInitialDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={detailsDialogOpen}
        onClose={() => handleDetailsClose(null)}
        maxWidth="md" // Increase the size of dialog box
      >
        <DialogTitle>{"Select Dosage"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Adult Dosage: </strong> {selectedDetails ? selectedDetails.adultDosage : ''}
          </DialogContentText>
          <DialogContentText>
            <strong>Child Dosage: </strong> {selectedDetails ? selectedDetails.childDosage : ''}
          </DialogContentText>
          <TextField
            fullWidth
            label="Customize Dose"
            value={customDose}
            onChange={(e) => setCustomDose(e.target.value)}
            style={{ marginTop: '20px', backgroundColor: '#f5f5f5' }} // Style changes here
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setCustomDose(selectedDetails ? selectedDetails.adultDosage : ''); }} color="primary">
            Adult
          </Button>
          <Button onClick={() => { setCustomDose(selectedDetails ? selectedDetails.childDosage : ''); }} color="primary">
            Child
          </Button>
          <Button onClick={() => handleDetailsClose('custom')} color="primary">
            Done
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
