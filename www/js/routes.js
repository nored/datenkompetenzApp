var routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/impressum/',
    url: './pages/impressum.html',
  },
  {
    path: '/privacy/',
    url: './pages/privacy.html',
  },
  {
    path: '/upload-form/',
    componentUrl: './pages/upload.html',
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
