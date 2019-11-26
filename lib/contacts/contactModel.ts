import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    username: {type: String, required: 'Enter a username'},
    firstName: { type: String, required: 'Enter a first name' },
    lastName: { type: String, required: 'Enter a last name' },
    password : {type: String, required: 'Enter a password'},
    batismDate: { type: Date },
    birthDate: { type: Date },
    sexGender: { type: String, required: 'Enter a sex gender' },
    familyId: { type: String },
    headFamily: { type: Boolean },
    dc50Status: { type: Boolean },
    congregation: { congregationId: { type: String } },
    status: {
        situation: { type: String },
        active: { type: Boolean },
        date: { type: Date }
    },
    privileges: [{
        privilege: { type: String },
        designationDate: { type: Date },
    }],
    away: [{
        to: { type: Date },
        from: { type: Date }
    }],
    email: [{
        email: { type: String },
        preference: { type: Boolean }
    }],
    phones: [{
        ddd: { type: Number },
        phone: { type: Number },
        preference: { type: Boolean },
    }],
    comments: [{
        type: { type: String },
        comment: { type: String },
        date: { type: Date, default: Date.now },
    }],
    adress: [{
        country: { type: String },
        state: { type: String },
        city: { type: String },
        code: { type: String },
        street: { type: String },
        number: { type: String },
        neighborhood: { type: String },
        complement: { type: String }
    }],
    created_date: { type: Date, default: Date.now }
});