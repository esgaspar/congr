import { DesignationsSchema } from './../designations/designationsModel';
import { DesignationsController } from './../designations/designationsController';
import * as mongoose from "mongoose";
import { Request, Response } from "express";
import * as cheerio from "cheerio";
import * as rp from "request-promise";
import * as moment from 'moment';


const Designations = mongoose.model("designations", DesignationsSchema);
const langs = [
  { lang: "pt", langId: "lp-t", cod: "r5" },
  { lang: "ht", langId: "lp-cr", cod: "r60" }
];

export class ScrapingController {

  public lang = { lang: "", langId: "", cod: "" };
  public meetings = [];
  public designationsController: DesignationsController = new DesignationsController()

  
  constructor(){
    console.log(this);
  };
  
  public getScrapings = async (req: Request, res: Response) => {
    this.lang = langs.find(lang => lang.lang === req.query.lang);
    let date = req.query.date;
    
    
    await this.scrap(date, this.meetings, req);
    
    res.send(this.meetings);

  };
  
  private scrap = async (date: any, designations, req) => {
    let newDesignations = new Designations(req.body);

    let designation = { date: "", title: "", type: "" };
    
    let momentDate = moment(date, 'YYYY/MM/DD');
    momentDate.subtract(3, 'months');
    let stop = false;
    while(!stop){
      let dateString = momentDate.format('YYYY') + "/" + momentDate.format('MM') + "/" + momentDate.format('DD');
      designation.date = dateString;
      console.log(dateString);
      let adress = `https://wol.jw.org/${this.lang.lang}/wol/dt/${this.lang.cod}/${this.lang.langId}/${dateString}`;
       await rp(adress)
        .then(function (html) {
          designation.type = 'weekReading';
          designation.title = cheerio("#p2 > a > strong", html).text();

          if(!designation.title){
            stop = true;
            return;
          }

          new Designations(designation).save((err, designation) => {
            designations.push(designation);
          });

          designation.type = "initialSong"; 
          designation.title = cheerio("#p3 > a", html).text();

          new Designations(designation).save((err, designation) => {
            designations.push(designation);
          });

          designation.type = "treasures"; 
          designation.title = cheerio("#p6 > a > strong", html).text();

          new Designations(designation).save((err, designation) => {
            designations.push(designation);
          });


          designation = { date: "", title: "", type: "" };
          momentDate.add(7, 'days');
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }
}
