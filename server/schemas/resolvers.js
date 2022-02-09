const { AuthenticationError } = require('apollo-server-express');
const { Appointments } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        appointments: async () => {
            return Appointments.find();
        }
    }
};

module.exports = resolvers;
