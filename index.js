const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const genHtml = require("./generateHTML")
//convertFactory = require('electron-html-to');
const pdf = require('html-pdf');

const questions = [{

    message: "what is your git hub user name?",
    name: "userName"
    
},{
    message: "what is your favorite color?",
    name: "color"   
}
  
];
 inquirer.prompt(questions).then(function(data){
    const queryUrl = `https://api.github.com/users/${data.userName}`;
 axios.get(queryUrl).then(function(res){
      console.log("followers:"+res.data.followers);
      console.log("following:"+res.data.following);
      console.log("repos:"+res.data.public_repos);
      console.log("bio:"+res.data.bio);
      console.log("name:"+res.data.name);
      console.log("image:"+res.data.avatar_url);
      console.log("blog url:"+res.data.blog);
      console.log("profile url:"+res.data.html_url);
      const location = res.data.location.replace(/\s+/g, '');
      console.log(location);
        const maps = `https://www.google.com/maps/place/${location}/`;
        console.log(maps);
    
    const starquery = `https://api.github.com/users/${data.userName}/watched`;
  axios.get(starquery).then(function(starRes){
        console.log(starRes.data.length);
        const html = genHtml.generateHTML(genHtml.colors,data,res,starRes);
        writeFileAsync("profile.html",html,"utf8");
        const options = { format: 'Letter'};
        pdf.create(html, options).toFile("profile.pdf", function(err, res) {
         if (err) return console.log(err);
         console.log(res); 
        });
        
        
    })
})

})
  

// const conversion = convertFactory({converterPath: convertFactory.converters.PDF});
 
// conversion({ html }, function(err, result) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log(result.logs);
//   result.stream.pipe(fs.createWriteStream('./index.pdf'));
//   conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
// });


// const options = { format: 'Letter' };
//  pdf.create(html, options).toFile("profile.pdf", function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); 
// });