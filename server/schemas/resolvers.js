const { AuthenticationError } = require('apollo-server-express');
const { Appointment, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        singleUser: async (parent, {email}) => {
            return User.findOne({email: email}).populate('appointments');
        },
        appointments: async () => {
            return Appointment.find();
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password, stylist}) => {
            const user = await User.create({ username, email, password, stylist });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        createAppointment: async(parent, {name, userId ,start, end}, context) => {
            const appointment = await Appointment.create({name, userId, start, end});

            return appointment
        }
    }
};

module.exports = resolvers;
