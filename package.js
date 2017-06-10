Package.describe({
  name: 'pushplaybang:autoform-cloudinary',
  git: 'https://github.com/Pushplaybang/pushplaybang-autoform-cloudinary',
  summary: 'Autoform cloudinary upload',
  version: '0.0.6',
});

Package.onUse(function(api) {
  Npm.depends({
    cloudinary: '1.2.1',
  });

  api.versionsFrom('1.1.0.2');
  api.use([
    'standard-minifier-js@2.1.0',
    'es5-shim@4.6.15',
    'ecmascript@0.8.0',
  ], ['client', 'server']);

  api.use([
    'templating',
    'reactive-var',
    'underscore',
    'jquery',
    'nekojira:cloudinary-jquery-upload@0.1.0',
    'aldeed:autoform@6.0.0',
  ], 'client');

  api.addFiles([
    'autoform-cloudinary.html',
    'autoform-cloudinary.css',
    'templateHelpers.js',
    'autoform-cloudinary.js',
  ], 'client');

  api.addFiles([
    'autoform-cloudinary-server.js',
  ], 'server');
});
