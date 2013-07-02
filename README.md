IMGResponse
===========

A jQuery plugin for responsive images

Using IMGResponse 
=================

A "data-response" attribute must be given to the IMG elements which are to respond to the 
width of the screen. Omitting this attribute or setting its value to something other than true
will exempt the image from response.

Images are assigned data-* attributes which define the src url of the appropriate image. For example:

<img data-response
	data-desktop='asics-trail.png'
	data-tablet='asics-trail-tablet.png' >

This defines an image to load on desktop and tablet displays as defined in the plugin 
configuration, which is detailed below. If a given resolution has no match, the nearest 
defined option is used looking first 1 step below, then 1 step above and incrementing to 2 steps
on further iterations if no appropriate option is found.

Custom Configuration
===========

IMGResponse has the following default steps defined where images respond.

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

The min_width attribute defines the minimum width at which a src url of data-title is to
be used. This can be completely customized by invoking $.IMGResponse( options, extend ). 
The options value should be similar to respSteps above. You may define custom titles and min_widths
as desired. If the extend value is true then options will $.extend respSteps. Otherwise,
only the values in options will be used.

Shortcomings
============

At the very least this first implementation lacks the ability to respond newly inserted images to the 
DOM. A future commit should include a method of dealing with such an occurance, possibly by
listening to a custom event on $(document) or manual invocation of a method to reload.