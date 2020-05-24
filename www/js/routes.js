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
    path: '/offline/',
    url: './pages/offline.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
