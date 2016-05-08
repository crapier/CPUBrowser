
function comapre_benchmark_hi_low(item1, item2) {
	return item2.database_entry.benchmark_score - item1.database_entry.benchmark_score;
}

function comapre_benchmark_lo_hi(item1, item2) {
	return item1.database_entry.benchmark_score - item2.database_entry.benchmark_score;
}

function comapre_price_hi_low(item1, item2) {
	return item2.price - item1.price;
}

function comapre_price_lo_hi(item1, item2) {
	return item1.price - item2.price;
}

function comapre_rating_hi_low(item1, item2) {
	return item2.rating - item1.rating;
}

function comapre_rating_lo_hi(item1, item2) {
	return item1.rating - item2.rating;
}

function sort_items(event) {
	var current_value = $("#sort_dropdown")[0].value;

	if (current_value == "benchmark_hi_lo") {
		cpu_items.sort(comapre_benchmark_hi_low);
	}
	else if (current_value == "benchmark_lo_hi") {
		cpu_items.sort(comapre_benchmark_lo_hi);
	}
	else if (current_value == "price_hi_lo") {
		cpu_items.sort(comapre_price_hi_low);
	}
	else if (current_value == "price_lo_hi") {
		cpu_items.sort(comapre_price_lo_hi);
	}
	else if (current_value == "rating_hi_lo") {
		cpu_items.sort(comapre_rating_hi_low);
	}
	else if (current_value == "rating_lo_hi") {
		cpu_items.sort(comapre_rating_lo_hi);
	}

	$("list_area").empty();
	for (var i = 0; i < cpu_items.length; i++) {
		$("#list_area").append(cpu_items[i].page_div);
	}
}

function create_items() {
	// clear items
	cpu_items = [];

	for (var i = 0; i < database.length; i++) {
		cpu_items[i] = new cpu_item(database[i]);
	}

	load_url(location.search.substring(3));
	sort_items();
}

var export_dialog = $("<div>", {id: "export_dialog"});


function export_current() {
	var current_obj = {};

	// current search
	current_obj.search = $("#search_box")[0].value;

	// socket filters
	current_obj.socket_lga1150 = $("#socket_lga1150")[0].checked;
	current_obj.socket_lga1151 = $("#socket_lga1151")[0].checked;
	current_obj.socket_lga1155 = $("#socket_lga1155")[0].checked;
	current_obj.socket_lga1366 = $("#socket_lga1366")[0].checked;

	// brand filters
	current_obj.brand_intel = $("#brand_intel")[0].checked;
	current_obj.brand_amd = $("#brand_amd")[0].checked;

	// price range
	current_obj.price = $( "#price_slider" ).slider( "option", "values" );

	// sort option
	current_obj.sort = $("#sort_dropdown")[0].selectedIndex;

	// annotations


	// string to add to url for sharing/saving
	var current_string = btoa(JSON.stringify(current_obj));
	export_dialog.html(location.href.split("?")[0] + "?a=" + current_string);
	$(export_dialog).dialog("open");
}

function load_url(data) {
	if (data.length > 0) {
		var load_obj = JSON.parse(atob(data));

		//search
		$("#search_box")[0].value = load_obj.search;

		// socket filters
		$("#socket_lga1150")[0].checked = load_obj.socket_lga1150;
		$("#socket_lga1151")[0].checked = load_obj.socket_lga1151;
		$("#socket_lga1155")[0].checked = load_obj.socket_lga1155;
		$("#socket_lga1366")[0].checked = load_obj.socket_lga1366;

		// brand filters
		$("#brand_intel")[0].checked = load_obj.brand_intel;
		$("#brand_amd")[0].checked = load_obj.brand_amd;

		// price range
		$( "#price_slider" ).slider( "option", "values", load_obj.price );

		// sort option
		$("#sort_dropdown")[0].selectedIndex = load_obj.sort;

		// annotations
	}
}

$(document).ready(function() {
	create_items();

	$("#sort_dropdown").change(sort_items);
	$("#share_url_icon").click(export_current);

	$(export_dialog).dialog({
		height: 400,
		width: 400,
		draggable: false,
		autoOpen: false,
		title: "Copy URL to Share or Save"
	});
});
