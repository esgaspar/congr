import * as express from "express";
import * as bodyParser from "body-parser";
import { ContactRoutes } from "./contacts/contactRoutes";
import { FamilyRoutes } from "./family/familyRoutes";
import { DesignationsRoutes } from "./designations/designationsRoutes";
import * as mongoose from "mongoose";


class App {

    public app: express.Application;
    public contactRoutes: ContactRoutes = new ContactRoutes();
    public familyRoutes: FamilyRoutes = new FamilyRoutes();
    public designationsRoutes: DesignationsRoutes = new DesignationsRoutes();
    public mongoUrl: string = 'mongodb://localhost:27017/CRMdb';



    constructor() {
        this.app = express();
        this.config();
        this.contactRoutes.routes(this.app);
        this.familyRoutes.routes(this.app);
        this.designationsRoutes.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
    }
}

export default new App().app;