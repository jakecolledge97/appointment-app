import { gql } from '@apollo/client'

export const QUERY_USERS = gql`
    query getUsers {
        users {
            username
            email
            stylist
        }
    }
`
export const QUERY_SINGLE_USER = gql`
    query SingleUser($email: String!) {
        singleUser(email: $email) {
            username
            email
            appointment
        }
    }
`

export const QUERY_HAIRSTYLIST = gql`
    query Hairdressers {
        hairdressers {
            _id
            username
            stylist
        }
    }
`

export const QUERY_APPOINTMENTS = gql`
    query Appointments {
        appointments {
            _id
            userId
            name
            start
            end
        }
    }
`

export const QUERY_SINGLE_APPOINTMENTS = gql`
    mutation CreateAppointments($name: String!, $userId: String!, $start: String!, $end: String!) {
        createAppointments(name: $name, userId: $userId, start: $start, end: $end) {
            _id
            userId
            name
            start
            end
        }
    }
`