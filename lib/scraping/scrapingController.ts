import { MeetingSchema } from "./../meeting/meetingModel";
import * as mongoose from "mongoose";
import { Request, Response } from "express";
import * as cheerio from "cheerio";
import * as rp from "request-promise";
import * as moment from "moment";

const MeetingDB = mongoose.model("meetings", MeetingSchema);
const langs = [
  { lang: "pt", langId: "lp-t", cod: "r5" },
  { lang: "ht", langId: "lp-cr", cod: "r60" },
  { lang: "ar", langId: "lp-a", cod: "r39" }
];

export class ScrapingController {
  public lang = { lang: "", langId: "", cod: "" };
  public meetings = [];
  public position = 1;

  public pGroup =   ".pGroup ";
  public midweek = ".docClass-106 "
  public session1 = this.midweek + "#section1 ";
  public session2 = this.midweek + "#section2 ";
  public session3 = this.midweek + "#section3 ";
  public session4 = this.midweek + "#section4 ";

 
  constructor() {}

  public fillDesignation = async (type, session, pGroup, tag, html, dateString) => {
    let designation = { date: "", title: "", type: "" };
    designation.type = type;
    designation.title = cheerio(session + pGroup + tag, html).text();
    designation.date = dateString;
    return designation; 
  };
  
  private skipNoMarker(session, pGroup, tag, html){
    return cheerio(session + pGroup + " .noMarker " +tag, html).text().length > 5
  }

  public addDesignation = async (meeting, designation, title,  session, pGroup, tag , html, dateString) => {

    if (designation && designation.title.length > 5) {
      designation.title = designation.title;
      this.position++;
      meeting.designations.push(designation);
      return true;
    }else if(title == 'gems'){
      this.position++;
      this.newDesignation(meeting, title, this.session2, this.pGroup , ` #p${this.position} > strong` , html, dateString);
      this.position--;
      return true;
    }
    return false;
  };

  public getScrapings = async (req: Request, res: Response) => {
    this.lang = langs.find(lang => lang.lang === req.query.lang);
    let date = req.query.date;

    this.meetings = await this.scrap(date, this.meetings, req);

    res.send(this.meetings);
  };

  public async newDesignation(meeting, title, session, pGroup, tag , html, dateString){
    return await this.addDesignation( meeting,
      await this.fillDesignation( title, session, pGroup, tag, html, dateString ),
      title, session, pGroup, tag , html, dateString
    );
  }
  
  private scrap = async (date: any, meetings, req) => {
    let momentDate = moment(date, "YYYY/MM/DD");
    //momentDatebtract(3, "months");
    let stop = false;
    while (!stop) {
      this.position = 1;
      let meeting = {
        date: {},
        meetingType: {},
        designations: []
      };
      let dateString = this.getStringDate(momentDate);

      console.log(`importando - ${dateString}`);
      meeting.date = momentDate;
      meeting.meetingType = "Meio de semana";
      let adress = `https://wol.jw.org/${this.lang.lang}/wol/dt/${this.lang.cod}/${this.lang.langId}/${dateString}`;
      await rp(adress)
      .then(async html => {
        await this.newDesignation(meeting, "week", "", "" , ` #p${this.position}` , html, dateString);
        
        let weekReading = await this.fillDesignation( "weekReading", "", "",` #p${this.position} > a > strong`, html, dateString);
          if (!weekReading.title) {
            stop = true;
            return;
          }
          meeting.designations.push(weekReading);
          this.position++;
          
          try {

            await this.newDesignation(meeting, "initialSong", this.session1, this.pGroup , ` #p${this.position}` , html, dateString);
            await this.newDesignation(meeting, "p", this.session1, this.pGroup , ` #p${this.position}` , html, dateString);
            
            await this.newDesignation(meeting, "treasuresTitle", this.session2 , "" ,` #p${this.position} > strong` , html, dateString);
            await this.newDesignation(meeting, "treasures", this.session2, this.pGroup , ` #p${this.position} >> strong`, html, dateString);
            
            this.position = 10;
            await this.newDesignation(meeting, "gems", this.session2, this.pGroup , ` #p${this.position} > strong`, html, dateString);
            this.position = this.position + 5;
            await this.newDesignation(meeting, "bibleReading", this.session2, this.pGroup , ` #p${this.position} > strong`, html, dateString);
            
            await this.newDesignation(meeting, "ministryTitle",this.session3 ,"", ` #p${this.position}`, html, dateString);
            for(let i = 0 ; i <= 10; i++){
              await this.newDesignation(meeting, "p",this.session3 , this.pGroup,` #p${this.position} > strong`, html, dateString);
            }
            
            await this.newDesignation(meeting, "christiansTitle", this.session4 , "", ` #p${this.position} > strong`, html, dateString);
            await this.newDesignation(meeting, "song", this.session4, this.pGroup , ` #p${this.position}`, html, dateString);

            for(let i = 0 ; i <= 10; i++){
              while (this.skipNoMarker(this.session4, this.pGroup,  `#p${this.position}`, html)) {
                this.position++;
              }
              if(!await this.newDesignation(meeting, "p", this.session4, this.pGroup , ` #p${this.position}.su > strong`, html, dateString))
              if(!await this.newDesignation(meeting, "p", this.session4, this.pGroup , ` #p${this.position}.su >> strong`, html, dateString))
              if(!await this.newDesignation(meeting, "p", this.session4, this.pGroup , ` #p${this.position}.su > strong > em`, html, dateString)){
              }else{
                this.position++;
              }
            }

            await this.newDesignation(meeting, "review", this.session4, this.pGroup , ` #p${this.position}`, html, dateString);
            await this.newDesignation(meeting, "finalSong", this.session4, this.pGroup , ` #p${this.position}`, html, dateString);

          } catch (e) {
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
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    return meetings;
  };


  private getStringDate(momentDate: moment.Moment) {
    return momentDate.format("YYYY") + "/" + momentDate.format("MM") + "/" + momentDate.format("DD");
  }
}
