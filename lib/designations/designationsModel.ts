import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const DesignationsSchema = new Schema({
    title: { type: String, required: 'Enter a title designation' },
    type: { type: String},
    time: { type: String },
    temp: { type: String },
    study: {
        title: { type: String },
        conclued: { type: Boolean },
        studyPoint: { type: String },
        conclusionDate: { type: Date },
        usedTime: { type: Date },
        commments: { type: String }
    },
    date: { type: Date },
    privilege: { type: String },
    designed: {
        substitution: { type: Boolean },
        responsible: { userId: { type: String } },
        substitute: { userId: { type: String } }
    },
    assistant: {
        substitution: { type: Boolean },
        responsible: { userId: { type: String } },
        substitute: { userId: { type: String } }
    },
    meeting: { meetingId: { type: String } },
    created_date: { type: Date, default: Date.now }
});