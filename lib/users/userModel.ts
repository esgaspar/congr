import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    batismDate: { type: Date },
    birthDate: { type: Date },
    sexGender: { type: String },
    familyId: { type: String },
    headFamily: { type: Boolean },
    dc50Status: { type: Boolean },
    roles: [{
        name: { type: String },
        level: { type: String },
    }],
    congregation: { congregationId: { type: String } },
    status: {
        situation: { type: String, default: 'Inativo' },
        active: { type: Boolean, default: false },
        date: { type: Date, default: Date.now }
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