'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
  name: {
		type : String ,
		default: '' ,
		required: 'EmployeeName cannot be blank'
	},
  id:{
		type : String ,
		default: '' ,
		required: 'EmployeeId cannot be blank'
	},
  //status:{
  //		type : Boolean,
  	//	default : '0'
	//}
 //  hr:{
 //  		type:Schema.ObjectId,
 //  		ref:'Hr'

	// },
 // //  documentation:{
 //  		type:
 //  		ref:

	// },
 //  rnbd:{
 //  		type:
 //  		ref:

	// },
 //  network:{
 //  		type:
 //  		ref:
	// }
});

module.exports = mongoose.model('Employee', EmployeeSchema);