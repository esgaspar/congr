import * as mongoose from 'mongoose';
import { UserSchema } from './userModel';
import { Request, Response } from 'express';
import { Controller } from 'common/controller';

const User = mongoose.model('User', UserSchema);

export class UserController implements Controller {

    public add(req: Request, res: Response) {
        let newUser = new User(req.body);

        console.log('Salvando...', newUser);
        let myId = mongoose.Types.ObjectId();

        newUser._id = myId;

        newUser.save((err, User) => {
            if (err) {
                res.send(err);
                console.log('erro ao salvar ...', err);
            }
            console.log('Salvo...', User);
            res.json(User);
        });
    }

    public list(req: Request, res: Response) {
        console.log('getUsers...');
        User.find({}, (err, User) => {
            if (err) {
                console.log('err...', err);
                res.send(err);
            }
            res.json(User);
        }).sort({ "status.situation": -1, "lastName": 1, "firstName": 1, "created_date": -1, });
    }

    public getById(req: Request, res: Response) {
        User.findOne(req.params.UserId, (err, User) => {
            if (err) {
                res.send(err);
                return
            }
            try {
                res.json(User);
            } catch (error) {
                console.log("error", error);
            }
        });
    }

    public update(req: Request, res: Response) {
        let editUser = new User(req.body);
        console.log("editando usuario", editUser);
        User.findByIdAndUpdate({ _id: editUser._id }, editUser, { new: true }, (err, User) => {
            if (err) {
                res.send(err);
            }
            res.json(User);
        });
    }

    public delete(req: Request, res: Response) {
        console.log("deletando", req.params);
        User.deleteOne({ _id: req.params.userId }, (err, User) => {
            if (err) {
                console.log("Erro ao deletar contato: " + req.params.userId);
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted User!' });
            }
        });
    }

    public login(req: Request, res: Response) {
        let user = new User(req.body);
        User.find({ 'username': user.username, 'password': user.password }, (err, User) => {
            if (err) {
                res.send(err);
            }
            res.json(User);
        });
    }

}