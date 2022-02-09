const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Appointments {
        _id: ID 
        appointmentTitle: String!
        appointmentStart: String!
        appointmentEnd: String!
    }

    type User {
        username: String!
        email: String!
        password: String!
        appointments: [Appointments]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query{
        appointments: [Appointments]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
