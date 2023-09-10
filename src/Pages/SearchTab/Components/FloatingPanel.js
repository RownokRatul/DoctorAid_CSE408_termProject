import ReactDOM from 'react-dom';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from '@mui/material';

const FloatingPanel = ({ selectedTest, onClose }) => {
  return ReactDOM.createPortal(
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0,
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
      zIndex: 1000 
    }}>
      <Paper style={{ 
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '80%', 
          height: '80%', 
          overflow: 'auto',
          padding: '20px'
      }}>
        <Button onClick={onClose} style={{ float: 'right' }}>Close</Button>
        <Typography variant="h6">{selectedTest?.test_name}</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {selectedTest?.column_name.map((col, index) => (
                <TableCell key={index}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedTest?.row_name.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{row}</TableCell>
                {selectedTest.column_name.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    {col.toLowerCase() === "image" ? (
                      <img
                        src={selectedTest.test_values[rowIndex * selectedTest.column_name.length + colIndex] || ''}
                        alt="Data"
                      />
                    ) : (
                      selectedTest.test_values[rowIndex * selectedTest.column_name.length + colIndex] || ''
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>,
    document.getElementById('modal-root')
  );
};

export default FloatingPanel;
