# MapperJs
A lightweight javascript library for mapping javascript objects

**MapperJs** allows you to map javascript objects instantly. You can map objects based on property names or indexes. 
It takes a ‘source’ object and ‘target’ object and maps the values from source to target object.

## Example usage

####Mapping similar objects
Suppose we have two objects with same property names and we wish to populate our target object with the same values as of our source object; then we can achieve this using **MapperJs** using the following approach:

```javascript
var mapper = new Mapper();
var sourceUser = {
		firstName : "john",
		lastName : "doe",
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


```
####Mapping objects having partially similar properties
If the source and target objects have partially similar properties then **MapperJs** can still map the target object by matching only the properties which exist in source object. See the example below:

```javascript
var mapper = new Mapper();
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

```

####Mapping input forms to API Models without caring about form field names
Posting form data to a web server requires the form field names to be exact replicas of your API Models or Parameters. With MapperJs you can make the process a lot easier by creating a javascript object of your API Model in the same order as your form fields and then mapping the form with your API Model.
The **from**  method also takes a **CSS Selector** to the form and then creates an object of the form and then maps it to the target object.
Suppose we have an html form like below:

```html
<form class="form">

First Name:<input type="text" name="fname">
Last Name: <input type="text" name="lname">
Age : <input type="text" name="age">

Email : <input type="text" name="email">
Password :<input type="password" name="password">

</form>

```

While our web server expects a model with field names 

-	FirstName
-	LastName
-	Age
-	Email
-	Password

With **MapperJs**  we can achieve this in the following way.
Create a javascript representation of your API Model with order similar to the input fields defined in the form.

```javascript
var ServerApiModel = {
	FirstName:"",
		LastName: "",
		Age:"",
		Email:"",
		Password:""
	};

	var mapper = new Mapper();
	var ServerApiModel = mapper.from('.form').to(ServerApiModel).mapIndex();
```
As you can see, we have passed the **‘.form’** selector of our input form as a source and mapped it to our empty ServerApiModel. Now, ServerApiModel contains values from the input Form in the same order the fields are defined.

####Mapping objects based on their property indexes
If you don’t want to care about the names of the properties but are quite sure that you need the target object be populated with values in exactly the same order as your source object then **mapIndex()** method does this job for you . The property of source object at index ‘0’ will be mapped with ( or its value will be assigned to) the property of target object at index ‘0’ no matter what the name of property is. See the example below:

```javascript
var mapper = new Mapper();

	var sourceUser = {
		firstName : "firstname",
		lastName : "lastName",
		age : "17",
		postCode : "1122",
	};

	//an object with equal but different property names
	var destUser = {
		fname : "",
		lname : "",
		age : "",
		postcode : "",
	}

	var result = mapper.from(sourceUser).to(destUser).mapIndex();

```

>**The number of properties in ‘source’ and ‘target’ object don't necessarily need to be same.**

#### Mapping Objects based on property names
The **mapUsing()** method expects a 2-dimensional array of mappings, each element in the array is also an array with two entries i.e. (i) source property name , (ii) target property name.

```javascript
Var mapper = new Mapper();
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

```

####Mapping selective properties of two objects
If you don’t want the whole source object to be mapped with your target object but rather want to map only a few properties which are common in both the objects then you can use another method **mapOnly()** to achieve this. 
This method takes an array of properties which are common in source and target object that you want to be mapped only.

```javascript
var mapper = new Mapper();

var sourceObj = {
	Item-name : ‘Abc123’,
	Item-desc:’a few lines as description’,
	Item-price : ‘$300.0’
};

var destObj = {
	Item-name :””,
	Item-price : “”,
	URL: “”,
};

var result = mapper.from(sourceObj).to(destObj).mapOnly([‘Item-name’,’Item-price’]);

```
The resulting object will only contain the values of properties given as array to the **mapOnly()** method.