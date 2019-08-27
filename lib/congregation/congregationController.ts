import * as mongoose from 'mongoose';
import { CongregationSchema } from './congregationModel';
import { Request, Response } from 'express';

const Congregation = mongoose.model('Congregation', CongregationSchema);

export class CongregationController {

    public addNewCongregation(req: Request, res: Response) {
        let newCongregation = new Congregation(req.body);

        newCongregation.save((err, congregation) => {
            if (err) {
                res.send(err);
            }
            res.json(congregation);
        });
    }

    public getCongregations(req: Request, res: Response) {
        Congregation.find({}, (err, congregation) => {
            if (err) {
                res.send(err);
            }
            res.json(congregation);
        });
    }

    public getCongregationWithID(req: Request, res: Response) {
        Congregation.findById(req.params.congregationId, (err, congregation) => {
            if (err) {
                res.send(err);
            }
            res.json(congregation);
        });
    }

    public updateCongregation(req: Request, res: Response) {
        Congregation.findByIdAndUpdate({ _id: req.params.congregationId }, req.body, { new: true }, (err, congregation) => {
            if (err) {
                res.send(err);
            }
            res.json(congregation);
        });
    }

    public deleteCongregation(req: Request, res: Response) {
        Congregation.remove({ _id: req.params.congregationId }, (err, congregation) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted congregation!' });
        });
    }

}