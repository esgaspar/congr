// cleyton
import * as mongoose from 'mongoose';
import { FamilySchema } from './familyModel';
import { Request, Response } from 'express';

const Family = mongoose.model('Family', FamilySchema);

export class FamilyController {

    public addNewFamily(req: Request, res: Response) {
        let newFamily = new Family(req.body);

        newFamily.save((err, family) => {
            if (err) {
                res.send(err);
            }
            res.json(family);
        });
    }

    public getFamilys(req: Request, res: Response) {
        Family.find({}, (err, family) => {
            if (err) {
                res.send(err);
            }
            res.json(family);
        });
    }

    public getFamilyWithID(req: Request, res: Response) {
        Family.findById(req.params.familyId, (err, family) => {
            if (err) {
                res.send(err);
            }
            res.json(family);
        });
    }

    public updateFamily(req: Request, res: Response) {
        Family.findOneAndUpdate({ _id: req.params.familyId }, req.body, { new: true }, (err, family) => {
            if (err) {
                res.send(err);
            }
            res.json(family);
        });
    }

    public deleteFamily(req: Request, res: Response) {
        Family.remove({ _id: req.params.familyId }, (err, family) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted family!' });
        });
    }

}