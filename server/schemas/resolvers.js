const { AuthenticationError } = require('apollo-server-express');
const { Appointment, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        hairdressers: async () => {
            return User.find({stylist: true});
        },
        singleUser: async (parent, { email }) => {
            return User.findOne({ email: email }).populate('appointments');
        },
        appointments: async () => {
            return Appointment.find();
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('appointments');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password, stylist }) => {
            const user = await User.create({ username, email, password, });
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
        createAppointment: async (parent, { name, userId, start, end }, context) => {
            if (context.user) {
                const appointment = await Appointment.create({ name, userId: context.user._id, start, end });
                console.log(appointment)
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            appointments: { ...appointment }
                        }
                    }
                )
                return appointment
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;
