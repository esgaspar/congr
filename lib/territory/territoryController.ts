import { Controller } from 'common/controller';
import * as mongoose from 'mongoose';
import { TerritorySchema } from './territoryModel';
import { Request, Response } from 'express';

const Territory = mongoose.model('Territory', TerritorySchema);

export class TerritoryController implements Controller {

    public add(req: Request, res: Response) {
        let newTerritory = new Territory(req.body);

        console.log('Salvando...', newTerritory);

        let myId = mongoose.Types.ObjectId();

        newTerritory._id = myId;

        newTerritory.save((err, Territory) => {
            if (err) {
                res.send(err);
                console.log('erro ao salvar ...', err);
            }
            console.log('Salvo...', Territory);
            res.json(Territory);
        });
    }

    public list(req: Request, res: Response) {
        console.log('getTerritorys...');
        Territory.find({}, (err, Territory) => {
            if (err) {
                console.log('err...', err);
                res.send(err);
            }
            res.json(Territory);
        }).sort({ "status.situation": -1, "lastName": 1, "firstName": 1, "created_date": -1, });
    }

    public getById(req: Request, res: Response) {
        Territory.findOne(req.params.TerritoryId, (err, Territory) => {
            if (err) {
                res.send(err);
                return
            }
            try {
                res.json(Territory);
            } catch (error) {
                console.log("error", error);
            }
        });
    }

    public update(req: Request, res: Response) {
        let editTerritory = new Territory(req.body);
        console.log("editando usuario", editTerritory);
        Territory.findByIdAndUpdate({ _id: editTerritory._id }, editTerritory, { new: true }, (err, Territory) => {
            if (err) {
                res.send(err);
            }
            res.json(Territory);
        });
    }

    public delete(req: Request, res: Response) {
        console.log("deletando", req.params);
        Territory.deleteOne({ _id: req.params.territoryId }, (err, Territory) => {
            if (err) {
                console.log("Erro ao deletar contato: " + req.params.territoryId);
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted Territory!' });
            }
        });
    }

}