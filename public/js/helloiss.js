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
    for (i=0; i < snapshot.val().titles.length; i++) {
      document.getElementById('news').innerHTML += `
      <li>
        <a href="${snapshot.val().urls[i]}" target="_blank">${snapshot.val().titles[i]}
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
  ['AD','Hola'],  ['AE','السلام عليكم'],  ['AF','سلام'],  ['AG','Hello'],  ['AI','Hello'],  ['AL','Fâla'],  ['AM','բարև'],  ['AO','Olá'],  ['AQ','Hello'],  ['AR','Ché, hola'],  ['AS','Hello'],  ['AT','Hallo'],  ['AU','Hello'],  ['AW','Bon dia'],  ['AX','Hej'],  ['AZ','Salam'],  
  ['BA','Hi'],  ['BB','Hi'],  ['BD','Hi'],  ['BE','Hi'],  ['BF','Hi'],  ['BG','Hi'],  ['BH','Hi'],  ['BI','Hi'],  ['BJ','Hi'],  ['BL','Hi'],  ['BM','Hi'],  ['BN','Hi'],  ['BO','Hi'],  ['BQ','Hi'],  ['BR','Hi'],  ['BS','Hi'],  ['BT','Hi'],  ['BV','Hi'],  ['BW','Hi'],  ['BY','Hi'],  ['BZ','Hi'],  ['CA','Hi'],  ['CC','Hi'],  ['CD','Hi'],  ['CF','Hi'],  ['CG','Hi'],  ['CH','Hi'],  ['CI','Hi'],  ['CK','Hi'],  ['CL','Hi'],  ['CM','Hi'],  ['CN','Hi'],  ['CO','Hi'],  ['CR','Hi'],  ['CU','Hi'],  ['CV','Hi'],  ['CW','Hi'],  ['CX','Hi'],  ['CY','Hi'],  ['CZ','Hi'],  ['DE','Hi'],  ['DJ','Hi'],  ['DK','Hi'],  ['DM','Hi'],  ['DO','Hi'],  ['DZ','Hi'],  ['EC','Hi'],  ['EE','Hi'],  ['EG','Hi'],  ['EH','Hi'],  ['ER','Hi'],  ['ES','Hi'],  ['ET','Hi'],  ['FI','Hi'],  ['FJ','Hi'],  ['FK','Hi'],  ['FM','Hi'],  ['FO','Hi'],  ['FR','Hi'],  ['GA','Hi'],  ['GB','Hi'],  ['GD','Hi'],  ['GE','Hi'],  ['GF','Hi'],  ['GG','Hi'],  ['GH','Hi'],  ['GI','Hi'],  ['GL','Hi'],  ['GM','Hi'],  ['GN','Hi'],  ['GP','Hi'],  ['GQ','Hi'],  ['GR','Hi'],  ['GS','Hi'],  ['GT','Hi'],  ['GU','Hi'],  ['GW','Hi'],  ['GY','Hi'],  ['HK','Hi'],  ['HM','Hi'],  ['HN','Hi'],  ['HR','Hi'],  ['HT','Hi'],  ['HU','Hi'],  ['ID','Hi'],  ['IE','Hi'],  ['IL','Hi'],  ['IM','Hi'],  ['IN','Hi'],  ['IO','Hi'],  ['IQ','Hi'],  ['IR','Hi'],  ['IS','Hi'],  ['IT','Hi'],  ['JE','Hi'],  ['JM','Hi'],  ['JO','Hi'],  ['JP','Hi'],  ['KE','Hi'],  ['KG','Hi'],  ['KH','Hi'],  ['KI','Hi'],  ['KM','Hi'],  ['KN','Hi'],  ['KP','Hi'],  ['KR','Hi'],  ['KW','Hi'],  ['KY','Hi'],  ['KZ','Hi'],  ['LA','Hi'],  ['LB','Hi'],  ['LC','Hi'],  ['LI','Hi'],  ['LK','Hi'],  ['LR','Hi'],  ['LS','Hi'],  ['LT','Hi'],  ['LU','Hi'],  ['LV','Hi'],  ['LY','Hi'],  ['MA','Hi'],  ['MC','Hi'],  ['MD','Hi'],  ['ME','Hi'],  ['MF','Hi'],  ['MG','Hi'],  ['MH','Hi'],  ['MK','Hi'],  ['ML','Hi'],  ['MM','Hi'],  ['MN','Hi'],  ['MO','Hi'],  ['MP','Hi'],  ['MQ','Hi'],  ['MR','Hi'],  ['MS','Hi'],  ['MT','Hi'],  ['MU','Hi'],  ['MV','Hi'],  ['MW','Hi'],  ['MX','Hi'],  ['MY','Hi'],  ['MZ','Hi'],  ['NA','Hi'],  ['NC','Hi'],  ['NE','Hi'],  ['NF','Hi'],  ['NG','Hi'],  ['NI','Hi'],  ['NL','Hi'],  ['NO','Hi'],  ['NP','Hi'],  ['NR','Hi'],  ['NU','Hi'],  ['NZ','Hi'],  ['OM','Hi'],  ['PA','Hi'],  ['PE','Hi'],  ['PF','Hi'],  ['PG','Hi'],  ['PH','Hi'],  ['PK','Hi'],  ['PL','Hi'],  ['PM','Hi'],  ['PN','Hi'],  ['PR','Hi'],  ['PS','Hi'],  ['PT','Hi'],  ['PW','Hi'],  ['PY','Hi'],  ['QA','Hi'],  ['RE','Hi'],  ['RO','Hi'],  ['RS','Hi'],  ['RU','Hi'],  ['RW','Hi'],  ['SA','Hi'],  ['SB','Hi'],  ['SC','Hi'],  ['SD','Hi'],  ['SE','Hi'],  ['SG','Hi'],  ['SH','Hi'],  ['SI','Hi'],  ['SJ','Hi'],  ['SK','Hi'],  ['SL','Hi'],  ['SM','Hi'],  ['SN','Hi'],  ['SO','Hi'],  ['SR','Hi'],  ['ST','Hi'],  ['SS','Hi'],  ['SV','Hi'],  ['SX','Hi'],  ['SY','Hi'],  ['SZ','Hi'],  ['TC','Hi'],  ['TD','Hi'],  ['TF','Hi'],  ['TG','Hi'],  ['TH','Hi'],  ['TJ','Hi'],  ['TK','Hi'],  ['TL','Hi'],  ['TM','Hi'],  ['TN','Hi'],  ['TO','Hi'],  ['TR','Hi'],  ['TT','Hi'],  ['TV','Hi'],  ['TW','Hi'],  ['TZ','Hi'],  ['UA','Hi'],  ['UG','Hi'],  ['UM','Hi'],  ['US','Hi'],  ['UY','Hi'],  ['UZ','Hi'],  ['VA','Hi'],  ['VC','Hi'],  ['VE','Hi'],  ['VG','Hi'],  ['VI','Hi'],  ['VN','Hi'],  ['VU','Hi'],  ['WF','Hi'],  ['WS','Hi'],  ['YE','Hi'],  ['YT','Hi'],  ['ZA','Hi'],  ['ZM','Hi']
  ]);

  ["Catalan","Arabic","Persian","Pashto","English","English","Albanian","Armenian","Portuguese","English","Spanish","French","Russian","Spanish","English","Samoan","German","English","Dutch","Papiamento",
  "Swedish","Azerbaijani","Bosnian","Croatian","Serbian","English","Bangla","Dutch","French","German","French","Bulgarian","Arabic","French","French","French","English","Malay","Spanish","Quechua","Guarani","Aymara","Dutch","Portuguese","English","Dzongkha","Norwegian","English","Tswana","Belarusian","Russian","English","English","French","English","French","French","Sango","French","German","French","Italian","Romansh","French","English","Rarotongan","Spanish","French","English","Simplified Chinese","Spanish","Spanish","Spanish","Portuguese","Dutch","English","English","Greek","Turkish","Czech","German","French","Arabic","Somali","Afar","Danish","English","Spanish","Arabic","Spanish","Estonian","Arabic","Arabic","Spanish","French","Tigrinya","Arabic","English","Asturian","Catalan", "Spanish","Basque","Galician","Amharic","Oromo","Finnish","Swedish","Northern Sami","English","English","English","Faroese","Danish","French","French","English","Irish","Welsh","Scottish Gaelic","Cornish","English","Georgian","French","English","English","English","Kalaallisut","Danish","English","French","French","Spanish","French","Portuguese","Greek","English","Spanish","English","Chamorro","Portuguese","English","Traditional Chinese","English","English","Spanish","Croatian","French","Haitian Creole","Hungarian","Indonesian","English","Irish","Hebrew","English","Hindi","English","English","Arabic","Kurdish","Persian","Icelandic","Italian","German","French","English","English","Arabic","Japanese","Swahili","English","Kyrgyz","Russian","Khmer","English","Arabic","French","Swahili","English","Korean","Korean","English","Arabic","English","Kazakh","Russian","Lao","Arabic","French","English","German","Sinhala","Tamil","English","English","Southern Sotho","Lithuanian","Luxembourgish","French","German","Latvian", "Arabic","French","Standard Moroccan Tamazight","Arabic","French","Romanian","Russian","Ukrainian","srp","Serbian","Croatian","Bosnian","Albanian","French","Malagasy","French","English","Marshallese","Macedonian","French","Burmese","Mongolian","Traditional Chinese","Portuguese","English","Chamorro","French","Arabic","French","English","Maltese","English","Morisyen","French","English","Divehi","English","Nyanja","Spanish","Malay","Portuguese","English","sf","German","French","French","English","Norfuk / Pitkern","English","Spanish","Dutch","Norwegian Bokmål","Norwegian Nynorsk","Norwegian","Northern Sami","Nepali","Nauru","English","Niuean","English","Maori","English","Arabic","Spanish","Spanish","French","English","Tok Pisin","Hiri Motu","English","Tagalog","English","Urdu","Polish","French","English","Norfuk / Pitkern","Spanish","English","Arabic","Hebrew","Portuguese","English","Palauan","Japanese","sov","tox","Spanish","Guarani","Arabic","French","Romanian","Serbian", null, "Russian","Kinyarwanda","French","English","Arabic","English", "French","English","Seselwa Creole French","Arabic","English","Swedish","Simplified Chinese","English","Malay","Tamil","English","Slovenian","Norwegian","Slovak","English","Italian","French","Somali","Arabic","Dutch","Portuguese","English","Spanish","Dutch","English","Arabic","English","Swati","English","French","Arabic","French","French","Thai","Tajik","Russian","Tokelau","English","Samoan","Portuguese","Tetum","Turkmen","Arabic","French","English","Turkish","English","English","Traditional Chinese","Swahili","English","Ukrainian","English","Swahili","English","English","Spanish","Uzbek","Kara-Kalpak","Italian","English","Spanish","English","English","Vietnamese","Bislama","English","French","French","Samoan","English","Arabic","French","English","Afrikaans","Southern Sotho","Tswana","Xhosa","Zulu","English","English","Shona","North Ndebele"]


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
