(function(){



  // TODO get image from NASA that changes it periodically
  // source I: https://www.nasa.gov/multimedia/imagegallery/iotd.html
  // source II: Image of the Earth from ISS
  document.body.style.backgroundImage = '';

  // Get crow image from NASA
  // TODO Actually take from their site: https://www.nasa.gov/mission_pages/station/expeditions/index.html
  document.getElementById('crewImg').src = 'https://nasa.gov' + '/sites/default/files/styles/2x1_cardfeed/public/thumbnails/image/iss056e032438.jpg';
  
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

getCrew("http://api.open-notify.org/astros.json");

//Get Country Code for ISS location

let getCountryCode = url => {
  var xmlHttp = new XMLHttpRequest();
  
  xmlHttp.onreadystatechange = function() {

      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        let ISSCountryLocation = JSON.parse(xmlHttp.responseText);
        
        if (ISSCountryLocation.geonames[0]) {
          let ISScountryCode = ISSCountryLocation.geonames[0].countryCode;

        console.log(ISScountryCode);
        }
        

      } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
          console.error("ERROR! 404");
          console.info(JSON.parse(xmlHttp.responseText));
      }
  };
  xmlHttp.open("GET", url, true);
  xmlHttp.send();
}

// Get ISS current location
let locateISS = url => {
  var xmlHttp = new XMLHttpRequest();
  
  xmlHttp.onreadystatechange = function() {

      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        let ISSlocation = JSON.parse(xmlHttp.responseText);
        if(ISSlocation.message === 'success'){
          const USERNAME = 'sergitxu';
          let ISSlatitude = ISSlocation.iss_position.latitude;
          let ISSlongitude = ISSlocation.iss_position.longitude;

          let countryCodeUrl = `http://api.geonames.org/findNearbyJSON?username=${USERNAME}&lat=${ISSlatitude}&lng=${ISSlongitude}`;

          const latlon = `${ISSlatitude},${ISSlongitude}`;

          // TODO show real map? Cuidado si cobran
          // Mostrar recorrido
          // Colocar mapa en la página
          const googleMapsKey = "AIzaSyApZj382B_afAx4ecNtytJFhvWhTf9WvWw";
          const img_url = `http://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&sensor=false&key=${googleMapsKey}`;
          //document.body.innerHTML = `<img src='${img_url}'>`;

          getCountryCode(countryCodeUrl);

        }
        

      } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
          console.error("ERROR! 404");
          console.info(JSON.parse(xmlHttp.responseText));
      }
  };
  xmlHttp.open("GET", url, true);
  xmlHttp.send();
}

locateISS("http://api.open-notify.org/iss-now.json")



})();
