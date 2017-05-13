/**
 * Created by jychoi on 2017. 5. 10..
 */
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('userdb', server);

// db open
db.open(function (err, db) {
    if(!err){
        console.log('Connected to "users" db');
        db.collection('users', {safe:true}, function (err, collection) {
            if(err){
                console.log('The "users" collection is not exist.');
                userInfoDB();
            }
        })
    }
});

// users collection의 모든 아이템 가져오는 기능
exports.findAll = function (req, res) {
    db.collection('users', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        })
    })
};

/*
exports.findById = function (req, res) {
    res.send({id: req.params.id, name: 'dummyeè'});
};
*/

// 해당 시스템에 user를 추가하는 과정 (db에 write)
exports.addUser = function (req, res) {
    var user = req.body;
    console.log('Add user: ' + JSON.stringify(wine));
    db.collection('users', function (err, collection) {
        collection.insert(user, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            }
            else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

// db schema fb api reference 필요
var userInfoDB = function () {
    var users = [
        {

        }
    ];

}