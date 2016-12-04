import util = require('util');
import request = require('request');
const apikey = process.env.apikey || ''
if(apikey === 'undefined') {
  //throw Error 'Missing api key';
}
export class Bot {
  private args: any;

  constructor(args:Object){
    this.args = args;
  }

  get extract(){
    return "text";
  }

  execute(cb:any){
    let args = this.args;
    var relevance = 0.0;


    var text: string = "AAPL";


    for (let keyword of args.keywords){
        if (parseFloat(keyword.relevance) > relevance){
            relevance = keyword.relevance;
            text = keyword.text;
        }
    }
    let tradierurl: string = '';
    let url = util.format(tradierurl,
     apikey, encodeURIComponent(text));

    request.get(url, (error, response, body)=>{
      //TODO refactor for stock api
      // curl -H "Authorization: Bearer {access token}" https://api.tradier.com/v1/markets/quotes?symbols=SPY,SPY140627C00195500
        let header = `Bearer + ${apikey}`;
        let stocks = JSON.parse(body).stocks;

        if (){




          let result = {
          };
          cb(result);
        } else {
          cb({
              text : util.format("Sorry could not find anything for \"%s\"", args.text)
          });
        }
    });
  }
}
