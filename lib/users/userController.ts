import * as mongoose from 'mongoose';
import { UserSchema } from './userModel';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserSchema);

export class UserController {

    public addNewUser(req: Request, res: Response) {
        let newUser = new User(req.body);

        console.log('Salvando...', newUser);


        newUser.save((err, User) => {
            if (err) {
                res.send(err);
                console.log('erro ao salvar ...', err);
            }
            console.log('Salvo...', User);
            res.json(User);
        });
    }
    
    public getUsers(req: Request, res: Response) {
        console.log('getUsers...');
        User.find({}, (err, User) => {
            if (err) {
                console.log('err...', err);
                res.send(err);
            }
            res.json(User);
        }).sort({ created_date: -1 });
    }

    public getUserWithID(req: Request, res: Response) {
        User.findById(req.params.UserId, (err, User) => {
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

    public updateUser(req: Request, res: Response) {
        let editUser = new User(req.body);
        console.log("editando usuario", editUser);
        User.findByIdAndUpdate({ _id: editUser._id }, editUser, { new: true }, (err, User) => {
            if (err) {
                res.send(err);
            }
            res.json(User);
        });
    }

    public deleteUser(req: Request, res: Response) {
        console.log("deletando", req.params.UserId);
        User.remove({ _id: req.params.UserId }, (err, User) => {
            if (err) {
                console.log("Erro ao deletar contato: " + req.params.UserId);
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted User!' });
            }
        });
    }

    public login(req: Request, res: Response) {
        let user = new User(req.body);
        User.find({ 'username': user.username, 'password': user.password, 'status.situation': 'Ativo' }, (err, User) => {
            if (err) {
                res.send(err);
            }
            res.json(User);
        });
    }

}