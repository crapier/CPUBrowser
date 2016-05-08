// return true if string1 equals string2
function string_equals(string1, string2) {
	return string1.toLowerCase() == string2.toLowerCase();
}

// returns true is string1 contains string2
function string_contains(string1, string2) {
	return string1.toLowerCase().indexOf(string2.toLowerCase()) >= 0;
}

function search_filter() {
	for (var i = 0; i < cpu_items.length; i++) {
		$(cpu_items[i].page_div).show();
		// filter out non search matches
		if ($("#search_box")[0].value.length > 0) {
			var search_strings = $("#search_box")[0].value.split(" ");
			for (var j = 0; j < search_strings.length; j++){
				if (!string_contains(cpu_items[i].database_entry.cpu_name, search_strings[j])) {
					$(cpu_items[i].page_div).hide();
					break;
				}
			}
		}

		// filter out non socket matches
		var num_sockets_checked = 0;
		var socket_match_found = false;
		if ($("#socket_lga2011")[0].checked) {
			num_sockets_checked++;
			if (string_equals(cpu_items[i].database_entry.socket, "LGA 2011")) {
				socket_match_found = true;
			}
		}

		if ($("#socket_lga2011v3")[0].checked) {
			num_sockets_checked++;
			if (string_equals(cpu_items[i].database_entry.socket, "LGA 2011-v3")) {
				socket_match_found = true;
			}
		}
		if ($("#socket_lga1150")[0].checked) {
			num_sockets_checked++;
			if (string_equals(cpu_items[i].database_entry.socket, "LGA 1150")) {
				socket_match_found = true;
			}
		}

		if ($("#socket_lga1151")[0].checked) {
			num_sockets_checked++;
			if (string_equals(cpu_items[i].database_entry.socket, "LGA 1151")) {
				socket_match_found = true;
			}
		}

		if ($("#socket_lga1155")[0].checked) {
			num_sockets_checked++;
			if (string_equals(cpu_items[i].database_entry.socket, "LGA 1155")) {
				socket_match_found = true;
			}
		}
		if ($("#socket_amd3p")[0].checked) {
			num_sockets_checked++;
			if (string_equals(cpu_items[i].database_entry.socket, "Socket AM3+")) {
				socket_match_found = true;
			}
		}

		if (num_sockets_checked > 0 && !socket_match_found) {
			$(cpu_items[i].page_div).hide();
		}

		// filter out non brand matches
		var num_brand_checked = 0;
		var brand_match_found = false;
		if ($("#brand_intel")[0].checked) {
			num_brand_checked++;
			if (string_equals(cpu_items[i].database_entry.brand, "Intel")) {
				brand_match_found = true;
			}
		}

		if ($("#brand_amd")[0].checked) {
			num_brand_checked++;
			if (string_equals(cpu_items[i].database_entry.brand, "AMD")) {
				brand_match_found = true;
			}
		}

		if (num_brand_checked > 0 && !brand_match_found) {
			$(cpu_items[i].page_div).hide();
		}

		// filter out non price range matches
		var min_price = $( "#price_slider" ).slider( "option", "values" )[0];
		var max_price = $( "#price_slider" ).slider( "option", "values" )[1];
		if (cpu_items[i].price < min_price || cpu_items[i].price > max_price) {
			$(cpu_items[i].page_div).hide();
		}
	}
}


function slider_handler(event, ui) {
	$("#current_price_range")[0].innerHTML = "$" + (ui.values[0]) + " - $" + (ui.values[1]);
	search_filter();
}

// setup jQuery Slider
$(document).ready(function() {
	$( "#price_slider" ).slider({
		range: true,
		min: 0,
		max: 1000,
		step: 5,
		values: [ 0, 1000 ],
		change: slider_handler,
		slide: slider_handler
	})

	$(".filter_function").click(search_filter);
	$("#search_box").keyup(search_filter);
});