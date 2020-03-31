import * as mongoose from 'mongoose';
import { DesignationsSchema } from './designationsModel';
import { Request, Response } from 'express';

const Designations = mongoose.model('Designations', DesignationsSchema);

export class DesignationsController {

    public addNewDesignation(req: Request, res: Response) {
        let newDesignations = new Designations(req.body);

        newDesignations.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getDesignations(req: Request, res: Response) {
        Designations.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getDesignationsWithID(req: Request, res: Response) {
        Designations.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateDesignations(req: Request, res: Response) {
        Designations.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public deleteDesignations(req: Request, res: Response) {
        Designations.remove({ _id: req.params.userId }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted user!' });
        });
    }

}