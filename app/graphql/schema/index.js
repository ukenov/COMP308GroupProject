const { buildSchema } = require('graphql')

module.exports = buildSchema(
    `
    type Account {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        city: String!
        phoneNumber: String!
        accountType: String!
    }

    type ClinicalData {
        _id: ID!
        age: Int!
        sex: Int!
        cp: Int!
        trestbps: Int!
        chol: Int!
        fbs: Int!
        restecg: Int!
        thalach: Int!
        exang: Int!
        oldpeak: Int!
        slope: Int!
        ca: Int!
        thal: Int!
        riskCategory: Int!
        createdOn: String!
    }

    type EmergencyAlert {
        _id: ID!
        reason: String!
        notified: Boolean!
        date: String!
    }

    type MotivationalTip {
        _id: ID!
        type: String!
        videoLink: String!
    }

    type Nurse {
        _id: ID!
        account: ID!
    }

    type Patient {
        _id: ID!
        account: ID!
        vitalSigns: ID!
        emergencyAlerts: ID!
        motivationalTips: ID!
        clinicalData: ID!
        nurse: ID! 
    }

    type VitalSign {
        _id: ID!
        pulseRate: Int!
        bloodPressure: String!
        weight: Int!
        temperature: Int!
        respiratoryRate: Int!
        createdBy: String! 
    }

    type AuthData {
        token: String!
    }

    input AccountInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        city: String!
        phoneNumber: String!
        accountType: String!
        nurseId: ID
    }

    type RootQuery {
        accounts: [Account!]!
        isLoggedInUser(_id: ID!): Account!
        loginUser(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createAccount(accountInput:AccountInput): Account
    }
    
    schema{
        query: RootQuery
        mutation: RootMutation
    }`
)
