( function ( $ ) {
	if( $ !== undefined ) {
		$(document).ready( function ( ) {
			var $imgs = $( "img[data-response][data-response!='false']" ), //responsive images
				$window = $( window ),
				respSteps = [ //defines the responsive steps
				{
					min_width: 0, //only apply on displays less than 480px wide
					title: "mobile" //uses data-mobile attribute if present for image src
				},
				{
					min_width: 480,
					title: "mobile-landscape"
				},
				{
					min_width: 767,
					title: "tablet"
				},
				{
					min_width: 960,
					title: "desktop"
				},
				{
					min_width: 1200,
					title: "large-desktop"
				},
				{
					min_width: 1920,
					title:	"hd-desktop"
				}
			];
			
			//used to set the responsive Steps, set extend to true to mix with defaults
			//else full user specification
			$.IMGResponse = function ( options, extend ) { 
				if( extend === true) {
					$.extend( true, respSteps, options );
				} else {
					respSteps = options;
				}
				respSteps.sort( compareSteps );
			};
			function compareSteps ( a, b ) {
				var result = 0;
				
				if( a.min_width < b.min_width ) {
					result = -1; 
				} else if (a.min_width > b.min_width ) {
			    	result = 1;
				}
				return result;
			}
			function respondImages( stepFit, i ) {
				var dataAttr = "data-" + stepFit.title;
				
				$imgs.each( function ( ) {
					var $this = $( this ),
						src = $this.attr( dataAttr );
					
					if( src !== undefined ) { //exact fit
						$this.attr( "src", src );
					} else { //find best fit
						var j = 1;
						
						function fitToStep( $img, step ) {
							var isFit = false,
								fallbackAttr = "data-" + step.title,
								fallbackSrc  = $img.attr( fallbackAttr );
							
							if( fallbackSrc !== undefined ) {
								$img.attr( "src", fallbackSrc );
								isFit = true;
							}
							return isFit;
						}
						while( i + j < respSteps.length || i - j >= 0 ) {
							//check smaller, then larger
							if( i - j >= 0 ) {
								if( fitToStep( $this, respSteps[i - j] ) ) {
									break; //found a fit, break out of while
								}
							}
							
							if( i + j < respSteps.length ) {
								if( fitToStep( $this, respSteps[i + j] ) ) {
									break; //found a fit, break out of while
								}
							}
							j++; //no match found, try again
						}
					}
				});
				
			}
			function respondToResize( ) {
				for( var i = respSteps.length-1; i >= 0; i-- ) {
					if( respSteps[i].min_width < $window.width( ) ) {
						//we're at this step, respond images
						respondImages( respSteps[i], i );
						break; 
					}
				}
			}
			$window.on( "resize", respondToResize );
			
			respondToResize( ); //intialize
		});
	}
})( jQuery );