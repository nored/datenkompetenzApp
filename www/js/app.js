var $$ = Dom7;

var app = new Framework7({
  root: '#app', // App root element

  id: 'de.thBrandenburg.datenkompetenz', // App bundle ID
  name: 'Datenkompetenz 4.0', // App name
  theme: 'auto', // Automatic theme detection

  // App root data
  data: function () {
    return {};
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
        if (app.views.main.router.currentRoute.path == '/offline/') {
          app.views.main.router.navigate('/', {
            reloadCurrent: true,
            reloadAll: true,
          });
        }
      } else {
        app.views.main.router.navigate('/offline/', { reloadCurrent: true });
      }
    },
  },
});

$$('#initial-form-send').on('click', function () {
  alert('click');
  if (app.input.validateInputs('#initial-form')) {
    var formData = app.form.convertToData('#initial-form');
    formData.mobile = 'true';
    formData.ds = 'on';
    alert(JSON.stringify(formData));
  }
});

function handleOpenURL(url) {
  var strValue = url;
  strValue = strValue.replace('thbdatenkompetenz:/', '');
  if (strValue == '/form/') {
    setTimeout(function () {
      app.views.main.router.navigate('/form/', { reloadCurrent: true });
    }, 200);
  }
}
