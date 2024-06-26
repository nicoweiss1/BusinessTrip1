import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, IconButton, Fab, Box, Modal, TextField, Button, Slide } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './BusinessTrip.css';

const BusinessTrip = ({ trips: initialTrips, onSaveTrips }) => {
  const [trips, setTrips] = useState(initialTrips);
  const [editTrip, setEditTrip] = useState(null);

  useEffect(() => {
    setTrips(initialTrips);
  }, [initialTrips]);

  const handleEdit = (trip) => {
    setEditTrip(trip);
  };

  const handleDelete = (id) => {
    const updatedTrips = trips.filter(trip => trip.id !== id);
    setTrips(updatedTrips);
    onSaveTrips(updatedTrips);
  };

  const handleAdd = () => {
    const newTrip = { id: trips.length + 1, destination: 'New Trip', flightTime: '', terminal: '', gate: '', departure: '', seat: '' };
    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
    onSaveTrips(updatedTrips);
  };

  const handleSave = () => {
    const updatedTrips = trips.map(trip => (trip.id === editTrip.id ? editTrip : trip));
    setTrips(updatedTrips);
    onSaveTrips(updatedTrips);
    setEditTrip(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="header">
        Business Trip Administration
      </Typography>
      <Box className="trip-container">
        {trips.map(trip => (
          <Slide direction="up" in={true} key={trip.id}>
            <Card className="trip-card">
              <CardContent>
                <Typography variant="h5" component="div">
                  {trip.destination}
                </Typography>
                <Typography className="card-text">
                  Flugzeit: {trip.flightTime}
                </Typography>
                <Typography className="card-text">
                  Terminal: {trip.terminal}
                </Typography>
                <Typography className="card-text">
                  Gate: {trip.gate}
                </Typography>
                <Typography className="card-text">
                  Abflug: {trip.departure}
                </Typography>
                <Typography className="card-text">
                  Sitzplatz: {trip.seat}
                </Typography>
                <IconButton onClick={() => handleEdit(trip)} className="icon-button">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(trip.id)} className="icon-button">
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Slide>
        ))}
        <Fab color="primary" aria-label="add" onClick={handleAdd} className="add-button">
          <AddIcon />
        </Fab>
      </Box>
      <Modal open={!!editTrip} onClose={() => setEditTrip(null)}>
        <Box className="modal-content">
          <Typography variant="h6" gutterBottom>Edit Trip</Typography>
          <TextField
            label="Destination"
            value={editTrip?.destination || ''}
            onChange={(e) => setEditTrip({ ...editTrip, destination: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Flugzeit"
            value={editTrip?.flightTime || ''}
            onChange={(e) => setEditTrip({ ...editTrip, flightTime: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Terminal"
            value={editTrip?.terminal || ''}
            onChange={(e) => setEditTrip({ ...editTrip, terminal: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gate"
            value={editTrip?.gate || ''}
            onChange={(e) => setEditTrip({ ...editTrip, gate: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Abflug"
            value={editTrip?.departure || ''}
            onChange={(e) => setEditTrip({ ...editTrip, departure: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Sitzplatz"
            value={editTrip?.seat || ''}
            onChange={(e) => setEditTrip({ ...editTrip, seat: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
            <Button variant="contained" color="secondary" onClick={() => setEditTrip(null)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default BusinessTrip;
