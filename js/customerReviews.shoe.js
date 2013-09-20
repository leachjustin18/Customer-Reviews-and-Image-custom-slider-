(function($){
	//Cache Selectors    
    //Plugin

   

    $.fn.reviewShoeSlideShow = function(options) {

    var options = $.extend(defaults, options);

     

     return this.each(function(){
         //Defaults for the plugin
   
        var $this = $(this), 
        direction, 
        down_x = null, 
        up_x = null;
        
       //Used to determine which slide show you want to control by getting the id assigned to the plugin
        direction = this.id || $this.prop('class')
    
        //Cache jquery selectiors 
        var $sel = {
           customerSlides:$('#' + direction + ' .customerReviews'), 
           customerWrapper:$('#' + direction + ' .customerReviewsWrapper'),
           shoeSlides:$('#' + direction + ' #shoeSlideShow ul li'), 
           prevArrow : $('#' + direction + ' .prev'), 
           nextArrow : $('#' + direction + ' .next'), 
           colorSwatchesWrapper: $('#'+ direction + ' .shoeColorOptionsWrapper > a'), 
           review: $('#' + direction +' #review')
        }

            //Variables 
        var slideCounter = 0, 
        customerReviewCounter, 
        totalSlides = $sel.customerSlides.length, 
        currentSlide, 
        nextShoeSlide;

    		//Set the slide show to start at the first slide(shoes)
    	if (defaults.shoe == true) { 
    		$sel.shoeSlides.eq(0).show();	
    	}

        if (defaults.colorSwatches === true) {
                //Change shoe color 
            $sel.colorSwatchesWrapper.click(function(event){
                event.preventDefault();

                //Get the parent and child id's
                var parentId = this.parentNode.id, 
                childId = this.firstChild.id, 
                currentId = this.id, 
                grabImageId = $('#'+childId+'SlideShoe'), 
                getSrcPropFromImage = grabImageId.prop('src'), 
                getFileExtOfImage = getSrcPropFromImage.substr((getSrcPropFromImage.lastIndexOf('.')));

                $('#'+ parentId + ' a div').removeClass('borderOrange');

                $('#'+ parentId + ' #' + currentId + ' div').addClass('borderOrange');
                
                grabImageId.prop('src', 'images/fp03_comfortLandingPage_slide'+ parentId +'_shoe_image_'+ currentId + getFileExtOfImage);
            }); 
        }

     	//Function reviewCounterCurrentSlide
    	function reviewCounterCurrentSlide() {	
    		//Move the slides(reviews) over depending on the left postion of the next side
			customerReviewCounter = - $sel.customerSlides.eq(slideCounter).position().left;
			//Get the current location of the slide you are viewing  
        	currentSlide = $sel.customerSlides.eq(slideCounter).index();
    	}

        //Function for fading in shoes
        function shoeFadeOut() {
            if (defaults.shoe == true) { 
                //Fade out the previous 
                $sel.shoeSlides.eq(slideCounter).fadeOut();
            }
        }

    	//Function animateReviewShoes
    	function animateReviewShoes() {
    		//Default, animate the slides(reviews) to the left
    		$sel.customerWrapper.stop(true, true).animate({
				left: customerReviewCounter
			}, 800);

        	if (defaults.shoe === true) {
        			//Fade in the previous shoe slide
        		 $sel.shoeSlides.eq(slideCounter).fadeIn();
        	}
    	}

        function previousReview() {
                //Fade out shoes 
            shoeFadeOut();
                
            //Subract for the slideCounter var
            slideCounter--;

            //Call reviewCountCurrentSlide function
            reviewCounterCurrentSlide();

            //Test if you are on the first slide, if you are, hide the previous 
             if(currentSlide -1 < 0) {
                $sel.prevArrow.hide();
             }
             //Call animateReivew function
            animateReviewShoes();
        }

        function nextReview() {
                //Testing if you have gone past the first slide(reviews), if you have show the previous arrow, or hide it
            if ( slideCounter < totalSlides && (slideCounter !== totalSlides - 1)) {
                //Fade in prev arrow 
                $sel.prevArrow.fadeIn().css('display', 'block');

                //Fade out shoes
                shoeFadeOut();

                //Add 1 to slide counter
                slideCounter++; 
            }
            else {
                //Fade out the current shoe 
                shoeFadeOut();

                //Set the slide counter to 0
                slideCounter = 0;

                //Fade in the first shoe 
                $sel.shoeSlides.eq(slideCounter).fadeIn();

                //Fade out the pre arrow 
                $sel.prevArrow.fadeOut();
            }
                //Call reviewCounterCurrentSlide function
                reviewCounterCurrentSlide();
        
                //Call animateReivew function
                animateReviewShoes();
        }
 
    	//Clicking the next button function

		$sel.nextArrow.click(function(){
		      nextReview();	
		});

    
		//Function that fires off when the user clicks the previous button.
		$sel.prevArrow.click(function(){
            previousReview(); 	
		});


    //Touch slide
    $sel.review.on('touchstart', function(e){
        down_x = e.originalEvent.touches[0].pageX;
    });
    $sel.review.on('touchmove', function(e){
        e.preventDefault();
        up_x = e.originalEvent.touches[0].pageX;
    });
    $sel.review.on('touchend', function(e){
        do_work();
    });

    function do_work(event) {
    
    if ((down_x - up_x) > 50) {
            nextReview(); 
        }

    else if ((up_x - down_x) > 50  && $sel.prevArrow.css('display') == 'block') {   
             previousReview();   
       
        }
    }


    });
  };

  //Default settings for the plugin
   var defaults = {
        shoe: false, 
        colorSwatches: false
    };

})(jQuery);	