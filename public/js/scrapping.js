const cheerio = require ('cheerio');
const axios = require('axios');


 let database = firebase.database();

axios.get(url)
.then(response => {
    const $ = cheerio.load(response.data);
    const issCrewImg = 'http://www.ariss.org' + $('.galleryImageBorder').attr('src');

    firebase.database().ref('ISSCrewImage/').set({
        url: issCrewImg
    });
})
.catch(error => {
    console.log('error', error);
});


(function(){

  // https://blogs.nasa.gov/spacestation/feed/
  // news regarding ISS parse RSS xml

  // from https://www.nasa.gov/mission_pages/station/expeditions/index.html
  var crewImage = document.querySelector("div#cards div.bg-card-canvas").style.backgroundImage;
 
  var missionOverview = document.querySelector("div#ember1127 div div p");
  // var currentMission = meta twitter:title;
  document.getElementById('currentMissionBadge').src = 'https://www.nasa.gov/sites/default/files/styles/1x1_cardfeed/public/thumbnails/image/iss057-s-001b.jpg';


})();
