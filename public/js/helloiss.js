(function(){

  // TODO get image from NASA that changes it periodically
  // source I: https://www.nasa.gov/multimedia/imagegallery/iotd.html
  // source II: Image of the Earth from ISS
  document.body.style.backgroundImage = '';

  // Add crew image from NASA
  var ISSCrewImage = firebase.database().ref('ISSCrewImage/');
  ISSCrewImage.on('value', function(snapshot) {
    document.getElementById('crewImg').src = snapshot.val().url;
  });

  // Add ISS position
  let imgMap = firebase.database().ref('currentPosition/');
  imgMap.on('value', function(snapshot) {
    document.getElementById('positionMap').src = snapshot.val().urlMap;
  });
 
     
// TODO create service to getAPIs

  // Get crew info from NASA
  let getCrew = url => {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {

        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          let crew = JSON.parse(xmlHttp.responseText).people;

          crew.forEach(function(astronaut) {
            if (astronaut.craft === 'ISS') {
              document.getElementById('crew').innerHTML+=`<li>${astronaut.name}</li>`;
            };
          });

        } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
            console.error("ERROR! 404");
            console.info(JSON.parse(xmlHttp.responseText));
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

function addZero(number){
  if (number < 10) {
    number = "0" + number;
  };
  return number;
}

// Get ISS orbiting time
setInterval(
  function timeInOrbit(since) {
    since = new Date("November 20 1998 00:00").getTime();
    let today = new Date().getTime();

    var timeInOrbit = today - since;
    var totalSecs = parseInt(timeInOrbit / 1000);
    let totalMins = parseInt(totalSecs / 60);
    let totalHours = parseInt(totalMins / 60);
    let totalDays = parseInt(totalHours / 24);
    // let totalMonths = parseInt(totalDays / 30);

    let years = parseInt(totalDays / 365);
    // let months = parseInt(totalMonths - (years * 12));
    let days = parseInt(totalDays - (years * 365));
    let hours = parseInt(totalHours - (totalDays * 24));
    let mins = parseInt(totalMins - (totalHours * 60));
    let secs = parseInt(totalSecs - (totalMins * 60));

    years = addZero(years);
    // months = addZero(months);
    days = addZero(days);
    hours = addZero(hours);
    mins = addZero(mins);
    secs = addZero(secs);


    document.getElementById('timeInOrbit').innerText = `
    ${years} years, ${days} days, ${hours} hours, ${mins} min. and ${secs} sec.
    `;
  
  }, 1000);
  

//Get ISS news

let getISSNews = url => {
  var xmlHttp = new XMLHttpRequest();
  
  xmlHttp.onreadystatechange = function() {

      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        let getNews = JSON.parse(xmlHttp.responseText);

        console.log(getNews);
        
        // if (getNews.geonames[0]) {
        //   let ISScountryCode = getNews.geonames[0].countryCode;
        //   let ISScountryName = getNews.geonames[0].countryName;
        //   document.getElementById('countryCode').innerText = `${ISScountryName}: ${ISScountryCode}`;
        // }
        

      } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
          console.error("ERROR! 404");
          console.info(JSON.parse(xmlHttp.responseText));
      }
  };
  xmlHttp.open("GET", url, true);
  xmlHttp.send();
}
// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}
// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}
// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

function init() {
  
  getCrew("http://api.open-notify.org/astros.json");
  getISSNews("https://blogs.nasa.gov/spacestation/feed/"); 
}

init();


})();
