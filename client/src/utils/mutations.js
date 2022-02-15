import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
            username
            email
            password
            stylist
            }
        }
    }
`

export const ADD_USERS = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!, $stylist: Boolean) {
        addUser(username: $username, email: $email, password: $password, stylist: $stylist) {
            token
            user {
            username
            email
            password
            stylist
            }
        }
    }
`

export const CREATE_APPOINTMENT = gql`
    mutation CreateAppointments($name: String!, $userId: String!, $start: String!, $end: String!) {
        createAppointment(name: $name, userId: $userId, start: $start, end: $end) {
            _id
            userId
            name
            start
            end
        }
    }
`