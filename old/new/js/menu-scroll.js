jQuery(document).ready(function($){
	//variables
	var $window = $(window);
	var $containerlist = $("#containerlist");
	var $main = $("#main");
	var window_min = 0;
	var window_max = 0;
	var threshold_offset = 50;
	/*
	 set the containerlist's maximum and minimum limits as well as movement thresholds
	*/
	function set_limits(){
		//max and min containerlist movements
		var max_move = $main.offset().top + $main.height() - $containerlist.height() - 2*parseInt($containerlist.css("top") );
		var min_move = $main.offset().top;
		//save them
		$containerlist.attr("data-min", min_move).attr("data-max",max_move);
		//window thresholds so the movement isn't called when its not needed!
		//you may wish to adjust the freshhold offset
		window_min = min_move - threshold_offset;
		window_max = max_move + $containerlist.height() + threshold_offset;
	}
	//sets the limits for the first load
	set_limits();
	
	function window_scroll(){
		//if the window is within the threshold, begin movements
		if( $window.scrollTop() >= window_min && $window.scrollTop() < window_max ){
			//reset the limits (optional)
			set_limits();
			//move the containerlist
			containerlist_move();
		}
	}
	$window.bind("scroll", window_scroll);
	
	/**
	 * Handles moving the containerlist if needed.
	**/
	function containerlist_move(){
		var wst = $window.scrollTop();
		//if the window scroll is within the min and max (the containerlist will be "sticky";
		if( wst >= $containerlist.attr("data-min") && wst <= $containerlist.attr("data-max") ){
			//work out the margin offset
			var margin_top = $window.scrollTop() - $containerlist.attr("data-min");
			//margin it down!
			$containerlist.css("margin-top", margin_top);
		//if the window scroll is below the minimum 
		}else if( wst <= $containerlist.attr("data-min") ){
			//fix the containerlist to the top.
			$containerlist.css("margin-top",0);
		//if the window scroll is above the maximum 
		}else if( wst > $containerlist.attr("data-max") ){
			//fix the containerlist to the top
			$containerlist.css("margin-top", $containerlist.attr("data-max")-$containerlist.attr("data-min")+"px" );
		}
	}
	//do one containerlist move on load
	containerlist_move();
});