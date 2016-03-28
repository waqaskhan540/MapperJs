
//Create an object for global Access

var mapper = new Mapper();

QUnit.test("Is mapper loaded?",function(assert){
	assert.notEqual(mapper,undefined,"mapper is not 'undefined'");
});

QUnit.test("function : map() objects with equal properties as arguments",function(assert) {
	
	
	var sourceUser = {
		firstName : "firstname",
		lastName : "lastName",
		age : "17",
		postCode : "1122",
	};

	var destUser = {
		firstName : "",
		lastName : "",
		age : "",
		postCode : "",
	}

	var result = mapper.from(sourceUser).to(destUser).map();
	
	//compare the results
	
	assert.equal(destUser.firstName, sourceUser.firstName);
	assert.equal(destUser.lastName, sourceUser.lastName);
	assert.equal(destUser.age, sourceUser.age);
	assert.equal(destUser.postCode, sourceUser.postCode);
	
});

QUnit.test("function : map() objects with un-equal properties as arguments",function(assert) {
	
	
	var sourceUser = {
		firstName : "firstname",
		lastName : "lastName",
		age : "17",
		postCode : "1122",
		address : "abc",
		phone :"111222"
	};

	var destUser = {
		firstName : "",
		lastName : "",
		age : "",
		postCode : "",
	}

	var result = mapper.from(sourceUser).to(destUser).map();
	
	//compare the results
	
	assert.equal(destUser.firstName, sourceUser.firstName);
	assert.equal(destUser.lastName, sourceUser.lastName);
	assert.equal(destUser.age, sourceUser.age);
	assert.equal(destUser.postCode, sourceUser.postCode);
	
});

QUnit.test("function : mapIndex() objects with equal properties as arguments",function(assert) {
	
	
	var sourceUser = {
		firstName : "firstname",
		lastName : "lastName",
		age : "17",
		postCode : "1122",
	};

	//an object with equal but different property names
	var destUser = {
		FIRSTNAME : "",
		LASTNAME : "",
		AGE : "",
		POSTCODE : "",
	}

	var result = mapper.from(sourceUser).to(destUser).mapIndex();
	
	//compare the results
	
	assert.equal(destUser.FIRSTNAME, sourceUser.firstName);
	assert.equal(destUser.LASTNAME, sourceUser.lastName);
	assert.equal(destUser.AGE, sourceUser.age);
	assert.equal(destUser.POSTCODE, sourceUser.postCode);
	
});

QUnit.test("function : mapIndex() objects with un-equal properties as arguments",function(assert) {
	
	
	var sourceUser = {
		firstName : "firstname",
		lastName : "lastName",
		age : "17",
		postCode : "1122",
		address : "abc",
		phone :"111222"
	};

	//an object with un-equal but different property names
	var destUser = {
		FIRSTNAME : "",
		LASTNAME : "",
		AGE : "",
		POSTCODE : "",
	}

	var result = mapper.from(sourceUser).to(destUser).mapIndex();
	
	//compare the results
	
	assert.equal(destUser.FIRSTNAME, sourceUser.firstName);
	assert.equal(destUser.LASTNAME, sourceUser.lastName);
	assert.equal(destUser.AGE, sourceUser.age);
	assert.equal(destUser.POSTCODE, sourceUser.postCode);
	
});

QUnit.test("function : mapWith() with valid array of properties",function(assert){
	
		var sourceUser = {
			firstName : "firstname",
			lastName : "lastName",
			age : "17",
			postCode : "1122",
			address : "abc",
			phone :"111222"
		};
		
		var destUser = {
			FIRSTNAME : "",
			LASTNAME : "",
			AGE : "",
			POSTCODE : "",
			ADD:"",
			PH:""
		}
		
		var mappings = [
						["firstName","FIRSTNAME"],
						["lastName","LASTNAME"],
						["age","AGE"],
						["postCode","POSTCODE"],
						["address","ADD"],
						["phone","PH"]
					   ];
					   
		destUser = mapper.from(sourceUser).to(destUser).mapUsing(mappings);
		
		assert.equal(destUser.FIRSTNAME, sourceUser.firstName);
		assert.equal(destUser.LASTNAME, sourceUser.lastName);
		assert.equal(destUser.AGE, sourceUser.age);
		assert.equal(destUser.ADD, sourceUser.address);
		assert.equal(destUser.PH, sourceUser.phone);
		assert.equal(destUser.POSTCODE,sourceUser.postCode);
		
		
});

QUnit.test("map() : mapping the form with field names", function(assert){
	
	//fill the form first 
	firstnameVal = "john";
	lastnameVal = "doe";
	document.querySelector("input[name=fname]").value = firstnameVal;
	document.querySelector("input[name=lname]").value = lastnameVal;
	
	var ServerApiModel = {
		FIRSTNAME:"",
		LASTNAME: "",
		AGE:"",
		PASSWORD:"",
		EMAIL:""
	}
	
	var ServerApiModel = mapper.from('.form').to(ServerApiModel).mapIndex();
	
	assert.equal(ServerApiModel.FIRSTNAME , firstnameVal);
	assert.equal(ServerApiModel.LASTNAME , lastnameVal)
	
});