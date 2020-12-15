var $$ = Dom7;
let quizCnt = 0;
let score = 0;
let interval;
const baseUrl = 'https://dc4aww.th-brandenburg.de';
var app = new Framework7({
  root: '#app', // App root element

  id: 'de.thBrandenburg.datenkompetenz', // App bundle ID
  name: 'Datenkompetenz 4.0', // App name
  theme: 'auto', // Automatic theme detection

  // App root data
  data: function () {
    return {
      id: '',
    };
  },
  // App root methods
  methods: {},
  // App routes
  routes: routes,

  // Input settings
  input: {
    scrollIntoViewOnFocus:
      Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered:
      Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
    connection: function (isOnline) {
      if (isOnline) {
        app.popup.close('#offline-popup', true);
      } else {
        app.popup.open('#offline-popup', true);
      }
    },
  },
});

$$('#initial-form-send').on('click', function () {
  if (app.input.validateInputs('#initial-form')) {
    var formData = app.form.convertToData('#initial-form');
    formData.mobile = 'true';
    formData.ds = 'on';
    app.request.promise.post(baseUrl + '/register', formData).then(function () {
      app.popup.open('#success-popup', true);
    });
  }
});

var quiz = [{
  "question": "Jede Variable eines Datensatzes wird einem bestimmten Datentyp zugeordnet. Finden Sie in den gegebenen Antworten <b>einen Datentyp</b>, den ein Datensatz annehmen kann.",
  "choices": ["Neun", "Tabellen", "Buchstaben", "Zeichen"],
  "title": "Frage 1 von 6",
  "correct": "Zeichen",
  "answer": "Die gesuchte Lösung lautet: <b>Zeichen</b>"
}, {
  "question": "Auch in diesen Antworten hat sich wieder <b>ein Datentyp</b> versteckt. Wählen Sie aus!",
  "choices": ["Komma", "Zahlen", "Semikolon", "Werte"],
  "title": "Frage 2 von 6",
  "correct": "Zahlen",
  "answer": "Die gesuchte Lösung lautet: <b>Zahlen</b>"
}, {
  "question": "Oft liegen Daten nicht in der gewünschten oder geforderten Qualität vor. Anhand von Kriterien lässt sich die Datenqualität prüfen und verbessern.<br>Finden Sie in den unten stehenden Antworten <b>ein Kriterium</b>, das für die Qualitätsprüfung herangezogen wird.",
  "choices": ["Wissenschaftlichkeit", "Aktualität", "Rechtssicherheit", "Achtsamkeit"],
  "title": "Frage 3 von 6",
  "correct": "Aktualität",
  "answer": "Die gesuchte Lösung lautet: <b>Aktualität</b>"
}, {
  "question": "Bestimmen Sie hier noch <b>ein weiteres Kriterium</b>, anhand dessen die Qualität von Daten geprüft werden kann:",
  "choices": ["Beeinflussbarkeit", "Gültigkeit", "Unfähigkeit", "Vereinbarkeit"],
  "title": "Frage 4 von 6",
  "correct": "Gültigkeit",
  "answer": "Die gesuchte Lösung lautet: <b>Gültigkeit</b>"
}, {
  "question": "Darüber hinaus sollen Daten auf weitere Kriterien hin überprüft werden. Wählen Sie aus den Vorschlägen <b>ein Kriterium</b> aus:",
  "choices": ["Dopplungen", "Zweckmäßigkeit", "Farblosigkeit", "Logik"],
  "title": "Frage 5 von 6",
  "correct": "Dopplungen",
  "answer": "Die gesuchte Lösung lautet: <b>Dopplungen</b>"
}, {
  "question": "<b>Wie viele</b> offensichtliche Fehler finden Sie in der Tabelle:",
  "img": '<div class="responsive" id="quiz-img"> <img style="min-width: 85vw;" src="./assets/logo/3.png" class="responsive-img"/></div>',
  "choices": ["2 Fehler", "4 Fehler", "6 Fehler", "8 Fehler"],
  "title": "Frage 6 von 6",
  "correct": "4 Fehler",
  "answer": "Die gesuchte Lösung lautet: <b>4 Fehler</b>"
}];

var ans = {
  "good": "Herzlichen Glückwunsch!<br><br>Sie haben alle Fragen sofort richtig beantwortet. Mit Daten und Datenqualität kennen Sie sich schon sehr gut aus. Aber warum tauchen Sie nicht tiefer in diese wichtige Thematik ein und beschäftigen sich noch intensiver damit?",
  "neutral": "Sehr gut!<br><br>Sie haben die meisten Fragen richtig beantwortet.<br><br>Unternehmerische Entscheidungen werden zunehmend noch mehr auf Basis von analysierten Daten getroffen. Die Ergebnisse der Datenanalyse wiederum sind abhängig von einer soliden Datenqualität. Warum beschäftigen Sie sich nicht intensiver mit dem Komplex Datenqualität im Rahmen einer berufsbegleitenden Weiterbildung?",
  "bad": "Geschafft, auch wenn es nicht so leicht war!<br><br>Da zunehmend noch mehr unternehmerische Entscheidungen auf Daten und deren Analyse basieren werden, kann niemand mehr den Themenbereichen Datenqualität, Datenkompetenz und Datenanalyse aus dem Wege gehen.<br>Selbst wenn nicht jeder der Experte oder die Expertin sein muss. In jedem Unternehmen sollte es eine Person mit dem entsprechenden Know How zur Datenkompetenz geben. Nutzen Sie Weiterbildungsangebote für sich oder Ihre Mitarbeitenden!"
};

function shuffle(array) {
  var temporaryValue, randomIndex;
  var currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex > 1) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

$$('#start-quiz').on('click', function () {
  quizCnt = 0;
  score = 0;
  if (document.contains(document.getElementById("quiz-img"))) {
    document.getElementById("quiz-img").remove();
  }
  let q = quiz[quizCnt];
  initiateQuiz(q, true);
  app.popup.open('#quiz-popup', true);
});

$$('#quiz-send').on('click', function () {
  var formData = app.form.convertToData('#quiz-form');
  
  if (formData.answer == quiz[quizCnt].correct) {
    quizCnt+=1;
    if (quizCnt < 6) {
      initiateQuiz(quiz[quizCnt], true)
    } else {
      app.popup.close('#quiz-popup', true);
      app.popup.open('#quiz-eval-popup', true);
      console.log("F Sore: " + score);
      let scoreText = document.getElementById('score')
      scoreText.innerHTML = "Punktestand: " + score;
      if (score == 6) {
        let scoreText = document.getElementById('result').innerHTML = ans.good;
      } else if(score >= 3) {
        let scoreText = document.getElementById('result').innerHTML = ans.neutral;
      } else {
        let scoreText = document.getElementById('result').innerHTML = ans.bad;
      }
    }
  } else{
    initiateQuiz(quiz[quizCnt], false);
  } 
});

$$('#finish-quiz').on('click', function () {
  app.popup.close('#quiz-popup', true);
  app.popup.close('#quiz-eval-popup', true);
  score = 0;
});

function initiateQuiz(q, b) {
  if (quizCnt < 6) {
    if (b) {
      console.log("1 Sore: " + score);
      score+=1;
      display = document.querySelector('#time-1');
      display.style['color'] = 'white';
      display.style['font-weight'] = 'normal';
      let choices = shuffle(q.choices)
      let title = document.getElementById('quiz-title').innerHTML = q.title;
      let question = document.getElementById('question')
      question.innerHTML = q.question;
      if (q.img != undefined) {
        question.insertAdjacentHTML('afterend', q.img);
      }
      let answer0Value = document.getElementById('radio-0')
      answer0Value.value = choices[0];
      answer0Value.disabled = false;
      document.getElementById('label-0').style.color = "unset";
      let answer0Title = document.getElementById('title-radio-0').innerHTML = choices[0];
      let answer1Value = document.getElementById('radio-1')
      answer1Value.value = choices[1];
      answer1Value.disabled = false;
      document.getElementById('label-1').style.color = "unset";
      let answer1Title = document.getElementById('title-radio-1').innerHTML = choices[1];
      let answer2Value = document.getElementById('radio-2')
      answer2Value.value = choices[2];
      answer2Value.disabled = false;
      document.getElementById('label-2').style.color = "unset";
      let answer2Title = document.getElementById('title-radio-2').innerHTML = choices[2];
      let answer3Value = document.getElementById('radio-3')
      answer3Value.value = choices[3];
      answer3Value.disabled = false;
      document.getElementById('label-3').style.color = "unset";
      let answer3Title = document.getElementById('title-radio-3').innerHTML = choices[3];
      startTimer(30, display);
    } 
    if (!b) {
      score-=1;
      console.log("2 Sore: " + score);
      let i = -1;
      for (let index = 0; index < q.choices.length; index++) {
        if (q.choices[index] == q.correct) {
          i = index;
        }
      }
      let answer0 = document.getElementById('radio-0')
      answer0.disabled = true;
      document.getElementById('label-0').style.color = "#ff3b30";
      let answer1 = document.getElementById('radio-1')
      answer1.disabled = true;
      document.getElementById('label-1').style.color = "#ff3b30";
      let answer2 = document.getElementById('radio-2')
      answer2.disabled = true;
      document.getElementById('label-2').style.color = "#ff3b30";
      let answer3 = document.getElementById('radio-3')
      answer3.disabled = true;
      document.getElementById('label-3').style.color = "#ff3b30";
      let correctAnswer = document.getElementById('radio-' + i)
      let correctLabel = document.getElementById('label-' + i).style.color = "green";
      correctAnswer.checked = true;
      display = document.querySelector('#time-1');
      display.style['color'] = 'white';
      display.style['font-weight'] = 'normal';
      let title = document.getElementById('quiz-title').innerHTML = q.title;
      let question = document.getElementById('question')
      question.innerHTML = q.answer;
    }
  }
}

function startTimer(duration, display) {
  if (interval != undefined) {
    clearInterval(interval);
  }
  var timer = duration, minutes, seconds;
  interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 10) {
          // color timer red if 10 sec left
          display.style['color'] = 'red';
          display.style['font-weight'] = 'bold';
          if (timer < 0) {
            // Trigger timer end
            clearInterval(interval);
            initiateQuiz(quiz[quizCnt], false)
          }
      }
  }, 1000);
}

function handleOpenURL(url) {
  var strValue = url;
  let id = strValue.replace('thbdatenkompetenz://', '');
  app.request.promise.json(baseUrl + '/show/email/' + id).then(function (res) {
    app.popup.close('#success-popup', true);
    app.views.main.router.navigate(
      '/upload-form/?email=' +
        res.data.email +
        '&action=' +
        baseUrl +
        '/upload',
      {
        reloadCurrent: true,
      }
    );
  });
}

app.on('formAjaxComplete', function (formEl, data, xhr) {
  app.views.main.router.navigate('/', {
    reloadCurrent: true,
  });
  app.popup.open('#final-success-popup', true);
});

var swiper = app.swiper.create('.swiper-container', {
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

