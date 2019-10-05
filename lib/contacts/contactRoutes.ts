import { Request, Response, NextFunction } from "express";
import { ContactController } from "./contactController";

export class ContactRoutes {

    public contactController: ContactController = new ContactController()
    private root = "/contact/";

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // Contact 
        app.route(this.root)
            .get((req: Request, res: Response, next: NextFunction) => {
                // middleware
                console.log(`Request from: ${req.originalUrl}`);
                console.log(`Request type: ${req.method}`);
                if (req.query.key !== 'e56d3ca5d6ab8eb246a64d966fb72b5cde48b740') {
                    res.status(401).send('You shall not pass!');
                } else {
                    next();
                }
            }, this.contactController.getContacts)

            // POST endpoint
            .post(this.contactController.addNewContact)
            .put(this.contactController.updateContact)

        // Contact detail
        app.route(this.root + ':contactId')
            // get specific contact
            .get(this.contactController.getContactWithID)
            .delete(this.contactController.deleteContact)
    }
}
