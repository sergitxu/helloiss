(function(){

  // TODO get image from NASA that changes it periodically
  // source I: https://www.nasa.gov/multimedia/imagegallery/iotd.html
  // source II: Image of the Earth from ISS
  document.body.style.backgroundImage = '';

  // ADD INFO from Firebase database to HTML

  // Add crew info
  let ISSCrewImage = firebase.database().ref('ISSCrewImage/');
  ISSCrewImage.on('value', function(snapshot) {
    document.getElementById('crewImg').src = snapshot.val().url;
  });
  
  // Add ISS position info
  let imgMap = firebase.database().ref('currentPosition/');
  imgMap.on('value', function(snapshot) {
    document.getElementById('positionMap').src = snapshot.val().urlMap;
  });

  // Add ISS country info
  let countryMap = firebase.database().ref('currentCountry/');
  countryMap.on('value', function(snapshot) {
    document.getElementById('countryName').innerText = snapshot.val().name;
  });
  
  // Add song info
  let song = firebase.database().ref('song/');
  song.on('value', function(snapshot) {
    document.getElementById('songName').innerText = snapshot.val().name;
    document.getElementById('songArtist').innerText = snapshot.val().artist;
    document.getElementById('songImage').src = snapshot.val().image;
    document.getElementById('songUrl').href = snapshot.val().url;
  });

  // Add ISS news
  let ISSNews = firebase.database().ref('ISSNews/news/');
  ISSNews.on('value', function(snapshot) {
    for (i=0; i < snapshot.val().title.length; i++) {
      document.getElementById('news').innerHTML += `
      <li>
        <a href="${snapshot.val().urls[i]}">${snapshot.val().title[i]}
        <img src="${snapshot.val().images[i]}"></a>
      </li>
      `;
    };
  });
 
  // Get crew info from NASA

  function getCrew() {
      let crew = firebase.database().ref('cosmonaut/crew');
      crew.on('value', function(snapshot) {
        let cosmonauts = snapshot.val();
        cosmonauts.forEach(function(value, index) {
          if (value.craft === 'ISS') {
            document.getElementById('crew').innerHTML+=`<li>${value.name}</li>`;
          };
        });
      });
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

function sayHello() {

  // TODO create a complete map
  var greetingsTranslations = new Map([
    ['AU','Hi'],
    ['EN', 'Hello'],
    ['ES','Hola'],
    ['RU','Priviet'],
    ['MV','Alo']
    
  ]);

  // get the country code for current position
  let countryCode = firebase.database().ref('currentCountry/');
  countryCode.on('value', function(snapshot) {
    IDcountry = snapshot.val().code;
    Namecountry = snapshot.val().name;
    // map the greeting asociated to the country
    greeting = greetingsTranslations.get(IDcountry);
    if (!greeting) {
      // country by default EN
      greeting = greetingsTranslations.get('EN');
    }
    document.getElementById('greetingsFromEarth').innerText = `${greeting} from ${Namecountry}, ISS`;
      
  });
}

function init() {
  
  getCrew();
  sayHello();
}

init();


})();
