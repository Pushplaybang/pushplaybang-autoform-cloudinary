import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

Template.registerHelper('cloudinaryUrl', (publicId, options) => {
  if (!publicId) return console.error('cloudinaryUrl - no publicId');
  return $.cloudinary.url(publicId, options.hash);
});
