import * as mongoose from 'mongoose';
import { MeetingSchema } from './meetingModel';
import { Request, Response } from 'express';

const Meeting = mongoose.model('Meeting', MeetingSchema);

export class MeetingController {

    public addNewMeeting(req: Request, res: Response) {
        let newMeeting = new Meeting(req.body);

        newMeeting.save((err, meeting) => {
            if (err) {
                res.send(err);
            }
            res.json(meeting);
        });
    }

    public getMeetings(req: Request, res: Response) {
        Meeting.find({}, (err, meeting) => {
            if (err) {
                res.send(err);
            }
            res.json(meeting);
        });
    }

    public getMeetingWithID(req: Request, res: Response) {
        Meeting.findById(req.params.meetingId, (err, meeting) => {
            if (err) {
                res.send(err);
            }
            res.json(meeting);
        });
    }

    public updateMeeting(req: Request, res: Response) {
        Meeting.findByIdAndUpdate({ _id: req.params.meetingId }, req.body, { new: true }, (err, meeting) => {
            if (err) {
                res.send(err);
            }
            res.json(meeting);
        });
    }

    public deleteMeeting(req: Request, res: Response) {
        Meeting.remove({ _id: req.params.meetingId }, (err, meeting) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted meeting!' });
        });
    }

}