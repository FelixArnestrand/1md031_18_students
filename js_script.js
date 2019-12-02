
function MenuItem(name, kCal, gl, lac) {
    this.name = name; // The this keyword refers to the object itself
    this.kCal = kCal;
    this.gluten = gl;
    this.lactose = lac;
    this.nameAndCal = function() {
        return this.name + '-' + this.kCal;
    };
}

function getFormData(){
	let namn= getElementById("name").value;
	console.log(namn)
}


