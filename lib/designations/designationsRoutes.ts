import { Request, Response, NextFunction } from "express";
import { DesignationsController } from "./designationsController";

export class DesignationsRoutes {

    public designationsController: DesignationsController = new DesignationsController()
    private root = "/designations/";

    public routes(app): void {

        app.route('/designations')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // Designations 
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
            }, this.designationsController.getDesignations)

            // POST endpoint
            .post(this.designationsController.addNewDesignation)

        // Designations detail
        app.route(this.root + ':designationsId')
            // get specific designations
            .get(this.designationsController.getDesignationsWithID)
            .put(this.designationsController.updateDesignations)
            .delete(this.designationsController.deleteDesignations)
    }
}
