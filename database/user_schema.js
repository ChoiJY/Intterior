/**
 * 모듈에 대해 알아보기
 * 
 * UserSchema 객체를 모듈로 만들기
 */


var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var UserSchema = mongoose.Schema({
		id : {type: String, 'default':''},
		email: {type: String, 'default':''},
		name: {type: String, 'default':''},
		furnitures : {type: Array, 'default': [{}]},
		description: {type: String, 'default':''}
    });

	// 스키마에 static 메소드 추가
	UserSchema.static('findById', function(id, callback) {
		return this.find({id:id}, callback);
	});
	
	UserSchema.static('findAll', function(callback) {
		return this.find({}, callback);
	});
	
	UserSchema.static('load', function(options, callback) {
		options.select = options.select || 'name';
	    this.findOne(options.criteria)
	      .select(options.select)
	      .exec(callback);
	});
	
	console.log('UserSchema 정의함.');

	return UserSchema;
};

// module.exports에 UserSchema 객체 직접 할당
module.exports = Schema;

