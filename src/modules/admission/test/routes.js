'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Admission = mongoose.model('Admission');

var credentials,
    token,
    mockup;

describe('Admission CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            class: '1',
            prefix: 'เด็กหญิง',
            firstname: 'น้ำหวาน',
            lastname: 'เย็นชื่อใจ',
            identificationnumber: '1322432456768',
            birthday: '12/08/2016',
            sex: 'หญิง',
            fatherfullname: 'สมชาย เย็นชื่อใจ',
            motherfullname: 'สมศรี เย็นชื่อใจ',
            phonenumber: '0948249655'
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Admission get use token', (done) => {
        request(app)
            .get('/api/admissions')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Admission get by id', function (done) {

        request(app)
            .post('/api/admissions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/admissions/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.class, mockup.class);
                        assert.equal(resp.data.prefix, mockup.prefix);
                        assert.equal(resp.data.firstname, mockup.firstname);
                        assert.equal(resp.data.lastname, mockup.lastname);
                        assert.equal(resp.data.identificationnumber, mockup.identificationnumber);
                        assert.equal(resp.data.birthday, mockup.birthday);
                        assert.equal(resp.data.sex, mockup.sex);
                        assert.equal(resp.data.fatherfullname, mockup.fatherfullname);
                        assert.equal(resp.data.motherfullname, mockup.motherfullname);
                        assert.equal(resp.data.phonenumber, mockup.phonenumber);
                        done();
                    });
            });

    });

    it('should be Admission post use token', (done) => {
        request(app)
            .post('/api/admissions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.name, mockup.name);
                done();
            });
    });

    it('should be admission put use token', function (done) {

        request(app)
            .post('/api/admissions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    class: '5',
                    prefix: '5',
                    firstname: '5',
                    lastname: '5',
                    identificationnumber: '5',
                    birthday: '5',
                    sex: '5',
                    fatherfullname: '5',
                    motherfullname: '5',
                    phonenumber: '5'
                }
                request(app)
                    .put('/api/admissions/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.class, update.class);
                        assert.equal(resp.data.prefix, update.prefix);
                        assert.equal(resp.data.firstname, update.firstname);
                        assert.equal(resp.data.lastname, update.lastname);
                        assert.equal(resp.data.identificationnumber, update.identificationnumber);
                        assert.equal(resp.data.birthday, update.birthday);
                        assert.equal(resp.data.sex, update.sex);
                        assert.equal(resp.data.fatherfullname, update.fatherfullname);
                        assert.equal(resp.data.motherfullname, update.motherfullname);
                        assert.equal(resp.data.phonenumber, update.phonenumber);
                        done();
                    });
            });

    });

    it('should be admission delete use token', function (done) {

        request(app)
            .post('/api/admissions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/admissions/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be admission get not use token', (done) => {
        request(app)
            .get('/api/admissions')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be admission post not use token', function (done) {

        request(app)
            .post('/api/admissions')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be admission put not use token', function (done) {

        request(app)
            .post('/api/admissions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/admissions/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be admission delete not use token', function (done) {

        request(app)
            .post('/api/admissions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/admissions/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Admission.remove().exec(done);
    });

});