import * as mongoose from 'mongoose';
import { ContactSchema } from './contactModel';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController {

    public addNewContact(req: Request, res: Response) {
        let newContact = new Contact(req.body);

        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getContacts(req: Request, res: Response) {
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        }).sort({ created_date: -1 });
    }

    public getContactWithID(req: Request, res: Response) {
        Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public updateContact(req: Request, res: Response) {
        let editContact = new Contact(req.body);
        Contact.findByIdAndUpdate({ _id: editContact._id }, editContact, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteContact(req: Request, res: Response) {
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if (err) {
                console.log("Erro ao deletar contato: " + req.params.contactId);
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted contact!' });
            }
        });
    }

}