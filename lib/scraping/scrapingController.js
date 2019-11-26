"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var meetingModel_1 = require("./../meeting/meetingModel");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var rp = require("request-promise");
var moment = require("moment");
var MeetingDB = mongoose.model("meetings", meetingModel_1.MeetingSchema);
var langs = [
    { lang: "pt", langId: "lp-t", cod: "r5" },
    { lang: "ht", langId: "lp-cr", cod: "r60" },
    { lang: "ar", langId: "lp-a", cod: "r39" }
];
var ScrapingController = /** @class */ (function () {
    function ScrapingController() {
        var _this = this;
        this.lang = { lang: "", langId: "", cod: "" };
        this.meetings = [];
        this.position = 1;
        this.pGroup = ".pGroup ";
        this.midweek = ".docClass-106 ";
        this.session1 = this.midweek + "#section1 ";
        this.session2 = this.midweek + "#section2 ";
        this.session3 = this.midweek + "#section3 ";
        this.session4 = this.midweek + "#section4 ";
        this.fillDesignation = function (type, session, pGroup, tag, html, dateString) { return __awaiter(_this, void 0, void 0, function () {
            var designation;
            return __generator(this, function (_a) {
                designation = { date: "", title: "", type: "" };
                designation.type = type;
                designation.title = cheerio(session + pGroup + tag, html).text();
                designation.date = dateString;
                return [2 /*return*/, designation];
            });
        }); };
        this.addDesignation = function (meeting, designation, title, session, pGroup, tag, html, dateString) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (designation && designation.title.length > 5) {
                    designation.title = designation.title;
                    this.position++;
                    meeting.designations.push(designation);
                    return [2 /*return*/, true];
                }
                else if (title == 'gems') {
                    this.position++;
                    this.newDesignation(meeting, title, this.session2, this.pGroup, " #p" + this.position + " > strong", html, dateString);
                    this.position--;
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            });
        }); };
        this.getScrapings = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var date, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.lang = langs.find(function (lang) { return lang.lang === req.query.lang; });
                        date = req.query.date;
                        _a = this;
                        return [4 /*yield*/, this.scrap(date, this.meetings, req)];
                    case 1:
                        _a.meetings = _b.sent();
                        res.send(this.meetings);
                        return [2 /*return*/];
                }
            });
        }); };
        this.scrap = function (date, meetings, req) { return __awaiter(_this, void 0, void 0, function () {
            var momentDate, stop, _loop_1, this_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        momentDate = moment(date, "YYYY/MM/DD");
                        stop = false;
                        _loop_1 = function () {
                            var meeting, dateString, adress;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this_1.position = 1;
                                        meeting = {
                                            date: {},
                                            meetingType: {},
                                            designations: []
                                        };
                                        dateString = this_1.getStringDate(momentDate);
                                        console.log("importando - " + dateString);
                                        meeting.date = momentDate;
                                        meeting.meetingType = "Meio de semana";
                                        adress = "https://wol.jw.org/" + this_1.lang.lang + "/wol/dt/" + this_1.lang.cod + "/" + this_1.lang.langId + "/" + dateString;
                                        return [4 /*yield*/, rp(adress)
                                                .then(function (html) { return __awaiter(_this, void 0, void 0, function () {
                                                var weekReading, i, i, e_1, meetingDB;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.newDesignation(meeting, "week", "", "", " #p" + this.position, html, dateString)];
                                                        case 1:
                                                            _a.sent();
                                                            return [4 /*yield*/, this.fillDesignation("weekReading", "", "", " #p" + this.position + " > a > strong", html, dateString)];
                                                        case 2:
                                                            weekReading = _a.sent();
                                                            if (!weekReading.title) {
                                                                stop = true;
                                                                return [2 /*return*/];
                                                            }
                                                            meeting.designations.push(weekReading);
                                                            this.position++;
                                                            _a.label = 3;
                                                        case 3:
                                                            _a.trys.push([3, 25, , 26]);
                                                            return [4 /*yield*/, this.newDesignation(meeting, "initialSong", this.session1, this.pGroup, " #p" + this.position, html, dateString)];
                                                        case 4:
                                                            _a.sent();
                                                            return [4 /*yield*/, this.newDesignation(meeting, "p", this.session1, this.pGroup, " #p" + this.position, html, dateString)];
                                                        case 5:
                                                            _a.sent();
                                                            return [4 /*yield*/, this.newDesignation(meeting, "treasuresTitle", this.session2, "", " #p" + this.position + " > strong", html, dateString)];
                                                        case 6:
                                                            _a.sent();
                                                            return [4 /*yield*/, this.newDesignation(meeting, "treasures", this.session2, this.pGroup, " #p" + this.position + " >> strong", html, dateString)];
                                                        case 7:
                                                            _a.sent();
                                                            this.position = 10;
                                                            return [4 /*yield*/, this.newDesignation(meeting, "gems", this.session2, this.pGroup, " #p" + this.position + " > strong", html, dateString)];
                                                        case 8:
                                                            _a.sent();
                                                            this.position = this.position + 5;
                                                            return [4 /*yield*/, this.newDesignation(meeting, "bibleReading", this.session2, this.pGroup, " #p" + this.position + " > strong", html, dateString)];
                                                        case 9:
                                                            _a.sent();
                                                            return [4 /*yield*/, this.newDesignation(meeting, "ministryTitle", this.session3, "", " #p" + this.position, html, dateString)];
                                                        case 10:
                                                            _a.sent();
                                                            i = 0;
                                                            _a.label = 11;
                                                        case 11:
                                                            if (!(i <= 10)) return [3 /*break*/, 14];
                                                            return [4 /*yield*/, this.newDesignation(meeting, "p", this.session3, this.pGroup, " #p" + this.position + " > strong", html, dateString)];
                                                        case 12:
                                                            _a.sent();
                                                            _a.label = 13;
                                                        case 13:
                                                            i++;
                                                            return [3 /*break*/, 11];
                                                        case 14: return [4 /*yield*/, this.newDesignation(meeting, "christiansTitle", this.session4, "", " #p" + this.position + " > strong", html, dateString)];
                                                        case 15:
                                                            _a.sent();
                                                            return [4 /*yield*/, this.newDesignation(meeting, "song", this.session4, this.pGroup, " #p" + this.position, html, dateString)];
                                                        case 16:
                                                            _a.sent();
                                                            i = 0;
                                                            _a.label = 17;
                                                        case 17:
                                                            if (!(i <= 10)) return [3 /*break*/, 22];
                                                            while (this.skipNoMarker(this.session4, this.pGroup, "#p" + this.position, html)) {
                                                                this.position++;
                                                            }
                                                            return [4 /*yield*/, this.newDesignation(meeting, "p", this.session4, this.pGroup, " #p" + this.position + ".su > strong", html, dateString)];
                                                        case 18:
                                                            if (!!(_a.sent())) return [3 /*break*/, 21];
                                                            return [4 /*yield*/, this.newDesignation(meeting, "p", this.session4, this.pGroup, " #p" + this.position + ".su >> strong", html, dateString)];
                                                        case 19:
                                                            if (!!(_a.sent())) return [3 /*break*/, 21];
                                                            return [4 /*yield*/, this.newDesignation(meeting, "p", this.session4, this.pGroup, " #p" + this.position + ".su > strong > em", html, dateString)];
                                                        case 20:
                                                            if (!(_a.sent())) {
                                                            }
                                                            else {
                                                                this.position++;
                                                            }
                                                            _a.label = 21;
                                                        case 21:
                                                            i++;
                                                            return [3 /*break*/, 17];
                                                        case 22: return [4 /*yield*/, this.newDesignation(meeting, "review", this.session4, this.pGroup, " #p" + this.position, html, dateString)];
                                                        case 23:
                                                            _a.sent();
                                                            return [4 /*yield*/, this.newDesignation(meeting, "finalSong", this.session4, this.pGroup, " #p" + this.position, html, dateString)];
                                                        case 24:
                                                            _a.sent();
                                                            return [3 /*break*/, 26];
                                                        case 25:
                                                            e_1 = _a.sent();
                                                            console.log(e_1);
                                                            return [3 /*break*/, 26];
                                                        case 26: return [4 /*yield*/, new MeetingDB(meeting)];
                                                        case 27:
                                                            meetingDB = _a.sent();
                                                            return [4 /*yield*/, meetingDB.save(function (err, meeting) {
                                                                    if (err) {
                                                                        // console.log(err);
                                                                    }
                                                                    else {
                                                                        meetings.push(meeting);
                                                                    }
                                                                })];
                                                        case 28:
                                                            _a.sent();
                                                            momentDate.add(7, "days");
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })["catch"](function (err) {
                                                console.log(err);
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 1;
                    case 1:
                        if (!!stop) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, meetings];
                }
            });
        }); };
    }
    ScrapingController.prototype.skipNoMarker = function (session, pGroup, tag, html) {
        return cheerio(session + pGroup + " .noMarker " + tag, html).text().length > 5;
    };
    ScrapingController.prototype.newDesignation = function (meeting, title, session, pGroup, tag, html, dateString) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.addDesignation;
                        _b = [meeting];
                        return [4 /*yield*/, this.fillDesignation(title, session, pGroup, tag, html, dateString)];
                    case 1: return [4 /*yield*/, _a.apply(this, _b.concat([_c.sent(),
                            title, session, pGroup, tag, html, dateString]))];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    ScrapingController.prototype.getStringDate = function (momentDate) {
        return momentDate.format("YYYY") + "/" + momentDate.format("MM") + "/" + momentDate.format("DD");
    };
    return ScrapingController;
}());
exports.ScrapingController = ScrapingController;
