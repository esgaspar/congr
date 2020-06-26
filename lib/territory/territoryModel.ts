import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TerritorySchema = new Schema({
    territoryName: { type: String },
    code: { type: String },
    status: {
        situation: { type: String, default: 'Inativo' },
        active: { type: Boolean, default: false },
        date: { type: Date, default: Date.now }
    },
    comments: [{
        type: { type: String },
        comment: { type: String },
        date: { type: Date, default: Date.now },
    }],
    geo: { lat: { type: String }, long: { type: String } },
    adress: {
        country: { type: String },
        state: { type: String },
        city: { type: String },
        code: { type: String },
        street: { type: String },
        number: { type: String },
        neighborhood: { type: String },
        complement: { type: String }
    },
    created_date: { type: Date, default: Date.now }
});