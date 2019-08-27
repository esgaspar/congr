import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FamilySchema = new Schema({
    lastName: {
        type: String,
        required: 'Enter a last name of family'
    },
    family_contacts: [{
        contact_id: {
            type: String,
        }
    }],
    created_date: {
        type: Date,
        default: Date.now
    }
});