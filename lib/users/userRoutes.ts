import { Request, Response, NextFunction } from "express";
import { UserController } from "./userController";

export class UserRoutes {

    public userController: UserController = new UserController()
    private root = "/user/";
    private key = 'e56d3ca5d6ab8eb246a64d966fb72b5cde48b740';

    public routes(app): void {

        app.route('/user')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // User 
        app.route(this.root + 'manager')
            .get((req: Request, res: Response, next: NextFunction) => {
                // middleware
                console.log(`Request from: ${req.originalUrl}`);
                console.log(`Request type: ${req.method}`);
                if (req.query.key !== this.key) {
                    res.status(401).send('You shall not pass!');
                } else {
                    next();
                }
            }, this.userController.getUsers)

            // POST endpoint
            .post(this.userController.addNewUser)
            .put(this.userController.updateUser)

        // User detail
        app.route(this.root + 'manager/'+ ':userId')
            // get specific user
            .get(this.userController.getUserWithID)
            .delete(this.userController.deleteUser)

        app.route(this.root + 'authenticate')
            // get specific user
            .post(this.userController.login)
    }
}
