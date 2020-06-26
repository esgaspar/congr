import { Controller } from 'common/controller';
import * as mongoose from 'mongoose';
import { ContactSchema } from './contactsModel';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController implements Controller{

    public add(req: Request, res: Response) {
        let newContact = new Contact(req.body);

        console.log('Salvando...', newContact);

        console.log('Salvando...', newContact);
        let myId = mongoose.Types.ObjectId();

        newContact._id = myId;


        newContact.save((err, Contact) => {
            if (err) {
                res.send(err);
                console.log('erro ao salvar ...', err);
            }
            console.log('Salvo...', Contact);
            res.json(Contact);
        });
    }

    public list(req: Request, res: Response) {
        console.log('getContacts...');
        Contact.find({}, (err, Contact) => {
            if (err) {
                console.log('err...', err);
                res.send(err);
            }
            
            res.json(Contact);
        }).sort({ "status.situation": -1 , "lastName": 1, "firstName": 1, "created_date": -1,});
    }

    public getById(req: Request, res: Response) {
        Contact.findOne(req.params.ContactId, (err, Contact) => {
            if (err) {
                res.send(err);
                return
            }
            try {
                res.json(Contact);
            } catch (error) {
                console.log("error", error);
            }
        });
    }

    public update(req: Request, res: Response) {
        let editContact = new Contact(req.body);
        console.log("editando usuario", editContact);
        Contact.findByIdAndUpdate({ _id: editContact._id }, editContact, { new: true }, (err, Contact) => {
            if (err) {
                res.send(err);
            }
            res.json(Contact);
        });
    }

    public delete(req: Request, res: Response) {
        console.log("deletando", req.params);
        Contact.deleteOne({ _id: req.params.contactId }, (err, Contact) => {
            if (err) {
                console.log("Erro ao deletar contato: " + req.params.contactId);
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted Contact!' });
            }
        });
    }

    public login(req: Request, res: Response) {
        let contact = new Contact(req.body);
        Contact.find({ 'contactname': contact.contactname, 'password': contact.password }, (err, Contact) => {
            if (err) {
                res.send(err);
            }
            res.json(Contact);
        });
    }

}