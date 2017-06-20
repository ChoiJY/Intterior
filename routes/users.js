
/*
 * 데이터베이스 관련 객체들을 init() 메소드로 설정
 *
 */

var database;
var UserSchema;
var UserModel;



var login = function(req, res) {
    console.log('user 모듈 안에 있는 login 호출됨.');

    // 필요한 경우 req.app.get('database')로 참조 가능
    checkDatabase(req);

    var userInfo = {userId : req.param('id'), userEmail : req.param('email'), userName : req.param('name')};

    if (database) {
        authUser(database, userInfo, function(err, docs) {
            if (err) {throw err;}

            if (docs) {

                console.log(userInfo.userEmail + '은 이미 데이터베이스에 존재함.');
                console.dir(docs);



            } else {
                console.log(userInfo.userEmail + '은 데이터베이스 존재하지 않으므로 새로 계정 추가.');
                adduser(req, res, userInfo);

            }
        });
    } else {
        console.log('데이터베이스 연결 실패');

    }

};

var adduser = function(req, res, userInfo) {
    console.log('user 모듈 안에 있는 adduser 호출됨.');

    // 필요한 경우 req.app.get('database')로 참조 가능
    checkDatabase(req);


    if (database) {
        addUser(database, userInfo, function(err, result) {
            if (err) {throw err;}

            if (result) {
                console.dir(result);
                console.log("사용자 추가 성공")
            } else {
                console.log("사용자 추가 실패")

            }
        });
    } else {
        console.log('데이터베이스 연결 실패');
    }

};

var listuser = function(req, res) {
    console.log('user 모듈 안에 있는 listuser 호출됨.');

    // 필요한 경우 req.app.get('database')로 참조 가능
    checkDatabase(req);


    if (database) {
        // 1. 현재 사용자를 제외한 모든 사용자 검색
        UserModel.find( {id : {$ne: req.param("id")}}, function(err, results) {
            if (err) {
                console.log("listuser에서 에러1");
                return;
            }

            if (results) {
                var userList = [];

                for (var i = 0; i < results.length; i++) {
                    var curId = results[i]._doc.id;
                    var curEmail = results[i]._doc.email;
                    var curName = results[i]._doc.name;
                    var curDescription = results[i]._doc.description;
                    userList.push({'id' : curId, 'email' : curEmail, 'name' : curName, 'description' : curDescription});
                }
                res.json(userList);
            } else {
                console.log("사용자 리스트 조회 실패");
            }
        });
    } else {
        console.log("데이터베이스 연결 실패");
    }

};

var listFriends = function(req, res) {
    console.log('user 모듈 안에 있는 listFriends 호출됨.');
    var friends = JSON.parse(req.param('friends'))
    // 필요한 경우 req.app.get('database')로 참조 가능
    checkDatabase(req);


    if (database) {
        // 1. 현재 사용자를 제외한 모든 사용자 검색
        console.dir(friends);
        UserModel.find( {$or : friends}, function(err, results) {
            if (err) {
                console.log("listFriends에서 에러1");
                return;
            }

            if (results) {
                var userList = [];

                for (var i = 0; i < results.length; i++) {
                    var curId = results[i]._doc.id;
                    var curEmail = results[i]._doc.email;
                    var curName = results[i]._doc.name;
                    var curDescription = results[i]._doc.description;
                    userList.push({'id' : curId, 'email' : curEmail, 'name' : curName, 'description' : curDescription});
                }
                console.dir(userList);
                res.json(userList);
            } else {
                console.log("사용자 리스트 조회 실패");
            }
        });
    } else {
        console.log("데이터베이스 연결 실패");
    }

};


//사용자를 인증하는 함수 : 아이디로 먼저 찾고 비밀번호를 그 다음에 비교하도록 함
var authUser = function(database, userInfo, callback) {
    console.log('authUser 호출됨.');

    // 1. 아이디를 이용해 검색
    UserModel.findById(userInfo.userId, function(err, results) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log('이메일 [%s]로 사용자 검색결과', userInfo.userEmail);
        console.dir(results);

        if (results.length > 0) {
            console.log('이메일과 일치하는 사용자 찾음.');
            callback(null, results);


        } else {
            console.log("이메일과 일치하는 사용자를 찾지 못함.");
            callback(null, null);
        }

    });
}


//사용자를 등록하는 함수
var addUser = function(database, userInfo, callback) {
    console.log('addUser 호출됨.');

    // UserModel 인스턴스 생성
    var user = new UserModel({"id" : userInfo.userId, "email":userInfo.userEmail, "name":userInfo.userName});
    console.log('UserModel 인스턴스 생성됨.');

    // save()로 저장
    user.save(function(err) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log("사용자 데이터 추가함.");
        callback(null, user);

    });
};


//필요한 경우 req.app.get('database')로 참조 가능
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

module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;
module.exports.listFriends = listFriends;


