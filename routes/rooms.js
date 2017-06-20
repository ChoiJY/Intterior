/**
 * Created by chan on 2017. 6. 5..
 */

var database;
var UserSchema;
var UserModel;

var createRoom = function(req, res){
    checkDatabase(req);
};

var getAssets = function (req, res) {
    var userId = req.param("id");
    console.log("rooms의 getAssets이 호출됨.");

    checkDatabase(req);
    UserModel.find({"id" : userId}, function(err, results){
        if(err){
            callback(err, null);
            return;
        }


        console.log(userId + "사용자의 Asset을 데이터베이스에서 가져옴.");
        console.dir(results);
        console.log(JSON.stringify(results));
        console.log("results[0].furnitures 출력 끝.")

        res.json(results[0]._doc.furnitures);
    })
};

var setAssets = function(req, res){
    var userId = req.param("id");
    var newFurnitures = JSON.parse(req.param("furnitures"));
    console.log("아이디 : " + userId);

    console.log(newFurnitures);

    checkDatabase(req);

    UserModel.update({id : userId}, {$set: { furnitures : newFurnitures}}, function(err, affected){
        console.log('affected: ', affected);
    })
};


var checkDatabase = function(req) {
    if (!database) {
        console.log('user 모듈에서 데이터베이스 객체를 참조합니다.');

        database = req.app.get('database');
        UserSchema = req.app.get('UserSchema');
        UserModel = req.app.get('UserModel');
    } else {
        console.log('user 모듈에서 데이터베이스 객체를 이미 참조했습니다.');
    }
}


module.exports.createRoom = createRoom;
module.exports.getAssets = getAssets;
module.exports.setAssets = setAssets;
