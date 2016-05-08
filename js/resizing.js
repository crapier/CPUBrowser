function resize_handler(event) {
	$("#bottom_area")[0].style.height = "" +  (window.innerHeight - 50) + "px";
	$("#list_area")[0].style.height = "" +  (window.innerHeight - 50) + "px";

	if ((window.innerWidth - 200) >= 500) {
		$("#list_area")[0].style.width = "" +  (window.innerWidth - 200) + "px";
	}
	else {
		$("#list_area")[0].style.width = "" +  500 + "px";
	}
}

$(document).ready(function() {
	resize_handler();
	$(window).resize(resize_handler);
});