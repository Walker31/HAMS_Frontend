import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Form, Button, Badge } from 'react-bootstrap';
import { generateTimeSlots } from './Slotgenerator';

const CalendarWithSlots = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [interval, setInterval] = useState(15);
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [savedSlots, setSavedSlots] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSlots(generateTimeSlots(interval));
    setSelectedSlots([]);
  };

  const handleIntervalChange = (e) => {
    const newInterval = parseInt(e.target.value);
    setInterval(newInterval);
    if (selectedDate) {
      setSlots(generateTimeSlots(newInterval));
      setSelectedSlots([]);
    }
  };

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  };

  const handleSaveSlots = () => {
    if (!selectedDate || selectedSlots.length === 0) {
      alert("Please select at least one slot.");
      return;
    }

    const dateKey = selectedDate.toDateString();
    setSavedSlots((prev) => ({
      ...prev,
      [dateKey]: selectedSlots,
    }));
  };

  return (
    <div className="container mt-3">
      <div className="row">
   
        <div className="col-md-6 mb-3">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>

       
        <div className="col-md-6">
          <Form.Select className="mb-3" onChange={handleIntervalChange} value={interval} style={{ width: '60%' }}>
            <option value={15}>15 Minutes</option>
            <option value={30}>30 Minutes</option>
            <option value={60}>1 Hour</option>
          </Form.Select>

          {selectedDate && (
            <div>
              <h6>Available Slots for {selectedDate.toDateString()}:</h6>
              <div className="d-flex flex-wrap gap-2">
                {slots.map((slot) => (
                  <Badge
                    key={slot}
                    bg={selectedSlots.includes(slot) ? 'success' : 'secondary'}
                    onClick={() => toggleSlot(slot)}
                    style={{ cursor: 'pointer' }}
                  >
                    {slot}
                  </Badge>
                ))}
              </div>
              <Button className="mt-3" variant="primary" onClick={handleSaveSlots}>
                Save Slots
              </Button>
            </div>
          )}
        </div>
      </div>

      {Object.keys(savedSlots).length > 0 && (
        <div className="mt-4">
          <h6>Saved Slots:</h6>
          {Object.entries(savedSlots).map(([date, slots]) => (
            <div key={date}>
              <strong>{date}</strong>:{" "}
              {slots.map((s, i) => (
                <Badge bg="info" className="me-2 mb-2" key={i}>
                  {s}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarWithSlots;
