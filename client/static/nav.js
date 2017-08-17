$(function(){
	var active = "nav-search";
	$(".nav-item").bind({
		click: function(e) {
			e.preventDefault();
			var id = this.id;
			if (id != active) {
				$("#" + active.slice(4)).css("display", "none");
				$("#" + id.slice(4)).css("display", "")
			}
		}
	});
});
