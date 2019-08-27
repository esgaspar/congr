import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    batismDate: {
        type: Date
    },
    birthDate: {
        type: Date
    },
    privilege: {
        type: String
    },
    sexGender: {
        type: String,
        required: 'Enter a sex gender'
    },
    familyId: {
        type: String
    },
    headFamily: {
        type: Boolean
    },
    email: [{
        email: {
            type: String
        },
        preference: {
            type: Boolean
        },
    }],
    phones: [{
        ddd: {
            type: Number
        },
        phone: {
            type: Number
        },
        preference: {
            type: Boolean
        },
    }],
    adress: [{
        country: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        code: {
            type: String
        },
        street: {
            type: String
        },
        number: {
            type: String
        },
        neighborhood: {
            type: String
        },
        complement: {
            type: String
        }
    }],
    created_date: {
        type: Date,
        default: Date.now
    }
});