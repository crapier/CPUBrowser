
var cpu_items = [];

function cpu_item(database_entry) {
	this.database_entry = database_entry;
	this.page_div = $("<div>", {class: "list_item"});

	var image = $("<img>", {class: "item_img", src: database_entry.img_url});
	$(this.page_div).append(image);

	var name = $("<div>", {class: "item_name", html: database_entry.cpu_name});
	$(this.page_div).append(name);

	var benchmark = $("<div>", {class: "item_benchmark", html: "CPU Benchmark: " + database_entry.benchmark_score});
	$(this.page_div).append(benchmark);


	var rating_avg = 0;
	if (database_entry.rating_amazon >= 0 && database_entry.rating_newegg >= 0) {
		rating_avg = (database_entry.rating_amazon + database_entry.rating_newegg) / 2;
	}
	else if (database_entry.rating_amazon >= 0) {
		rating_avg = database_entry.rating_amazon;
	}
	else if (database_entry.rating_newegg >= 0) {
		rating_avg = database_entry.rating_newegg;
	}
	this.rating = rating_avg;

	var rating_img = "img/stars_0.0.png";
	if (rating_avg > 4.75) {
		rating_img = "img/stars_5.0.png";
	}
	else if (rating_avg >= 4.25) {
		rating_img = "img/stars_4.5.png";
	}
	else if (rating_avg >= 3.75) {
		rating_img = "img/stars_4.0.png";
	}
	else if (rating_avg >= 3.25) {
		rating_img = "img/stars_3.5.png";
	}
	else if (rating_avg >= 2.75) {
		rating_img = "img/stars_3.0.png";
	}
	else if (rating_avg >= 2.25) {
		rating_img = "img/stars_2.5.png";
	}
	else if (rating_avg >= 1.75) {
		rating_img = "img/stars_2.0.png";
	}
	else if (rating_avg >= 1.25) {
		rating_img = "img/stars_1.5.png";
	}
	else if (rating_avg >= 0.75) {
		rating_img = "img/stars_1.0.png";
	}
	else if (rating_avg >= 0.25) {
		rating_img = "img/stars_0.5.png";
	}
	else if (rating_avg >= 0.00) {
		rating_img = "img/stars_0.0.png";
	}
	var rating = $("<img>", {class: "item_rating_avg", src: rating_img});
	$(this.page_div).append(rating);

	var rating_num = $("<div>", {class: "item_rating_num", html: rating_avg});
	$(this.page_div).append(rating_num);

	var socket = $("<div>", {class: "item_socket", html: database_entry.socket});
	$(this.page_div).append(socket);

	var brand = $("<div>", {class: "item_brand", html: database_entry.brand});
	$(this.page_div).append(brand);

	if (database_entry.price_amazon >= 0 && database_entry.price_newegg >= 0) {
		if (database_entry.price_amazon > database_entry.price_newegg) {
			var price = $("<div>", {class: "item_price_min", html: "$" + database_entry.price_newegg, click: function() {
				window.open(database_entry.newegg_url);
			}});
			$(this.page_div).append(price);

			this.price = database_entry.price_newegg;
		}
		else {
			var price = $("<div>", {class: "item_price_min", html: "$" + database_entry.price_amazon, click: function() {
				window.open(database_entry.amazon_url);
			}});
			$(this.page_div).append(price);

			this.price = database_entry.price_amazon;
		}
	}
	else if (database_entry.price_amazon >= 0) {
		var price = $("<div>", {class: "item_price_min", html: "$" + database_entry.price_amazon, click: function() {
			window.open(database_entry.amazon_url);
		}});
		$(this.page_div).append(price);

		this.price = database_entry.price_amazon;
	}
	else if (database_entry.price_newegg >= 0) {
		var price = $("<div>", {class: "item_price_min", html: "$" + database_entry.price_newegg, click: function() {
			window.open(database_entry.newegg_url);
		}});
		$(this.page_div).append(price);

		this.price = database_entry.price_newegg;
	}
	else {
		var price = $("<div>", {class: "item_price_min", html: "$N/A"});
		$(this.page_div).append(price);

		this.price = 0;
	}

	if (database_entry.price_amazon >= 0) {
		var price_amazon = $("<div>", {class: "item_price_site amazon", html: "Amazon: $" + database_entry.price_amazon, click: function() {
			window.open(database_entry.amazon_url);
		}});
		$(this.page_div).append(price_amazon);
	}
	else {
		var price_amazon = $("<div>", {class: "item_price_site amazon", html: "Amazon: $N/A"});
		$(this.page_div).append(price_amazon);
	}

	if (database_entry.price_newegg >= 0) {
		var price_newegg = $("<div>", {class: "item_price_site newegg", html: "Newegg: $" + database_entry.price_newegg, click: function() {
			window.open(database_entry.newegg_url);
		}});
		$(this.page_div).append(price_newegg);
	}
	else {
		var price_newegg = $("<div>", {class: "item_price_site newegg", html: "Newegg: $N/A"});
		$(this.page_div).append(price_newegg);
	}

	var annotation = $("<textarea>", {class: "item_annotation", placeholder: "Add thoughts here"});
	$(this.page_div).append(annotation);
}
