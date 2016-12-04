"use strict";
var util = require("util");
var request = require("request");
var apikey = process.env.apikey || '';
if (apikey === 'undefined') {
}
var Bot = (function () {
    function Bot(args) {
        this.args = args;
    }
    Object.defineProperty(Bot.prototype, "extract", {
        get: function () {
            return "text";
        },
        enumerable: true,
        configurable: true
    });
    Bot.prototype.execute = function (cb) {
        var args = this.args;
        var relevance = 0.0;
        var text = "AAPL";
        for (var _i = 0, _a = args.keywords; _i < _a.length; _i++) {
            var keyword = _a[_i];
            if (parseFloat(keyword.relevance) > relevance) {
                relevance = keyword.relevance;
                text = keyword.text;
            }
        }
        var tradierurl = '';
        var url = util.format(tradierurl, apikey, encodeURIComponent(text));
        request.get(url, function (error, response, body) {
            //TODO refactor for stock api
            // curl -H "Authorization: Bearer {access token}" https://api.tradier.com/v1/markets/quotes?symbols=SPY,SPY140627C00195500
            var photos = JSON.parse(body).photos;
            if (photos && photos.photo.length > 0) {
                var photo = photos.photo[0];
                var url_1 = util.format("http://farm%s.staticflickr.com/%s/%s_%s.jpg", photo.farm, photo.server, photo.id, photo.secret);
                var result = {
                    attachment: {
                        type: "image",
                        payload: {
                            url: url_1
                        }
                    }
                };
                cb(result);
            }
            else {
                cb({
                    text: util.format("Sorry could not find anything for \"%s\"", args.text)
                });
            }
        });
    };
    return Bot;
}());
exports.Bot = Bot;
