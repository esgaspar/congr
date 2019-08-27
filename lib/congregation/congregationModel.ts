import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CongregationSchema = new Schema({
    name: { type: String, required: 'Enter a congregation name' },
    code: { type: String },
    language: { type: String },
    circuitVisitor: {
        name: { type: String },
        wifeName: { type: String },
    },
    exeption: [{
        to: { type: Date },
        from: { type: Date },
        motivation: { type: String }
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