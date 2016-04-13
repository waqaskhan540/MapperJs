/*
Author: Muhammad Waqas

*/
(function() {
	
	if(typeof Mapper === 'undefined') {
	
		this.Mapper = {
			
			from : function(source) {
	
			try{
		
				if(typeof source === 'object'){

					this.sourceObject = source;
					var props = Object.getOwnPropertyNames(source);
				
				if(!props.length || typeof props !== 'object')
					throw new Error("object passed has no properties associated")
					
					this.sourceProperties = props;
					return this;
				}else if(typeof source === 'string') {
					
					var form = document.querySelector(source);
					if(form.tagName === "FORM"){
					var elements = form.elements,
						length = elements.length,
						formObj = {};
					
					for(var i =0;i<length;i++) {
						
						var fieldName = elements[i].getAttribute('name'),
							value = elements[i].value;
						formObj[fieldName] = value;
					}
					
					this.sourceObject = formObj;
					var props = Object.getOwnPropertyNames(formObj);
				
					if(!props.length || typeof props !== 'object')
						throw new Error("object passed has no properties associated")
					
					this.sourceProperties = props;
					return this;
					}else {
						throw new Error("the specified element is not a form");
					}
				}
			
		}catch(ex) {
		console.error("'from'",ex.message);
		
	}
	},
	
	to : function(dest) {
	
	
		try{
		
			if(typeof dest !== 'object')
				throw new Error("parameter passed is not a valid object");
		
			this.destObject = dest;
			var props = Object.getOwnPropertyNames(dest);
	
			if(!props.length || typeof props !== 'object')
				throw new Error("object passed has no properties associated")
		
		this.destProperties = props;
		return this;
		
		}catch(ex)
		{
			console.error("'to'",ex.message);
		}
	},
	map : function() {
	
		var sourceProps = this.sourceProperties,
		destProps = this.destProperties;

		for(var key in sourceProps) {
			
			var propertyName = sourceProps[key];
			this.destObject[propertyName] = this.sourceObject[propertyName];
		
		}
		return this.destObject;
	},
	mapIndex : function() {
	
		var sourceProps = this.sourceProperties,
		destProps = this.destProperties,
		indexes = Math.min(sourceProps.length,destProps.length);
		
		for(var key=0;key < indexes;key++) {
			
			var sourcePropertyName = sourceProps[key],
			sourceVal = this.sourceObject[sourcePropertyName];
			
			var destPropertyName = destProps[key];
			this.destObject[destPropertyName] = sourceVal;
		}
		
		return this.destObject;
	},
	mapOnly : function(props) {
		
		
		
		for(var key in props){
			var propertyName= props[key];
			this.destObject[propertyName] = this.sourceObject[propertyName];
		}
		
		return this.destObject;
	},
	mapUsing: function(mappings) {
	
		
		
		for(var k in mappings) {
			var sourceProperty = mappings[k][0],
				destProperty = mappings[k][1];
			
			this.destObject[destProperty] = this.sourceObject[sourceProperty];
		}
		return this.destObject;
	}
	
	
			
		}
}

})();


			