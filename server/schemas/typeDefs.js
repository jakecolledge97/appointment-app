const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        appointments: [Appointment]
        stylist: Boolean
    }

    type Appointment {
        _id: ID 
        userId: String!
        name: String!
        start: String!
        end: String!
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query{
        users: [User]
        hairdressers: [User]
        singleUser(email: String!): User
        appointments: [Appointment]
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, stylist: Boolean): Auth
        login(email: String!, password: String!): Auth
        createAppointment(name: String!, userId: String!, start: String!, end: String!): Appointment
    }
`;

module.exports = typeDefs;
