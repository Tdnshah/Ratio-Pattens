var gameReporter = gameReporter || {};

	gameReporter = function (game) {
	var _this = this;
	game.reporter = {};

	/**
	 * [hideModal description]
	 * 
	 * @return {[type]}      [description]
	 */
	return{
		getCookie: function(cname) {
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for(var i = 0; i <ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		},
		submitData: function (url,data) {
			var data_string = {}
			var user_id = this.getCookie('user_id')
			
			var buddy_details = ""
			buddy_details = this.getCookie('buddy_ids')
			
			var csrftoken;
			csrftoken = this.getCookie('csrftoken');
			
			var language = "";
			language = this.getCookie("language_code"); 
			
			var sessionid = "";
			sessionid = this.getCookie('sessionid')

			var date = new Date();
			var timestamp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
			data_string['userId'] = user_id;
			data_string['createdAt'] = timestamp
			data_string['buddyIds'] = buddy_details
			// data_string['sessionid'] = sessionid
			data_string['appName'] = "Ration Patterns"
			data_string['language'] = language
			data_string['appData'] = data;
			console.log(data_string);
			
			var data_string = JSON.stringify(data_string);
			console.log(data_string)


			$.ajax({
					  type: "POST",
					  data:{
							"payload":data_string,
							"appName":"Ration Patterns",
							'csrfmiddlewaretoken':csrftoken,
						},
					  url: "/tools/logging/",
					  datatype: "json",
					  success: function(data) {
					}
				});
			// return xhr.response
		}
	}
	 
}

