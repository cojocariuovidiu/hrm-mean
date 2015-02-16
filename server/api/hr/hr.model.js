'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var HrSchema = new Schema({
	//  employeeId: {
	// 	type : String ,
	// 	default: '' ,
	// 	required: 'EmployeeId cannot be blank'
	// },
	employeeId: {
		type: Schema.ObjectId,
		ref: 'Employee',
		required: 'EmployeeId cannot be blank'
	},
	responsiblePerson: {
		type: String,
		default: '',
		//required: 'ResponsiblePerson cannot be blank'
	},
	empInfoSheet: {
		type: Boolean,
		default: 0
	},
	addBook: {
		type: Boolean,
		default: 0
	},
	biometricSystem: {
		type: Boolean,
		default: 0
	},
	MSSTeamUpdated: {
		type: Boolean,
		default: 0
	}
});

module.exports = mongoose.model('Hr', HrSchema);