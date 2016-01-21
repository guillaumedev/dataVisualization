"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serieSchema = new Schema({
    title: String,
    begin: String,
    end: String,
    genres: [{
        name: String
    }],
    note: Number,
    resume: String,
    imageSrc: String
});
module.exports = mongoose.model('serie',serieSchema);