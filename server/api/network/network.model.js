'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NetworkSchema = new Schema({
 employeeId: {
		type : String ,
		default: '' ,
		required: 'EmployeeId cannot be blank'
	},
  responsiblePerson: {
		type : String ,
		default: '' ,
		//required: 'ResponsiblePerson cannot be blank'
	},
  firewallIp: { type: Boolean, default: 0 },
  gmailId: { type: Boolean, default: 0 },
  skypeId: { type: Boolean, default: 0 },
  redmine: { type: Boolean, default: 0 },
  bitBucket: { type: Boolean, default: 0 },
  git: { type: Boolean, default: 0 },
  dropbox: { type: Boolean, default: 0 },
  localDBUser: { type: Boolean, default: 0 },
  localFTP: { type: Boolean, default: 0 }
});

module.exports = mongoose.model('Network', NetworkSchema);