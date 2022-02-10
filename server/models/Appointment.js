const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    }
});

const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;