import * as mongoose from 'mongoose';
import { DesignationsSchema } from './designationsModel';
import { Request, Response } from 'express';

const Designations = mongoose.model('Designations', DesignationsSchema);

export class DesignationsController {

    public addNewDesignation(req: Request, res: Response) {
        let newDesignations = new Designations(req.body);

        newDesignations.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getDesignations(req: Request, res: Response) {
        Designations.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getDesignationsWithID(req: Request, res: Response) {
        Designations.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public updateDesignations(req: Request, res: Response) {
        Designations.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteDesignations(req: Request, res: Response) {
        Designations.remove({ _id: req.params.contactId }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!' });
        });
    }

}