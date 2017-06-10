/* eslint-disable */
var cloudinary = Npm.require('cloudinary');

Meteor.methods({
  afCloudinarySign: function (params) {
    check(params, Match.Optional(Object));

    params = params || {};
    params.timestamp = (new Date).getTime();

    return cloudinary.utils.sign_request(params, {
      api_key: apiKey(),
      api_secret: apiSecret()
    });
  },
});

apiKey = function () {
  if (! Meteor.settings ||
      ! Meteor.settings.public ||
      ! Meteor.settings.public.cloudinary.api_key) {
    throw new Error('Meteor.settings.public.cloudinary.api_key is undefined');
  }

  return Meteor.settings.public.cloudinary.api_key;
};

apiSecret = function () {
  if (! Meteor.settings ||
      ! Meteor.settings.cloudinary.api_secret) {
    throw new Error('Meteor.settings.cloudinary.api_secret is undefined');
  }

  return Meteor.settings.cloudinary.api_secret;
};
