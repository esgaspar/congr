import { Request, Response, NextFunction } from "express";
import { MeetingController } from "./meetingController";

export class MeetingRoutes {

    public meetingController: MeetingController = new MeetingController()
    private root = "/meeting/";

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // Meeting 
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
            }, this.meetingController.getMeetings)

            // POST endpoint
            .post(this.meetingController.addNewMeeting)

        // Meeting detail
        app.route(this.root + ':meetingId')
            // get specific meeting
            .get(this.meetingController.getMeetingWithID)
            .put(this.meetingController.updateMeeting)
            .delete(this.meetingController.deleteMeeting)
    }
}
