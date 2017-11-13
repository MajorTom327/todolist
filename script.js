function getCookieTodoValue() {
	var cookies = document.cookie.split(/; /g);
	var values = JSON.parse('[{\
			"cat": "0",\
			"name": "default todo",\
			"done": false,\
			"edit": false,\
			"pinned": false,\
			"show": false\
			}]');
	for (var i = 0; i < cookies.length; i++)
	{
		var cookie = cookies[i];
		if (cookie.indexOf("=") == -1)
			continue;
		var nom = cookie.substring(0, cookie.indexOf("="));
		var valeur = cookie.substring(cookie.indexOf("=") + 1);
		if (nom == "todolist")
			values = JSON.parse(valeur);
	}
	return values;
}

var vm = new Vue({
el: "#wish-list",
data: {
newtask : "",
newtask_imp: 0,
newtask_pin: false,
newtask_done: false,
newtask_edit: false,
imp: [
"inverse",
"info",
"success",
"warning",
"danger"
],
lst: getCookieTodoValue()
},
computed: {
sortedlist: function () {
var x = this.lst;
x = x.sort(function (a, b) {
		return (parseInt(b.cat) - parseInt(a.cat));
		});
return (x);
			}
		  },
methods: {
trash: function (index) {
		   console.log(index);
		   this.lst.splice(index, 1);
		   this.addCookie();
	   },
addCookie: function () {
			   var tdl = JSON.stringify(this.lst);
			   var ctd = JSON.stringify(getCookieTodoValue());
			   if (ctd !== tdl)
				   document.cookie = 'todolist=' + JSON.stringify(this.lst) + "; expires=" + moment().add(6, 'months').toDate();
		   },
addTask: function () {
			 var t = this.newtask;
			 if (t === "")
				 return ;
			 this.lst.push(JSON.parse('{\
						 "cat": "' + this.newtask_imp + '",\
						 "name": "' + t + '",\
						 "done": ' + this.newtask_done + ',\
						 "edit": ' + this.newtask_edit + ',\
						 "pinned": ' + this.newtask_pin + ',\
						 "show": false\
						 }'));
			 this.newtask = "";
			 this.newtask_imp = "0";
			 this.newtask_done = false;
			 this.newtask_edit = false;
			 this.newtask_pin = false;

			 this.addCookie();
		 }
		 }
});
setInterval(function () {
		vm.addCookie();
		}, 10000);
