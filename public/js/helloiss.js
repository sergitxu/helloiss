(function(){
    // Get crow image from NASA
    // TODO Actually take from their site: https://www.nasa.gov/mission_pages/station/expeditions/index.html
    document.getElementById('crewImg').src = 'https://nasa.gov' + '/sites/default/files/styles/2x1_cardfeed/public/thumbnails/image/iss056e032438.jpg';
    
    // Get crow info from NASA 
    // TODO Actually take from their site: https://www.nasa.gov/mission_pages/station/expeditions/index.html
    var crew = [{
      name: 'Serena Au&ntilde;&oacute;n-Chancellor',
      url: 'https://www.nasa.gov/astronauts/biographies/serena-m-aunon-chancellor'
      },
      {
      name: 'Commander Alexander Gerst',
      url: 'http://www.esa.int/Our_Activities/Human_Spaceflight/Astronauts/Alexander_Gerst'
      },
      {
      name: 'Sergey Prokopyev',
      url: 'http://www.gctc.ru/main.php?id=201'
      }]
    
      for(i=0; i<crew.length; i++) {
        document.getElementById('crew').innerHTML+=`<li><a href="${crew[i].url}" target="_blank">${crew[i].name}</a></li>`;
      };
  })();