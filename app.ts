import util = require('util');
import request = require('request');
const apikey = process.env.apikey || ''
if(apikey === 'undefined') {
  throw Error 'Missing api key';
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
        let photos = JSON.parse(body).photos;

        if (photos && photos.photo.length > 0){
          let photo = photos.photo[0];
          let url = util.format("http://farm%s.staticflickr.com/%s/%s_%s.jpg", photo.farm, photo.server, photo.id, photo.secret);


          let result = {
            attachment: {
              type: "image",
              payload: {
                url: url
              }
            }
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
