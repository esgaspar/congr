import { Request, Response, NextFunction } from "express";
import { FamilyController } from "./familyController";

export class FamilyRoutes {

    public familyController: FamilyController = new FamilyController()
    private root = "/family/";

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // Family 
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
            }, this.familyController.getFamilys)

            // POST endpoint
            .post(this.familyController.addNewFamily)

        // Family detail
        app.route(this.root + ':familyId')
            // get specific family
            .get(this.familyController.getFamilyWithID)
            .put(this.familyController.updateFamily)
            .delete(this.familyController.deleteFamily)
    }
}
