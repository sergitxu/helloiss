(function () {

  // INFO from Firebase database to HTML

  // Add crew info
  const ISSCrewImage = firebase.database().ref('ISSCrewImage/');
  ISSCrewImage.on('value', function (snapshot) {
    document.getElementById('crewImg').src = snapshot.val().url;
  });

  // Add ISS position info
  const imgMap = firebase.database().ref('currentPosition/');
  imgMap.on('value', function (snapshot) {
    document.getElementById('positionMap').src = snapshot.val().urlMap;
  });

  // Add ISS country info
  const countryMap = firebase.database().ref('currentCountry/');
  countryMap.on('value', function (snapshot) {
    document.getElementById('countryName').innerText = snapshot.val().name;
  });

  // Add song info
  const song = firebase.database().ref('song/');
  song.on('value', function (snapshot) {
    document.getElementById('songName').innerText = snapshot.val().name;
    document.getElementById('songArtist').innerText = snapshot.val().artist;
    document.getElementById('songImage').src = snapshot.val().image;
    document.getElementById('songUrl').href = snapshot.val().url;
  });

  // Add ISS news
  const ISSNews = firebase.database().ref('ISSNews/news/');
  ISSNews.on('value', function (snapshot) {
    for (i = 0; i < snapshot.val().titles.length; i++) {
      document.getElementById('news').innerHTML += `
      <li>
        <a href="${snapshot.val().urls[i]}" target="_blank">
          ${snapshot.val().titles[i]}
          <div><img src="${snapshot.val().images[i]}"></div>
        </a>
      </li>
      `;
    };
  });

  // Get crew info from NASA
  let getCrew = () => {
    const crew = firebase.database().ref('cosmonaut/crew');
    crew.on('value', function (snapshot) {
      const cosmonauts = snapshot.val();
      cosmonauts.forEach(function (value, index) {
        if (value.craft === 'ISS') {
          document.getElementById('crew').innerHTML += `<li>${value.name}</li>`;
        };
      });
    });
  }

  function addZero(number) {
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

      let years = parseInt(totalDays / 365);
      let days = parseInt(totalDays - (years * 365));
      let hours = parseInt(totalHours - (totalDays * 24));
      let mins = parseInt(totalMins - (totalHours * 60));
      let secs = parseInt(totalSecs - (totalMins * 60));

      years = addZero(years);
      days = addZero(days);
      hours = addZero(hours);
      mins = addZero(mins);
      secs = addZero(secs);

      document.getElementById('timeInOrbit').innerText = `
    ${years} years, ${days} days, ${hours} hours, ${mins} min. and ${secs} sec.
    `;

    }, 1000);

  function sayHello() {

    const greetingsTranslations = new Map([
      ['AD', 'Hola'], ['AE', 'السلام عليكم'], ['AF', 'سلام'], ['AG', 'Hello'], ['AI', 'Hello'], ['AL', 'Fâla'], ['AM', 'բարև'], ['AO', 'Olá'], ['AQ', 'Hello'], ['AR', 'Ché, hola'], ['AS', 'Hello'], ['AT', 'Hallo'], ['AU', 'Hello'], ['AW', 'Bon dia'], ['AX', 'Hej'], ['AZ', 'Salam'],
      ['BA', 'Zdravo'], ['BB', 'Hello'], ['BD', 'Hallo'], ['BE', 'Salut'], ['BF', 'Hallo'], ['BG', 'Привет'], ['BH', 'السلام عليكم'], ['BI', 'Salut'], ['BJ', 'Salut'], ['BL', 'Salut'], ['BM', 'Hello'], ['BN', 'Selamat pagi'], ['BO', 'Hola'], ['BQ', 'Hallo'], ['BR', 'Opa'], ['BS', 'Hello'], ['BT', 'སྐུ་གཟུགས་བཟང་པོ།'], ['BV', 'Goddag'], ['BW', 'Dumela'], ['BY', 'Прывітанне'], ['BZ', 'Hello'], ['CA', 'Hello'], ['CC', 'Hello'], ['CD', 'Salut'], ['CF', 'Bara mo'],
      ['CG', 'Salut'], ['CH', 'Salut'], ['CI', 'Salut'], ['CK', 'Hello'], ['CL', 'Hola'], ['CM', 'Salut'], ['CN', '你好'], ['CO', 'Hola'], ['CR', 'Hola'], ['CU', 'Hola'], ['CV', 'Olá'], ['CW', 'Hallo'], ['CX', 'Hello'], ['CY', 'Γειά'], ['CZ', 'Ahoj'], ['DE', 'Hallo'], ['DJ', 'Salut'], ['DK', 'Hej'], ['DM', 'Hello'], ['DO', 'Hola'], ['DZ', 'اسلا عليكم'], ['EC', 'Hola'], ['EE', 'Tere'], ['EG', 'ألسّلام عليكم'], ['EH', 'السلام عليكم'], ['ER', 'ሰላም'], ['ES', 'Hola'], ['ET', 'ሰላም'], ['FI', 'Terve'], ['FJ', 'Hello'], ['FK', 'Hello'], ['FM', 'Hello'], ['FO', 'Hallo'], ['FR', 'Salut'], ['GA', 'Salut'], ['GB', 'Hello'], ['GD', 'Hello'], ['GE', 'გამარჯობა'], ['GF', 'Salut'], ['GG', 'Hello'], ['GH', 'Hello'], ['GI', 'Hello'], ['GL', 'Hej'], ['GM', 'Hello'], ['GN', 'Salut'], ['GP', 'Slut'], ['GQ', 'Hola'], ['GR', 'Γειά'], ['GS', 'Hello'], ['GT', 'Hola'], ['GU', 'Håfa ådai'], ['GW', 'Olá'], ['GY', 'Hello'], ['HK', '你好'], ['HM', 'Hello'], ['HN', 'Hello'], ['HR', 'Hola'], ['HT', 'Bonjou'], ['HU', 'Jó napot kívánok'], ['ID', 'Salam sejahtera'], ['IE', 'Dia dhuit'], ['IL', 'שלום'], ['IM', 'Hello'], ['IN', 'नमस्ते'], ['IO', 'Hello'], ['IQ', 'Hello'], ['IR', 'السلام عليكم'], ['IS', 'Halló'], ['IT', 'Salve'], ['JE', 'Hello'], ['JM', 'Hello'], ['JO', 'السلام عليكم'], ['JP', '今日は'], ['KE', 'Habari'], ['KG', 'Саламатсыңбы'], ['KH', 'ជំរាបសួរ'], ['KI', 'Hello'], ['KM', 'السلام عليكم'], ['KN', 'Hello'], ['KP', '안녕하세요'], ['KR', '안녕하세요'], ['KW', 'السلام عليكم'], ['KY', 'Hello'], ['KZ', 'Сәлем'], ['LA', 'ສະບາຍດີ'], ['LB', 'السلام عليكم'], ['LC', 'Salut'], ['LI', 'Hallo'], ['LK', 'ආයුඛෝවන්'], ['LR', 'Hello'], ['LS', 'Hello'], ['LT', 'Labas'], ['LU', 'Moien'], ['LV', 'Sveiki'], ['LY', 'السلام عليكم'], ['MA', 'اسلا عليكم'], ['MC', 'Salut'], ['MD', 'Bună ziua'], ['ME', 'Здраво'], ['MF', 'Salut'], ['MG', 'Manao ahoana'], ['MH', 'Io̧kwe io̧kwe'], ['MK', 'Здраво'], ['ML', 'I ni ce'], ['MM', 'မဂႆလာပၝ'], ['MN', 'Сайн уу?'], ['MO', '你好'], ['MP', 'Hafa Adai'], ['MQ', 'Salut'], ['MR', 'السلام عليكم'], ['MS', 'Hello'], ['MT', 'Hawn'], ['MU', 'Bonzur'], ['MV', 'Kihineh?'], ['MW', 'Moni'], ['MX', '¿Qué onda?'], ['MY', 'Selamat pagi'], ['MZ', 'Olá'], ['NA', 'Hello'], ['NC', 'Salut'], ['NE', 'Salut'], ['NF', 'Hello'], ['NG', 'Hello'], ['NI', 'Hola'], ['NL', 'Hallo'], ['NO', 'Goddag'], ['NP', 'नमस्ते'], ['NR', 'Ekamowir omo'], ['NU', 'Fakaalofa atu'], ['NZ', 'Kia ora'], ['OM', 'السلام عليكم'], ['PA', 'Hola'], ['PE', 'Hola'], ['PF', 'Salut'], ['PG', 'Gude'], ['PH', 'Musta'], ['PK', 'السلام علیکم'], ['PL', 'Cześć'], ['PM', 'Salut'], ['PN', 'Hello'], ['PR', 'Hola'], ['PS', 'السلام عليكم'], ['PT', 'Olá'], ['PW', 'Alii'], ['PY', 'Hola'], ['QA', 'السلام عليكم'], ['RE', 'Salut'], ['RO', 'Alo'], ['RS', 'Молим'], ['RU', 'Алло'], ['RW', 'Salut'], ['SA', 'السلام عليكم'], ['SB', 'Hello'], ['SC', 'Salut'], ['SD', 'السلام عليكم'], ['SE', 'Hej'], ['SG', '你好'], ['SH', 'Hello'], ['SI', 'Pozdravljeni'], ['SJ', 'Goddag'], ['SK', 'Dobry den'], ['SL', 'Hello'], ['SM', 'Ciao'], ['SN', 'Salut'], ['SO', 'Salaam alaykum'], ['SR', 'Hallo'], ['ST', 'Aló'], ['SS', 'Hello'], ['SV', 'Hola'], ['SX', 'Hallo'], ['SY', 'السلام عليكم'], ['SZ', 'Sawubona'], ['TC', 'Hello'], ['TD', 'Salut'], ['TF', 'Salut'], ['TG', 'Salut'], ['TH', 'สวัสดี'], ['TJ', 'Ассалому алейкум '], ['TK', 'Tālofa'], ['TL', 'Elo'], ['TM', 'Salam'], ['TN', 'السلام عليكم'], ['TO', 'Hello'], ['TR', 'Merhaba'], ['TT', 'Hello'], ['TV', 'Hello'], ['TW', '你好'], ['TZ', 'Habari'], ['UA', 'Агов'], ['UG', 'Habari'], ['UM', 'Hello'], ['US', 'Hello'], ['UY', 'Hola'], ['UZ', 'Salom'], ['VA', 'Salve'], ['VC', 'Hello'], ['VE', 'Hola'], ['VG', 'Hello'], ['VI', 'Hello'], ['VN', 'Chào anh'], ['VU', 'Halo'], ['WF', 'Salut'], ['WS', 'Malō'], ['YE', 'السلام عليكم'], ['YT', 'Salut'], ['ZA', 'Haai'], ['ZM', 'Hello'], ['ZW', 'Mhoro']
    ]);

    // get the country code for current position
    const countryCode = firebase.database().ref('currentCountry/');
    countryCode.on('value', function (snapshot) {
      IDcountry = snapshot.val().code;
      Namecountry = snapshot.val().name;
      Toponym = snapshot.val().toponym;
      // map the greeting asociated to the country
      greeting = greetingsTranslations.get(IDcountry);
      if (!greeting) {
        // country by default EN
        greeting = greetingsTranslations.get('EN');
      }
      document.getElementById('greetingsFromEarth').innerText = `${greeting} from ${Toponym} (${Namecountry}), ISS`;

    });
  }

  let getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        // getISSPass(`http://api.open-notify.org/iss-pass.json?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
        console.log(`https://www.heavens-above.com/PassSummary.aspx?satid=25544&lat=${position.coords.latitude}&lng=${position.coords.longitude}&alt=${position.coords.altitude}&tz=CET`)
      });

    } else {
      console.warn("Your browser does not support geolocalization :(");
    }
  }

  // get localization from user and calculate next ISS passes
  // TODO: FIX in Firebase:
  // Mixed Content: The page at 'https://hello-iss.firebaseapp.com/' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://api.open-notify.org/iss-pass.json?lat=40.600747000000005&lon=-3.7071277'. This request has been blocked; the content must be served over HTTPS.
  let getISSPass = url => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {

      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        let ISSView = JSON.parse(xmlHttp.responseText);

        // Successful response?
        if (ISSView.message === 'success') {

          let duration = '';
          let risetime = '';

          for (i = 0; i < ISSView.request.passes; i++) {

            duration = ISSView.response[i].duration;
            risetime = ISSView.response[i].risetime;

            var risetimeDate = new Date();
            risetimeDate.setTime(risetime * 1000);
            // risetimeDate = risetimeDate.toUTCString();

            document.getElementById('ISSPasses').innerHTML += `
            <li>
              Duration: ${duration} secs
              <br>
              Risetime: ${risetimeDate}
            </li>
          `;
          };
        }
        else {
          console.log('No connexion');
        }

      } else if (xmlHttp.readyState === 4 && xmlHttp.status === 404) {
        console.error("ERROR! 404");
        console.info(JSON.parse(xmlHttp.responseText));
      }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
  }

  function init() {
    getCrew();
    sayHello();
    getLocation()
  }

  init();

})();
