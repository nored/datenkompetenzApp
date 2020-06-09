var $$ = Dom7;

const baseUrl = 'https://upload.antidote.enterprises';

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
