process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

const db = require("../db/database.js");

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    describe('GET /', () => {
        it('200 Index page', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.msg.should.be.a("string");
                    // res.body.data.msg.should.equal("Vem är jag? Ingen vet.");

                    done();
                });
        });
    });

    describe('GET /reports/week/1', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.should.have.all.keys("id", "report", "title");
                    res.body.name.should.be.a("string");
                    res.body.name.should.equal("Kursmoment 1");

                    done();
                });
        });
    });

    // describe('GET /reports/edit/1', () => {
    //     it('200 HAPPY PATH', (done) => {
    //         chai.request(server)
    //             .get("/reports/edit/1")
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.an("object");
    //                 res.body.data.should.be.an("object");
    //                 res.body.data.should.have.all.keys("id", "report", "title");
    //                 res.body.name.should.be.a("string");
    //                 res.body.name.should.equal("Kursmoment 1");
    //
    //                 done();
    //             });
    //     });
    // });


    describe('GET /reports/weeks', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/weeks")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data[1].should.have.all.keys("id", "title");

                    done();
                });
        });
    });
});

describe('Account', () => {
    describe('POST /register', () => {
        it('Register form', (done) => {
            chai.request(server)
                .post("/register")
                .type("form")
                .send({
                    "_method": "post",
                    "name": "My Name",
                    "year": 2003,
                    "month": "July",
                    "day": 2,
                    "email": "My@Name.se",
                    "password": "MyName"
                })
                .end((err, res) => {
                    res.should.have.status(201);

                    done();
                });
        });
    });

    var token;

    describe('POST /login', () => {
        it('Login form', (done) => {
            chai.request(server)
                .post("/login")
                .type("form")
                .send({
                    "_method": "post",
                    "email": "My@Name.se",
                    "password": "MyName"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.token.should.be.a("string");
                    token = res.body.token;

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('Login wrong email', (done) => {
            chai.request(server)
                .post("/login")
                .type("form")
                .send({
                    "_method": "post",
                    "email": "My@Name.com",
                    "password": "MyName"
                })
                .end((err, res) => {
                    // res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.msg.should.equal("Kunde inte logga in. Försök igen.");

                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('Login wrong password', (done) => {
            chai.request(server)
                .post("/login")
                .type("form")
                .send({
                    "_method": "post",
                    "email": "My@Name.se",
                    "password": "Wrong"
                })
                .end((err, res) => {
                    // res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.msg.should.equal("Kunde inte logga in. Försök igen.");

                    done();
                });
        });
    });

    // describe('POST /reports', () => {
    //     it('Add report', (done) => {
    //         chai.request(server)
    //             .post("/reports")
    //             .type("form")
    //             .send({
    //                 "_method": "post",
    //                 "_headers": {"x-access-token": token},
    //                 "title": "New text",
    //                 "text": "My Name"
    //             })
    //             .end((err, res) => {
    //                 res.should.have.status(201);
    //                 // res.body.should.be.an("object");
    //                 // res.body.msg.should.equal("Kunde inte logga in. Försök igen.");
    //
    //                 done();
    //             });
    //     });
    // });
});
