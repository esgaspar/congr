"use strict";
exports.__esModule = true;
var scrapingController_1 = require("./scrapingController");
var ScrapingRoutes = /** @class */ (function () {
    function ScrapingRoutes() {
        this.scrapingController = new scrapingController_1.ScrapingController();
        this.root = "/scraping/";
    }
    ScrapingRoutes.prototype.routes = function (app) {
        app.route("/scraping").get(function (req, res) {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });
        // Scraping
        app
            .route(this.root)
            .get(function (req, res, next) {
            // middleware
            console.log("Request from: " + req.originalUrl);
            console.log("Request type: " + req.method);
            if (req.query.key !== "e56d3ca5d6ab8eb246a64d966fb72b5cde48b740") {
                res.status(401).send("You shall not pass!");
            }
            else {
                next();
            }
        }, this.scrapingController.getScrapings);
    };
    return ScrapingRoutes;
}());
exports.ScrapingRoutes = ScrapingRoutes;
