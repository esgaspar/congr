import * as mongoose from 'mongoose';
import { ContactSchema } from '../contacts/contactModel';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

export class UserController {

    public getContactWithID(req: Request, res: Response) {
        console.log("req.body", req.body);
        let user = new Contact(req.body);
        Contact.find({ 'username': user.username, 'password': user.password }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
}