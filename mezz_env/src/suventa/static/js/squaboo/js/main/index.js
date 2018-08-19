/* Config. Render Sync w/ Stage
    --------------------------------------*/
	function config_render() {

		$('#config-form input[type=radio]').on('change', function(e) {

			e.preventDefault();

			// grab the 'name' attribute value for the new selection
			var input_name = $(this).attr("name");

			// convert the name to a data attribute for use with the stage
			var stage_match_attr = "data-" + input_name;

			// grab the value of the data-stage-name attribute for the new selection
			var selected_option = $(this).attr("data-stage-name");

			// set the stage view to reflect the new selection by updating the
			// stage's data attribute value that corresponds with the new selection
			$('#watch-comp').attr(stage_match_attr, selected_option);

		});

	}
	config_render();








	/* Order Button
    --------------------------------------*/
	function order_bttn() {

		$('.bttn.order.js-trigger').on('click', function(e) {

			e.preventDefault();

			// Submit the form here, from clicking the order button

		});

	}
	order_bttn();










	/* Toggle Modal
    --------------------------------------*/
	function toggle_modal() {
	  
	  // when any button/link is clicked that has
	  // the class 'js-trigger-modal'...
	  $('.js-trigger-modal').on("click", function(e){
	      
	      // prevent the <a> element's default behavior
	      e.preventDefault();
	      
	      // get the value for the 'data-modal-source'
	      // attribute for the element clicked
	      var modal_content_source = $(this).data('modal-source');
	      
	      // match the value above with the corresponding
	      // content modal wrapper, and then get the HTML
	      var modal_inner_content = $('div[class=' + modal_content_source + ']').html(); 
	      
	      // insert the HTML from above into the modal wrapper
	      $('#modal-content').html('').append(modal_inner_content);
	      
	      // show the modal — add class to the body to reveal
	      // and prevent the body from scrolling while modal is open
	      $('body').addClass('show-modal noscroll');

	  });
	  
	  // close the modal when a 'dismiss' element 
	  // or the overlay is clicked
	  $('body').on('click', '.dismiss-modal, .modal .overlay', function(e) {
	      // remove the class on the body that shows the modal
	      // and remove the class preventing the body from scrolling
	      e.preventDefault();
	      $("body").removeClass("show-modal noscroll");
	  });

	}
	toggle_modal();