
'use strict';
var socket = io();

var burgerDisplay = new Vue({
	el: '#vuecontrolled',
	data: {
	orders: {},
	burgers: [
		{name: "The special one", kCal: "400", gluten: true, lactose: true, picture: "img/Burger1.jpg"},
		{name: "The chicken one", kCal: "350", gluten: false, lactose: true, picture: "img/Burger2.png"},
		{name: "The skinny one", kCal:"200", gluten: false, lactose: false, picture: "img/Burger3.jpg"},
		{name: "The fat one", kCal: "800", gluten: true, lactose: true, picture: "img/theFatOne.jpg"},
		{name: "The green one", kCal: "400", gluten: true, lactose: false, picture: "img/theGreenOne.jpg"}
	],
	myOrder: [],
	name: null, email: null, street: null, houseAdress: null, payMethod: null, gender: "", myId: 0,
	burgerType: [],
	},
	
    methods: {
        markDone: function() {
			
			var name = document.getElementById("name").value;
			var email = document.getElementById("email").value;
			var payMethod = document.getElementById("payment").value;
			var gender = document.getElementsByName("gender");
			for(var i = 0; i < gender.length; i++) { 
                if(gender[i].checked) 
					gender=gender[i].value;
            } 
			this.myOrder.push({ name: name, email: email, payMethod: payMethod, gender: gender, burger: this.burgerType });
			console.log(burgerDisplay.myOrder);
		},
		
		getNext: function() {
			var lastOrder = Object.keys(this.orders).reduce(function(last, next) {
			return Math.max(last, next);
			}, 0);
			return lastOrder + 1;
		},
		getId: function(){
			burgerDisplay.myId = burgerDisplay.myId + 1
			return burgerDisplay.myId
		},
		
		addOrder: function() {
			var thisOrderInfo = burgerDisplay.myOrder.slice(-1)[0]
			var orderInfoArray = [thisOrderInfo.name,thisOrderInfo.email,thisOrderInfo.gender,thisOrderInfo.payMethod];
			console.log(orderInfoArray)
			
			socket.emit("addOrder", {
			
				orderId: this.getId(),
				details: {
					x: burgerDisplay.orders.details.x ,
					y: burgerDisplay.orders.details.y
				},
				orderItems: burgerDisplay.burgerType,
				personalInfo: orderInfoArray,
			});
			
			
		},
		displayOrder: function(event) {
			var offset = {
				x: event.currentTarget.getBoundingClientRect().left,
				y: event.currentTarget.getBoundingClientRect().top
			};
			burgerDisplay.orders = ({ 
							details: {
								x: event.clientX - 10 - offset.x,
								y: event.clientY - 10 - offset.y}
			});
		}
		
	}
})
