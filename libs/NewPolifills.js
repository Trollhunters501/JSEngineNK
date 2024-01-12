Object.defineProperty(String.prototype, 'trimStart', { 
  value: function(){ 
    let str = this.toString(); 
    for(var i in str){ 
      if(str[0] == ' '){ 
        str = str.replace(' ', ''); 
      } 
    } 
    return str; 
  } 
}); 
Object.defineProperty(String.prototype, "insert", {
	value: function(index, string){
		if (index > 0) {
			if (string.charCodeAt(0) == 13){
				string = "\n";
			}
			let ret = this.substring(0, index) + string + this.substring(index, this.length);
			return ret;
		}else if (index == this.length) {
			return this + string;
		}else {
			return string + this;
		}
	}
});
Object.defineProperty(String.prototype, 'trimEnd', { 
  value: function(){ 
    let strn = this.toString(); 
    let leng = strn.length; 
    while (leng > 0 && strn[leng - 1] == ' '){ 
      leng--; 
    } 
    return strn.slice(0, leng); 
  } 
}); 
Object.defineProperty(Array.prototype, 'includes', { 
  value: function (y) { 
    if (!y) { 
      return false; 
    } if (!this[y]) { 
      return false; 
    } return true; 
  } 
}); 
Object.defineProperty(Array.prototype, 'include', { 
  value: function (t){ 
    return this.includes(t); 
  } 
}); 
Object.defineProperty(String.prototype, 'replaceAll', { 
  value: function (search, replace) { 
    if(!replace){ 
      return this.split(search).join(''); 
    } 
    return this.split(search).join(replace); 
  } 
}); 
Object.assign = function (t) { 
  for (var s, i = 1, n = arguments.length; i < n; i++) { 
    s = arguments[i]; 
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]; 
  } return t; 
}; 
Object.entries = function( obj ){ 
  let ownProps = Object.keys( obj ), i = ownProps.length, resArray = new Array(i); 
  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]]; 
  return resArray; 
};
Object.defineProperty(String.prototype, "includes", {
  value: function(searchString, position){
    if (position==null)position=0;
		if (this.indexOf(searchString,position)>-1){
			return true;
		}else{
			return false;
		}
  }
});
Object.defineProperty(String.prototype, "include", {
  value: function(searchString, position){
    return this.includes(searchString, position);
  }
});
Object.defineProperty(String.prototype, "padStart", {
  value: function(targetLength, padString){
    if (padString==null)padString=" ";
		return padString.repeat(targetLength-this.length)+this;
  }
});
Object.defineProperty(String.prototype, "padEnd", {
  value: function(targetLength, padString){
    if (padString==null)padString=" ";
		return this+padString.repeat(targetLength-this.length);
  }
});
Object.defineProperty(Array.prototype, 'flatMap', { 
  value: function (lambda) {
	  return [].concat.apply([],this.map(lambda));
  }
});
Object.is = function(x,y) {
		if (x === y) {
			return x !== 0 || 1 / x === 1 / y;
		}
		return x !== x && y !== y;
	}
Object.values=function(obj) {
		let ary=[];
		for (var key in obj){
			ary.push(obj[key]);
		}
		return ary;
	}
Object.getOwnPropertyDescriptors=function(obj){
		let ret={};
		for(var key in obj){
			ret[key]=Object.getOwnPropertyDescriptor(obj,key);
		}
		return ret;
	}
