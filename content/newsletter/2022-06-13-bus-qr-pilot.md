---
title: "Bus Stop QR Pilot Project"
description: Results from the pilot of our Bus Stop QR codes
date: 2022-06-13
---
<p class="text-center"><img src="/bus-sign.jpg" alt="sign example" style="width:100%"/></p>

*By Todd Morse*

The Bus Stop QR code project is an experiment to make riding the GP Metro buses more convenient. One of the goals of Livable Portland is increasing transit ridership. I believe one of the best ways to do that is focusing on improving rider experience. This can mean more frequent buses, but it can also mean better stops. A lot of transit systems have digital signs letting people know when the next bus or train is coming and alerting them of any potential delays. Unfortunately, digital signs can get pretty expensive, so it would be cool if we could provide a similar level of service at a much lower cost. That was the inspiration behind the QR code signs. Once a rider scans the QR code they should be instantly taken to a version of a digital sign on their phones. Hopefully, this will provide an experience that is as smooth as we can possibly get without buying a lot of expensive signs.

Luckily, GP Metro has made this possible by providing all sorts of real time transit data for free through their [API](https://smttracker.com/api/). Anyone can use this API to build a website or app with real time transit data. This is already being used to make transit information available to riders in a few ways like: the [UMO App](https://umomobility.com/), Google Maps, the [SMTT tracker](https://smttracker.com/), and at stops via text message.

Even though options for getting transit information already exist I thought rider experience might be improved by providing an even faster way to get live transit data right at each stop. Right now GP Metro has it set up so you can access this data by texting the stop number to a phone number they have set up. Their system will reply to your text with arrival time estimates. This is a great service but it has a few limitations compared to the QR code approach:

1. Text messaging rates may apply depending on your phone plan
1. You need to send additional text messages to get updated information
1. Typing the specific numbers into your phone is less convenient then scanning a QR code
1. This method doesn't offer support for multiple languages, at least not easily
1. The types of information you get are pretty limited

So I created a QR based transit tracker to address some of these limitations. Once a rider scans the QR code, located at each stop, they are taken to a page with predicted arrival times times that update live:

<p class="text-center"><img src="/bus-app-screenshot.jpg" alt="bus app screenshot" style="width:30%"/></p>

There is no need to download anything or send any text messages, just one scan and the times are right there. One drawback is that people need a smartphone to use the QR codes, but the QR codes are not intended to replace what we have already, just to give some people another option. Though the page is still pretty rough, but I added a few elements that I think will really improve user experience:

1. The page loads fast, even on slow networks and older phones. I will talk more about this in my tech stuff section
1. The page updates live with new information, no need to reload or send a second text message
1. The page has seconds that tick down in real time. Of course, bus predictions may not be accurate to the second but the ticking down seconds communicates to the user that the page is live and they don't need to reload.
1. The page has support for multiple languages. It auto-detects the language of the browser and allows users to set their own language with the globe in the top right. This is still pretty limited because the translations are just from Google Translate and some of the stuff that comes straight from the API isn't translated but it should keep the page at least usable.
1. The page serves as a hub for information, communicating to users they can download the UMO App, providing links to the map, and linking to the Adopt-a-stop program

Hopefully, this provides a better experience to riders, especially newer riders. It can help introduce people to the system by providing information in a frictionless way and linking them to other resources. Once you are a regular rider the UMO App may be a better choice for day to day use.

I wanted to see if riders would actually like it, so I decided to set up a pilot. I chose 10 different stops and printed QR code signs onto plastic and taped them up at those stops. I set up Google Analytics on the site to anonymously see how many people were using it.

Here is a report of active users per day since it was set up:

<p class="text-center"><img src="/users-by-time.png" alt="users per day" style="width:100%"/></p>

It looks like for our 10 stops we have about 0-6 unique users per day. This isn't a huge amount but it isn't terrible compared to the number of stops the QR codes are set up at. Usage is also pretty consistent, not trending up or down, which makes sense because any growth in use would probably be driven by an increase in transit usage or adding QR codes to more stops. Though it does seem that the people who do use it like it because of our 52 total users, 23 of them returned at least once. This is actually pretty high for websites and apps.

So it looks like the QR codes aren't super widely used but a small number of people are consistently getting a bit of value from them. Does this mean the experiment was a success? I am honestly not sure. It is certainly better than no usage, though it is pretty low overall. However, I am not sure how used the stops are in general so I don't have much to compare the numbers to. I think some good next steps would be gathering direct feedback from people as well as reaching out to GP Metro to see how these numbers compare to their expectations.

### How it was Made

This project is 100% open source. Feel free to check out the source code on [Github](https://github.com/morsecodist/livable-portland-website/). Right now the whole project is hosted as a [Digital Ocean App](https://www.digitalocean.com/products/app-platform) for just $5 a month. I also use the free tier of Redis Cloud for some caching.

The QR codes just contain links to specific pages on this website. Each stop has it's own page like [https://livableportland.me/transit-times/stops/1117](https://livableportland.me/transit-times/stops/1117) that is encoded into the QR code for that stop. The website is created using SvelteKit. This is what makes the page loads so fast while keeping the app responsive. Svelte is a super cool web application framework that translates state changes in your website into simple, minimal JavaScript updates. Web frameworks like React made it easy to make websites that felt like Apps, with a lot of moving parts but React does that by changing a virtual version of the page, then do a comparison of the real page and the virtual page, then applying updates. This means you need all of React to be loaded every time you load your website and it has to do a lot of work every time there's a change. Svelte analyzes your code in advance, figures out the changes you will have to make, and only leaves in the bits of code it needs to perform your specific updates. This keeps your website super minimal and fast while still allowing you to create rich web experiences easily.

SvelteKit makes things even better by building the final version of the web page on the server, sending a finished web page to the user, then svelte will make any changes to the web page on the user's device. On web apps with a lot of moving parts you may be used to seeing a white screen or some loading spinners when you first load the page. This is usually because your device is doing the work of building the web page, usually it also needs to fetch even more data over the internet before the page can be loaded. This is particularly bad for lower-power devices and slow internet, like people using their phones. With SvelteKit users get a finished page immediately, no need to fetch any more data or construct a page on the user's device.

The wep page polls the server every 10 seconds to check if the predictions have changed. However, GP Metro's API limits the number of requests you can make so to keep it under control I use a cache. The cache will hold the predictions for a stop for 30 seconds, so if more than one person is using the App at a stop they can both see the data without calling GP Metro's API twice. This also means I can poll for updates pretty frequently without worrying about stressing out GP Metro's API. [Redis Cloud](https://redis.com/redis-enterprise-cloud/pricing/) offers a free cache for very small caches like this one so I set it up through them.

I made the signs by designing them with HTML and CSS, templating them with [jinja](https://jinja.palletsprojects.com/en/3.1.x/), filling the templates in with the information and QR codes for each stop, then rendering the HTML as a PDF. I did all of this with python.

**Update**: Updated references to Redis Labs to the new name and website of their hosted offering Cloud
