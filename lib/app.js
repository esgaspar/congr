"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes_1 = require("./users/userRoutes");
const contactsRoutes_1 = require("./contacts/contactsRoutes");
const familyRoutes_1 = require("./family/familyRoutes");
const designationsRoutes_1 = require("./designations/designationsRoutes");
const meetingRoutes_1 = require("./meeting/meetingRoutes");
const scrapingRoutes_1 = require("./scraping/scrapingRoutes");
const congregationRoutes_1 = require("./congregation/congregationRoutes");
const territoryRoutes_1 = require("./territory/territoryRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
class App {
    constructor() {
        this.userRoutes = new userRoutes_1.UserRoutes();
        this.contactRoutes = new contactsRoutes_1.ContactRoutes();
        this.congregationRoutes = new congregationRoutes_1.CongregationRoutes();
        this.meetingRoutes = new meetingRoutes_1.MeetingRoutes();
        this.scrapingRoutes = new scrapingRoutes_1.ScrapingRoutes();
        this.familyRoutes = new familyRoutes_1.FamilyRoutes();
        this.designationsRoutes = new designationsRoutes_1.DesignationsRoutes();
        this.territoryRoutes = new territoryRoutes_1.TerritoryRoutes();
        this.mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/CRMdb";
        this.app = express();
        this.config();
        this.congregationRoutes.routes(this.app);
        this.meetingRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
        this.contactRoutes.routes(this.app);
        this.familyRoutes.routes(this.app);
        this.designationsRoutes.routes(this.app);
        this.territoryRoutes.routes(this.app);
        this.scrapingRoutes.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map