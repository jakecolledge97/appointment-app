const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Appointments {
        _id: ID 
        appointmentTitle: String!
    }

    type Query{
        appointments: [Appointments]
    }
`;

module.exports = typeDefs;
