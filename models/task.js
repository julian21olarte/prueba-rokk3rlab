'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = Schema({
  name: {type: String, required: true},
  dueDate: { type: Date, required: true },
  priority: { type: Number, min: 1, max:15, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);