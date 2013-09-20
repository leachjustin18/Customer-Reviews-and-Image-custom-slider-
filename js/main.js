//Cache selectors 	
			var $sel = {
				nav: $('#nav'), 
				clickNavigation: $('#nav .navOption'), 
				navItems: $('#nav li')
			}

			//Define varibles 
			var firstSlideHalfHeight = 362, 
			$window = $(window), 
			scrollTo, 
			navId;

			function removeNavHighLightStyle() { 
			 	$sel.navItems.removeClass('highLightInViewNav');
			 }

			//Function to determine if the window height is less then half the first slide 
			function navAppearOrDisappearHighLightNav() {
				if ($window.scrollTop() > firstSlideHalfHeight) {
					$sel.nav.animate({
						top: 0
					}, 600)
				} 

				else {
					$sel.nav.clearQueue();
					$sel.nav.stop();

					$sel.nav.animate({
						top: -80
					}, 500)

				}

				if(elementInViewport(document.getElementById('firstSlide')) == true) {
					removeNavHighLightStyle();
					$('#firstSlideLink').addClass('highLightInViewNav');
				}
				else if(elementInViewport(document.getElementById('secondSlide')) == true) {
					removeNavHighLightStyle();
					$('#secondSlideLink').addClass('highLightInViewNav');
				}
				else if(elementInViewport(document.getElementById('thirdSlide')) == true) {
					removeNavHighLightStyle();
					$('#thirdSlideLink').addClass('highLightInViewNav');
				}
				else if(elementInViewport(document.getElementById('fourthSlide')) == true) {
					removeNavHighLightStyle();
					$('#fourthSlideLink').addClass('highLightInViewNav');
				}
				else if(elementInViewport(document.getElementById('fifthSlide')) == true) {
					removeNavHighLightStyle();
					$('#fifthSlideLink').addClass('highLightInViewNav');
				}
				else if(elementInViewport(document.getElementById('sixthSlide')) == true) {
					removeNavHighLightStyle();
					$('#sixthSlideLink').addClass('highLightInViewNav');
				}
				else if(elementInViewport(document.getElementById('seventhSlide')) == true) {
					removeNavHighLightStyle();
					$('#seventhSlideLink').addClass('highLightInViewNav');
				}
				else if(elementInViewport(document.getElementById('eightSlide')) == true) {
					removeNavHighLightStyle();
					$('#eightSlideLink').addClass('highLightInViewNav');
				}
				else {
					removeNavHighLightStyle();
				}
			}

			//Listening for window scroll 
			$window.scroll(function(){
				//Fire off navAppear or disappear function
				navAppearOrDisappearHighLightNav();

			});


			//Listening for user to click on one of the nav options and moving the window into view of that story, aka smooth scrolling 
			$sel.clickNavigation.click(function(event){
				event.preventDefault();

				navId = this.id;
				scrollTo = $('#' + navId + 'Slide').offset().top;

				$('body, html').animate({
					scrollTop: scrollTo - 56
				}, 700);
			});

			//Test if element is within view
			function elementInViewport(el) {
				  var top = el.offsetTop,
				  left = el.offsetLeft,
				  width = el.offsetWidth,
				  height = el.offsetHeight;

				 while(el.offsetParent) {
				   el = el.offsetParent;
				   top += el.offsetTop;
				   left += el.offsetLeft;
				 }

				 return (
				   top < (window.pageYOffset + window.innerHeight) + 56  &&
				   left < (window.pageXOffset + window.innerWidth) + 56 &&
				   (top + height) > window.pageYOffset + 56 &&
				   (left + width) > window.pageXOffset + 56
				 );
			}

			function preload(arrayOfImages) {
				$(arrayOfImages).each(function() {
					$('<img/>')[0].src = this;
				});
			};

			preload(['images/fp03_comfortLandingPage_slide2_shoe_image_0.png','images/fp03_comfortLandingPage_slide2_shoe_image_1.png', 'images/fp03_comfortLandingPage_slide2_shoe_image_2.png', 
				'images/fp03_comfortLandingPage_slide2_shoe_image_3.png', 'images/fp03_comfortLandingPage_slide4_shoe_image_0.jpg', 'images/fp03_comfortLandingPage_slide4_shoe_image_1.jpg', 'images/fp03_comfortLandingPage_slide4_shoe_image_2.jpg', 
				'images/fp03_comfortLandingPage_slide4_shoe_image_3.jpg', 'images/fp03_comfortLandingPage_slide4_shoe_image_4.jpg', 'images/fp03_comfortLandingPage_slide1_image_2.jpg', 'images/fp03_comfortLandingPage_slide1_image_3.jpg', 'images/fp03_comfortLandingPage_slide1_image_4.jpg', 
				'images/fp03_comfortLandingPage_slide1_image_5.jpg'])