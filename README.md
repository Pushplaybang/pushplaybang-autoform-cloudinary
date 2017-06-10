# Cloudinary Autoform
This package lets you use Cloudinary with autoform/simpleschema to easily upload images to your Cloudinary account, automatically saving an object with all the images data, and providing a convinient helper for retrieving the image from cloudinary, providing options to the api.

### Features:
* upload to cloudinary
* saves an object
* template helper for retrieving with options
* progress bar & class applied to field wrap while uploading
* cleaned up meteor settings with JSON style namespacing
* uses the latest dependancies

## Usage
using this is tremendously easy, add the package, setup the schema, add it to your form, and retrieve it using our handy helper:

### 1. `meteor add pushplaybang:autoform-cloudinary`

### 2. Set up settings.json file

```json
{
  "cloudinary": {
    "cloud_name": "",
    "api_key": "",
    "api_secret": ""
  },
  "public": {
    "cloudinary": {
      "cloud_name": "",
      "api_key": ""
    },
  },
}
```

### 3. Create collection and attach simple schema

```javascript
Images = new Mongo.Collection('images');

Images.attachSchema(new SimpleSchema({
  image: {
    type: Object,
    blackbox: true, // required
    optional: true, // not required
    autoform: {
      type: 'cloudinary',
      label: false,
      buttonLabel: 'upload avatar',
    },
  }
}));
```

### 4. Create quick form

```html
<template name="imageForm">
  {{> quickForm collection="Images" type="insert" id="add-image"}}
</template>
```

### 5. Retrieve the image

To retrieve the image we provide a global blaze helper that takes two parameters, firstly the `public_id` and a set of options.

```html
  <img src="{{ cloudinaryUrl id
    quality='auto:good'
    format=jpg
    width=240
    height=240
    crop='fill'
    gravity='face'
  }}" alt="avatar">
```

### 6. Run meteor

`meteor --settings settings.json`

## Credit
This started as a hard fork from `cosio55:autoform-cloudinary`, as it only stored the URL, which made it challenging to leverage all of the awesome functionality that cloudinary provides.


### License [MIT](https://opensource.org/licenses/MIT)
Copyright (c) 2017 Paul van Zyl

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
