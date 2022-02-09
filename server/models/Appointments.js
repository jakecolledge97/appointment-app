const { Schema, model } = require('mongoose');

const appointmentsSchema = new Schema({
    appointmentsTitle: {
        type: String,
        required: true,
    },
    appointmentStart: {
        type: String,
        required: true,
    },
    appointmentEnd: {
        type: String,
        required: true,
    }
});

const Appointments = model('Appointment', appointmentsSchema);

module.exports = Appointments;