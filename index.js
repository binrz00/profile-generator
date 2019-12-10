const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

const questions = [{

    message: "what is your git hub user name?",
    name: "userName"
    
},{
    message: "what is your favorite color?",
    name: "color"   
}
  
];
inquirer.prompt(questions).then(function(data){
    console.log(data.userName)
    console.log(data.color)
    const queryUrl = `https://api.github.com/users/${data.userName}`;
    console.log(queryUrl)
    axios.get(queryUrl).then(function(res){
      console.log("followers:"+res.data.followers);
      console.log("following:"+res.data.following);
      console.log("repos:"+res.data.public_repos);
      console.log("bio:"+res.data.bio);
      console.log("name:"+res.data.name);
      console.log("location:"+res.data.location);
      console.log("image:"+res.data.avatar_url);
      console.log("blog url:"+res.data.blog);
      console.log("profile url:"+res.data.html_url);

    })
    const starquery = `https://api.github.com/users/${data.userName}/watched`;
    axios.get(starquery).then(function(starRes){
        console.log(starRes.data.length);
    })
})
   
// function writeToFile(fileName, data) {
 
// }

// function init() {}

// init()

