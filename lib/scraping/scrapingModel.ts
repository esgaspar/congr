import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ScrapingSchema = new Schema({
    day: { type: Date },
    date: { type: Date },
    hour: { type: Date },
    meetingType: { type: String },
    congregation: { congragationId: { type: String } },
    designations: [
        { designationId: { type: String } }
    ],
    created_date: { type: Date, default: Date.now }
});