import { Request, Response, NextFunction } from "express";
import { TerritoryController } from "./territoryController";

export class TerritoryRoutes {

    public territoryController: TerritoryController = new TerritoryController()
    private root = "/territory/";
    private key = 'e56d3ca5d6ab8eb246a64d966fb72b5cde48b740';

    public routes(app): void {

        app.route('/territory')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // Territory 
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
            }, this.territoryController.list)

            // POST endpoint
            .post(this.territoryController.add)
            .put(this.territoryController.update)

        // Territory detail
        app.route(this.root + 'manager/' + ':territoryId')
            // get specific territory
            .get(this.territoryController.getById)
            .delete(this.territoryController.delete)
    }
}
