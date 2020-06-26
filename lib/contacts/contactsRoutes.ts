import { Request, Response, NextFunction } from "express";
import { ContactController } from "./contactsController";

export class ContactRoutes {

    public contactController: ContactController = new ContactController()
    private root = "/contact/";
    private key = 'e56d3ca5d6ab8eb246a64d966fb72b5cde48b740';

    public routes(app): void {

        app.route('/contact')
            .get((req: Request, res: Response) => {
                console.log("contact get")
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // Contact 
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
            }, this.contactController.list)

            // POST endpoint
            .post(this.contactController.add)
            .put(this.contactController.update)

        // Contact detail
        app.route(this.root + 'manager/' + ':contactId')
            // get specific contact
            .get(this.contactController.getById)
            .delete(this.contactController.delete)
    }
}
