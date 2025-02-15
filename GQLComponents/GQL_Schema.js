// This file will contain all GraphQL types
const { gql } = require('apollo-server-express');


exports.typeDefs = gql`

    type User {
        _id: ID!,
        username: String!,
        email: String!,
        password: String!,
        createdAt: String,
        updatedAt: String,
    }
    
    type Employee {
        _id: ID!,
        firstname: String!,
        lastname: String!,
        email: String!,
        gender: String!,
        designation: String!,
        salary: Float!,
        date_of_joining: String!,
        department: String!,
        employee_photo: String!,
        createdAt: String,
        updatedAt: String,
    }
    
    #Query type - defines operations for retrieving the data
    
    type Query {
        login(username: String!, password: String!): Boolean,
        getAllEmployees: [Employee],
        getEmployeeByID(_id: ID!): Employee,
        getEmployeeByDepOrDes(depOrDes: String): [Employee],
    }
    
    #Mutation type - defines operations for modifying the data e.g. Insert, Update, Delete
    
    type Mutation {
    
        signUp(
            username: String!,
            email: String!,
            password: String!,
        ): User,
        
        addEmployee(
            firstname: String!,
            lastname: String!,
            email: String!,
            gender: String!,
            designation: String!,
            salary: Float!,
            date_of_joining: String!,
            department: String!,
            employee_photo: String!,
        ): Employee,
        
        updateEmployee(
            _id: ID!,
            firstname: String!,
            lastname: String!,
            gender: String!,
            designation: String!,
            salary: Float!,
            date_of_joining: String!,
            department: String!,
            employee_photo: String!,
        ): Employee,
        
        deleteEmployee(
            _id: ID!,
        ): Employee,
    }
`