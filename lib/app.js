"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var contactRoutes_1 = require("./contacts/contactRoutes");
var familyRoutes_1 = require("./family/familyRoutes");
var designationsRoutes_1 = require("./designations/designationsRoutes");
var meetingRoutes_1 = require("./meeting/meetingRoutes");
var scrapingRoutes_1 = require("./scraping/scrapingRoutes");
var congregationRoutes_1 = require("./congregation/congregationRoutes");
var mongoose = require("mongoose");
var cors = require("cors");
var App = /** @class */ (function () {
    function App() {
        this.contactRoutes = new contactRoutes_1.ContactRoutes();
        this.congregationRoutes = new congregationRoutes_1.CongregationRoutes();
        this.meetingRoutes = new meetingRoutes_1.MeetingRoutes();
        this.scrapingRoutes = new scrapingRoutes_1.ScrapingRoutes();
        this.familyRoutes = new familyRoutes_1.FamilyRoutes();
        this.designationsRoutes = new designationsRoutes_1.DesignationsRoutes();
        this.mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/CRMdb";
        this.app = express();
        this.config();
        this.congregationRoutes.routes(this.app);
        this.meetingRoutes.routes(this.app);
        this.contactRoutes.routes(this.app);
        this.familyRoutes.routes(this.app);
        this.designationsRoutes.routes(this.app);
        this.scrapingRoutes.routes(this.app);
        this.mongoSetup();
    }
    App.prototype.config = function () {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    };
    App.prototype.mongoSetup = function () {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    };
    return App;
}());
exports["default"] = new App().app;
