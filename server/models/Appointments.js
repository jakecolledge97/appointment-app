const { Schema, model } = require('mongoose');

const appointmentsSchema = new Schema({
    appointmentsTitle: {
        type: String,
        required: true,
    }
});

const Appointments = model('Appointment', appointmentsSchema);

module.exports = Appointments;