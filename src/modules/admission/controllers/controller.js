'use strict';
var mongoose = require('mongoose'),
    model = require('../models/model'),
    mq = require('../../core/controllers/rabbitmq'),
    Admission = mongoose.model('Admission'),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash');

exports.getList = function (req, res) {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var query = {};
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    Admission.find({ school: req.user.ref1 }, {}, query, function (err, datas) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: datas
            });
        };
    });
};

exports.create = function (req, res) {
    var newAdmission = new Admission(req.body);
    newAdmission.createby = req.user;
    newAdmission.school = req.user.ref1;
    newAdmission.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
            /**
             * Message Queue
             */
            // mq.publish('exchange', 'keymsg', JSON.stringify(newOrder));
        };
    });
};

exports.getByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            status: 400,
            message: 'Id is invalid'
        });
    }

    Admission.findById(id, function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.data = data ? data : {};
            next();
        };
    });
};

exports.read = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : []
    });
};

exports.update = function (req, res) {
    var updAdmission = _.extend(req.data, req.body);
    updAdmission.updated = new Date();
    updAdmission.updateby = req.user;
    updAdmission.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.delete = function (req, res) {
    req.data.remove(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.webhook = function (req, res) {

    var newAdmission = new Admission({
        class: req.body.queryResult.parameters.classType,
        prefix: req.body.queryResult.parameters.title - name,
        firstname: req.body.queryResult.parameters.studentname.split(' ')[0],
        lastname: req.body.queryResult.parameters.studentname.split(' ')[1],
        identificationnumber: req.body.queryResult.parameters.identificationID,
        birthday: "-",
        sex: req.body.queryResult.parameters.title - name === "เด็กชาย"
            || req.body.queryResult.parameters.title - name === "ด.ช."
            || req.body.queryResult.parameters.title - name === "ด.ช"
            || req.body.queryResult.parameters.title - name === "ดช"
            || req.body.queryResult.parameters.title - name === "นาย"
            ? "ชาย" : "หญิง",
        fatherfullname: req.body.queryResult.parameters.fathername,
        motherfullname: req.body.queryResult.parameters.mothername,
        phonenumber: req.body.queryResult.parameters.tel
    });
    newAdmission.createby = req.user;
    newAdmission.school = req.user.ref1;
    newAdmission.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
            /**
             * Message Queue
             */
            // mq.publish('exchange', 'keymsg', JSON.stringify(newOrder));
        };
    });
};
