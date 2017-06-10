/* eslint-disable */
var _AfCloudinaryBroker = new ReactiveVar();

AutoForm.addInputType('cloudinary', {
  template: 'afCloudinary',
  valueOut() {
    return _AfCloudinaryBroker.get();
  },
});

Meteor.startup(function () {
    $.cloudinary.config({
      cloud_name: Meteor.settings.public.cloudinary.cloud_name,
      api_key: Meteor.settings.public.cloudinary.api_key,
    });
});

var templates = ['afCloudinary', 'afCloudinary_bootstrap3'];

_.each(templates, function (tmpl) {
  Template[tmpl].onCreated(function () {
    var self = this;

    self.uploadData = new ReactiveVar();
    self.uploading = new ReactiveVar(false);

    self.initialValueChecked = false;
    self.checkInitialValue = function () {
      Tracker.nonreactive(function () {
        const url = self.uploadData.get() ? self.uploadData.get().secure_url : '';
        if (!self.initialValueChecked && !url && self.data.value) {
          self.uploadData.set(self.data.value);
          self.initialValueChecked = true;
        }
      });
    };

    self.setOutput = function () {
      Tracker.nonreactive(function () {
        _AfCloudinaryBroker.set(self.uploadData.get());
      });
    };
  });

  Template[tmpl].onRendered(function () {
    var self = this;

    Meteor.call('afCloudinarySign', function (err, res) {
      if (err) {
        return console.log(err);
      }

      self.$('input[name=file]').cloudinary_fileupload({
        formData: res
      });
    });

    self.$('input[name=file]').on('fileuploadsend', function (e, data) {
      self.uploading.set(true);
    });

    self.$('input[name=file]').bind('fileuploadprogress', (e, data) => {
      requestAnimationFrame(() => {
        $('.uploadprogress')
          .css('width', Math.round((data.loaded * 100.0)/data.total)+'%');
      });
    });

    self.$('input[name=file]').on('fileuploaddone', (e, data) => {
      self.uploading.set(false);
      self.uploadData.set(data.result);
      self.setOutput();
      Tracker.flush();
    });

    self.$(self.firstNode).closest('form').on('reset', function () {
      self.uploading.set(false);
      self.uploadData.set(null);
      self.setOutput();
    });
  });

  Template[tmpl].helpers({
    props() {
      var template = Template.instance();

      template.checkInitialValue();
      return {
        url: template.uploadData.get() ? template.uploadData.get().secure_url : '',
        id: template.uploadData.get() ? template.uploadData.get().public_id : '',
        uploadingClass: template.uploading.get() ? 'uploading' : '',
        accept: this.atts.accept || 'image/*',
        buttonLabel: this.atts.buttonLabel || 'upload',
      };
    },
  });

  Template[tmpl].events({
    'click button'(error, template) {
      template.$('input[name=file]').click();
    },

    'click .js-remove'(error, template) {
      error.preventDefault();
      template.uploadData.set(null);
      template.setOutput();
    }
  });
});
