const rp = require("request-promise");
const objtocsv = require("objects-to-csv");
const cheerio = require("cheerio");
const fs = require('fs');


async function main() {
    const url = "https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data";
    
    const result = await rp.get(url); // html code for the entire webpage
    // console.log(result);
    const $ = cheerio.load(result);
    // #thetable > tbody > tr > td
    // #thetable > tbody
    var strings = [];
    var countries = [];
    var infections = [];
    var deaths = [];
    var recovery = [];
    var jsons = [];

    $("#thetable > tbody > tr").each((index, element) => {
        strings.push($(element).text().trim().split("\n\n"));
    });
    strings.pop();
    strings.shift();  // removes first element of array
    
    for (string of strings) {
        countries.push(string[0]);
        infections.push(string[1]);
        deaths.push(string[2]);
        recovery.push(string[3]);
    }
    // console.log(countries);
    // console.log(infections);
    // console.log(deaths);
    // console.log(recovery);
    for (i = 0; i < countries.length; i++) {
        let jsonObj = {
            country: countries[i],
            infection: infections[i],
            death: deaths[i],
            recovery: recovery[i]
        }
        jsons.push(jsonObj);
    };
    console.log(jsons);
    
    const storeData = (data, path) => {
        
        try {
            fs.write("\n");
            var stringFy = JSON.stringify(data)
            fs.writeFile(path, stringFy , 'utf8', callback);
        }
        catch (err) {
            console.error(err)
        }
    }
    
    storeData(jsons, "data.json");
}
main();
