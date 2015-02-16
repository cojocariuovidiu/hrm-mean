'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RnbdSchema = new Schema({
  employeeId: {
		type : String ,
		default: '' ,
		required: 'EmployeeId cannot be blank'
	},
  responsiblePerson: {
		type : String ,
		default: '' ,
	//	required: 'ResponsiblePerson cannot be blank'
	},
  biddleAccount: { type: Boolean, default: 0 },
  coverLetter: { type: Boolean, default: 0 },
  googleDriveAccess: { type: Boolean, default: 0 } 
});

module.exports = mongoose.model('Rnbd', RnbdSchema);