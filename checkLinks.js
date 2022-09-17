#!/usr/bin/env node
console.log('Im working on Links');

import got from 'got';
import jsdom from 'jsdom';
import curl from "./cURL.js";

// const got = require('got');
// const jsdom = require('jsdom');
// const curl = require('./curl');
const { JSDOM } = jsdom;
const vgmUrl = 'https://kaustubh-natuskar.github.io/moreThanFAANGM/';





const checkLinks = async () => {
  try {
    const response = await got(vgmUrl);
    const dom = new JSDOM(response.body);
    let objs = dom.window.document.querySelectorAll('ol li');
    let notWorkingUrls = [];

    for (let i = 0; i < objs.length; i++) {
      const e = objs[i];
      let name = e.querySelector('a').textContent;
      let link = e.querySelector('a').href;
      try {
        const curlRequest = new curl(link);
        const statusCode = await curlRequest.getHeaders();
        console.log(statusCode, name);
        //console.log(`${name} --> ${statusCode}`);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

checkLinks()
// const checkLinks = async () => {
//   try {
//     const response = await got(vgmUrl);
//     const dom = new JSDOM(response.body);
//     let objs = dom.window.document.querySelectorAll('ol li');
//     let notWorkingUrls = [];

//     for (let i = 0; i < objs.length; i++) {
//       const e = objs[i];
//       let name = e.querySelector('a').textContent;
//       let link = e.querySelector('a').href;
//       //const exist = await urlExist(link);

//       // request(link, function (error, response) {
//       //   if (!error && response.statusCode == 200) {
//       //     console.log(`${name} is workking fine`) // Show the HTML for the Google homepage. 
//       //   }
//       //   else {
//       //     console.log(`${name} is not workking fine ${error}`)
//       //   }
//       // })

//       // if (exist == false) {
//       //   console.log(name);
//       //   console.log(link);
//       // }
//       if (await isUp(link)) {
//         console.log(`${name} is Up`);
//       } else {
//         console.log(`${name} is Down`);
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }






// got(vgmUrl).then(response => {
//   const dom = new JSDOM(response.body);
//   // dom.window.document.querySelectorAll('li').forEach(e => {
//   //   console.log(e);
//   // });
//   let objs = dom.window.document.querySelectorAll('ol li');
//   let notWorkingUrls = [];
//   for (let i = 0; i < objs.length; i++) {
//     const e = objs[i];
//     let name = e.querySelector('a').textContent;
//     let link = e.querySelector('a').href;
//     console.log(name);
//     console.log(link);

//   }
//   console.log(objs.length);
// }).catch(err => {
//   console.log(err);
// });

// const request = require('request')

// request(
//   { uri: 'https://kaustubh-natuskar.github.io/moreThanFAANGM/' },
//   function (err, res, body) {
//     console.log(body)
//   }
// );
// const axios = require('axios').default;
// const { JSONFromTable } = require('jsonfromtable')

// axios.get('https://kaustubh-natuskar.github.io/moreThanFAANGM/')
//   .then(function (res) {
//     //return res;
//     console.log(res);
//   })
// .then(function (res) {
//   // console.log(res);
//   const obj = JSONFromTable.fromString(res)
//   console.log(obj);
// });

// const url = 'https://kaustubh-natuskar.github.io/moreThanFAANGM/';

// fetch(url)
// .then(res => {
// return res.json();
// })
// .then(data => {
//   console.log(data);
// });
// let obj = {
//   urls: [
//     { url: 'https://kaustubh-natuskar.github.io/moreThanFAANGM/', filename: 'index.html' }
//   ],
//   directory: '/Users/Kaustubh/moreThanFAANGM/response',
// };

// scrape(obj)
//   .then((res) => {
//     const $ = cheerio.load(res);
//     console.log(res);
//     console.log($('ol'));
//   });


// got(vgmUrl).then(response => {
//   const $ = cheerio.load(response.body);
//   //console.log($('ol'));
//   let o = $('li');
//   o = JSON.stringify(o, null, 2)
//   console.log(o);
// }).catch(err => {
//   console.log(err);
// });
