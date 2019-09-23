'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AdmissionSchema = new Schema({
    class: {
        type: String,
        required: 'Please fill a Admissions class',
    },
    prefix: {
        type: String,
        required: 'Please fill a Admissions prefix',
    },
    firstname: {
        type: String,
        required: 'Please fill a Admissions firstname',
    },
    lastname: {
        type: String,
        required: 'Please fill a Admissions lastname',
    },
    nickname: {
        type: String,
        required: 'Please fill a Admissions nickname',
    },
    identificationnumber: {
        type: String,
        required: 'Please fill a Admissions identificationnumber',
    },
    birthday: {
        type: String,
        required: 'Please fill a Admissions birthday',
    },
    sex: {
        type: String,
        required: 'Please fill a Admissions sex',
    },
    fatherfullname: {
        type: String,
        required: 'Please fill a Admissions fatherfullname',
    },
    motherfullname: {
        type: String,
        required: 'Please fill a Admissions motherfullname',
    },
    phonenumber: {
        type: String,
        required: 'Please fill a Admissions phonenumber',
    },
    school:{
        type: String,
        required: 'Please fill a Admissions school',
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Admission", AdmissionSchema);