'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DocumentationSchema = new Schema({
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
  offerLetter: { type: Boolean, default: 0 },
  idProof: { type: Boolean, default: 0 },
  addressProof: { type: Boolean, default: 0 },
  DOBCer: { type: Boolean, default: 0 },
  trainingCer: { type: Boolean, default: 0 },
  salarySlip: { type: Boolean, default: 0 },
  photograph: { type: Boolean, default: 0 },
  qualifiCer: { type: Boolean, default: 0 },
  expLetter: { type: Boolean, default: 0 },
  medical: { type: Boolean, default: 0 },
  bankAccNo: { type: Boolean, default: 0 },
  joiningReport: { type: Boolean, default: 0 },
  codeOfConduct: { type: Boolean, default: 0 },
  empAgreement: { type: Boolean, default: 0 },
  acknowledgeApp: { type: Boolean, default: 0 }
});

module.exports = mongoose.model('Documentation', DocumentationSchema);