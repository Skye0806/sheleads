// Always start at top of the page
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

//	Makes the code start when the webpage has loaded
$().ready(function()
{
		/*
		Note to future editor / developer: I've tried using classes to condense the information
			stored in the variable array 'section_parts', but most attempts have ended up making the
			information cluttered and scattered. Unless you are good with classes, I warn
			otherwise from using classes.
		*/


		/*			Section broken down as such for rapid editations and additions
						-Rapid edits can be done by adding the div.class in the
							first set of brackets (ex. ".secondpage"), then by
							adding each individual part of the section you'd
							like to animate (ex. "missionpicture"), then add the
							animation type desired.
						- editting extra features like timing and delay of said
							animation can be done in the CSS file


					part 1(with '.')			part2(no '.')					animation type				on mobile version?*/
		var section_parts = [
			[
				".secondpage",
				[".missionpicture", 	"missionpicture", 		'animated zoomInLeft',			true],		// Call entire rows like this 'elements'
				[".col-sm-6_1",				"col-sm-6_1",					'animated zoomInRight',			true]
													],												// Call columns like
																										// this 'components'
																										// for each inividual
			[
				".part_3",
				[".icontext1",				"icontext1",					'animated zoomInRight',			true],
				[".icontext2",				"icontext2",					'animated zoomIn',					true],
				[".icontext3",				"icontext3",					'animated zoomInLeft',			true],
				[".secondpageicon1",	"secondpageicon1",		'animated zoomInRight',			true],
				[".secondpageicon2",	"secondpageicon2",		'animated zoomIn',					true],
				[".secondpageicon3",	"secondpageicon3",		'animated zoomInLeft',			true]
			],

			[
				".square1",
				[".imgA", 						"imgA", 							"animated zoomInRight",			false]
			],

			[
				".square2",
				[".imgB", 						"imgB", 							"animated zoomInLeft",			false]
			]
		];

		var imgA_trigger = 2;
		var imgB_trigger = 3;
		/*
		SYNTAX:	section_parts[i][j][k];
			i = sections (ex. 'secondpage'),
			j = elements needed to animate in said section (ex. ['.missionpicture', 'missionpicture', 'animated zoomInLeft']
				--> all correspond to the "missionpicture" image),
			k = specific component of said element (ex. '.missionpicture' or 'animated zoomInRight')
				1. first box represents components that need the '.'
				2. second box represents components that don't need the '.'
					- for syntax purposes, some functions require '.' and some don't
				3. third box represents animation desired for this component
		*/

		var done_once = new Array(0);
		for (var i = 0; i < section_parts.length; i++)
		{
			done_once.push(false);
		}
		/*
		Done so that the animations functions don't repeat. Although getting rid of this will not affect
			the final result, it will hinder computational power. However, I am not sure of the details.
			More explained where this is used.
		*/

		var countup_done = [false, false];
		document.getElementById("count1").style.visibility = "hidden";
		document.getElementById("count2").style.visibility = "hidden";

		// 		Set all the element's visibility off before going further
		for (var i = 0; i < section_parts.length; i++)
		{
			for (var j = 1; j < section_parts[i].length; j++)
			{
				document.getElementById(section_parts[i][j][1]).style.visibility = "hidden";
			}
		}

		// Will start running this code once the user starts scrolling
		$(window).scroll(function()
		{
			/*
			program will check to see which section the user is on
				via a for-loop
			*/
		   for (var i = 0; i < section_parts.length; i++)
		   {
			   // Setting up variables to calculate when animation should start
			   var hT = $(section_parts[i][0]).offset().top,
					// how far down the element is from the top
			   hH = $(section_parts[i][0]).outerHeight(),
					// how tall the element is

			   wH = $(window).height(),
					// height of user window

			   wS = $(this).scrollTop();
					// how much user has scrolled

			   var c = 0.15;
				 if (document.documentElement.clientWidth <= 753)
				 {
					 c = -0.1;
				 }

			   /*
						Methodology of equation:
							wS + wH = hT + x
							x = c * wH
								x is the amount of space from the bottom of the screen
								that the user must be at before the animations start
			   */
					// equation below was determined by hand from equation above
			   if ((c * wH < wS + wH - hT) && (done_once[i] === false))
			   {

					for(var j = 1; j < section_parts[i].length; j++)	// going through each element in the section
					{
						// Turning on visibility of each element in the section:
						console.log(document.documentElement.clientWidth);
						if (!(section_parts[i][j][3] === false && document.documentElement.clientWidth <= 750))
						{
							// on the mobile display, we don't want imgA nor imgB to show, thus this if-statement
							var object = document.getElementById(section_parts[i][j][1]);
							object.style.visibility = "visible";
							object.style.transition = "all .5s ease-in-out";

							// Animating the element:
							object.className += " " + (section_parts[i][j][2]);
									/*
										for reference on how the function above works, refer to:
											1. https://www.youtube.com/watch?v=3Nv8Hon1qwk
											2. https://daneden.github.io/animate.css/
									*/
						}
						invoke_percent(i);
					}
					done_once[i] = true;
			   }
		   }
		});

		// For the counting-up functions of the 95% and 80%
		function invoke_percent(j)
		{
			console.log(j);
			if (j === imgA_trigger && countup_done[0] == false)
			{
				setTimeout(function rand()
				{
					document.getElementById("count1").style.visibility = "visible";
					$('.count1').each(function ()
					{
						if (countup_done[0] == false)
						{
							$(this).prop('Counter1',0).animate(
							{
								Counter1: $(this).text()
							},
							{
								duration: 4000,
								easing: 'swing',
								step: function (now)
								{
									$(this).text(Math.ceil(now) + "%");
								}
							});
						}
					});
					countup_done[0] = true;
				},1000)
			}
			if ( j === imgB_trigger && countup_done[1] == false)
			{
				setTimeout(function rand()
				{
					document.getElementById("count2").style.visibility = "visible";
					$('.count2').each(function ()
					{
						if (countup_done[1] == false)
						{
							$(this).prop('Counter2',0).animate(
							{
								Counter2: $(this).text()
							},
							{
								duration: 4000,
								easing: 'swing',
								step: function (now)
								{
									$(this).text(Math.ceil(now) + "%");
								}
							});
						}
					});
					countup_done[1] = true;
				}, 1000);
			}
		}
});
