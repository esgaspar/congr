import { Request, Response, NextFunction } from "express";
import { CongregationController } from "./congregationController";

export class CongregationRoutes {

    public congregationController: CongregationController = new CongregationController()
    private root = "/congregation/";

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // Congregation 
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
            }, this.congregationController.getCongregations)

            // POST endpoint
            .post(this.congregationController.addNewCongregation)

        // Congregation detail
        app.route(this.root + ':congregationId')
            // get specific congregation
            .get(this.congregationController.getCongregationWithID)
            .put(this.congregationController.updateCongregation)
            .delete(this.congregationController.deleteCongregation)
    }
}
