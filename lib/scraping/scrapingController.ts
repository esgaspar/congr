import { MeetingSchema } from "./../meeting/meetingModel";
import * as mongoose from "mongoose";
import { Request, Response } from "express";
import * as cheerio from "cheerio";
import * as rp from "request-promise";
import * as moment from "moment";

const MeetingDB = mongoose.model("meetings", MeetingSchema);
const langs = [
  { lang: "pt", langId: "lp-t", cod: "r5" },
  { lang: "ht", langId: "lp-cr", cod: "r60" }
];

export class ScrapingController {

  public lang = { lang: "", langId: "", cod: "" };
  public meetings = [];

  constructor() {
    console.log(this);
  }

    static fillDesignation = async (type, tag, html, dateString) => {
    let designation = { date: "", title: "", type: "" };
    designation.type = type;
    designation.title = cheerio(tag, html).text();
    designation.date = dateString;
    return designation;
  };

    static addDesignation = async (meeting, designation) => {
      if(designation && designation.title.length > 0){
        meeting.designations.push(designation);
      }
  };

  public getScrapings = async (req: Request, res: Response) => {
    this.lang = langs.find(lang => lang.lang === req.query.lang);
    let date = req.query.date;

    await this.scrap(date, this.meetings, req);

    res.send(this.meetings);
  };

  private scrap = async (date: any, meetings, req) => {
    
    let momentDate = moment(date, "YYYY/MM/DD");
    //momentDate.subtract(3, "months");
    let stop = false;
    while (!stop) {
            let meeting = {
              date: {},
              meetingType: {},
              designations: []
            };
      let dateString = momentDate.format("YYYY") + "/" + momentDate.format("MM") + "/" + momentDate.format("DD");
      meeting.date = momentDate;
      meeting.meetingType = "Meio de semana";
      let adress = `https://wol.jw.org/${this.lang.lang}/wol/dt/${this.lang.cod}/${this.lang.langId}/${dateString}`;
      await rp(adress)
        .then(async (html) => {

          let weekReading = await ScrapingController.fillDesignation( "weekReading", "#p2 > a > strong", html, dateString);


         
          if (!weekReading.title) {
            stop = true;
            return;
          }

        try{
          meeting.designations.push(weekReading);

          let pGroup = ".pGroup "
          let session1= "#section1 "

          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "initialSong", session1 + pGroup + "#p3.su", html, dateString));
          
          let session2= "#section2 "
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "treasuresTitle", session2 + "#p5 > strong", html, dateString));
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "treasures", session2 + pGroup +"#p6.su > strong", html, dateString));
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "gems", session2 + pGroup + "#p10.su > strong", html, dateString));
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "bibleReading", session2 + pGroup + "#p15.su > strong", html, dateString));
          
          let session3= "#section3 "
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "ministryTitle", session3 + "#p16", html, dateString));
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "p", session3 + pGroup + "#p17 > strong", html, dateString));
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "p", session3 + pGroup + "#p18 > strong", html, dateString));
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "p", session3 + pGroup + "#p19 > strong", html, dateString));
          
          let session4= "#section4 "
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "christiansTitle", session4 + "#p21", html, dateString));
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "song", session4 + pGroup + "#p22", html, dateString));
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "p", session4 + pGroup + "#p23 > strong", html, dateString));
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "p", session4 + pGroup + "#p24 > strong", html, dateString));
          
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "p", session4 + pGroup + "#p25 > strong", html, dateString));
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "review ", session4 + pGroup + "#p26 > strong",  html, dateString));
          ScrapingController.addDesignation(meeting, await ScrapingController.fillDesignation( "finalSong", session4 + pGroup + "#p27", html, dateString));
          }catch(e) {
            console.log(e);
          }
          let meetingDB = await new MeetingDB(meeting);

          await meetingDB.save((err, meeting) => {
            if (err) {
              // console.log(err);
            } else {
               meetings.push(meeting);
            }
          });

          momentDate.add(7, "days");
          stop = true;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };
}
