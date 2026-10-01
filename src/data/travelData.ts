import { TravelBundle } from '../types/travel';

export const TRAVEL_BUNDLES: TravelBundle[] = [
  // --- COUPLE BUNDLES ---
  {
    id: 'couple-santorini-amalfi',
    title: 'The Aegean Sunset & Cliffside Sanctuary',
    category: 'couple',
    destination: 'Santorini & Oia Caldera',
    country: 'Greece',
    durationDays: 7,
    pace: 'Relaxed',
    vibe: 'Romantic · Golden Hour · Wine & Caldera Views',
    groupSpec: 'Curated for 2 travelers',
    priceEstimate: '$2,850 / couple',
    heroImage: '/src/assets/images/bundle_couple_getaway_1790782435019.jpg',
    shortDescription: 'Private cave suites, sunset catamaran cruises, secluded volcanic vineyards, and uninterrupted Aegean horizons.',
    fullOverview: 'Crafted exclusively for couples seeking stillness, romantic intimacy, and unforgettable scenery. Every dinner reservation has been pre-secured at tables with prime sunset caldera positioning, and transfers are seamlessly coordinated.',
    highlights: [
      'Private sunset catamaran charter past Red Beach & Thirassia',
      'Indigenous Assyrtiko wine tasting in an 18th-century cellar',
      'Sunrise hike along the cliff path from Imerovigli to Oia',
      'Private candlelit dinner overlooking the volcanic caldera'
    ],
    included: [
      '7 nights in cave suite with private caldera plunge pool',
      'Daily artisanal Greek breakfast delivered to your terrace',
      'Semi-private catamaran excursion with fresh seafood lunch',
      'Private luxury Mercedes airport and ferry transfers',
      'Curated offline GPS map with quiet viewpoints and hidden bakeries',
      '24/7 Trip Pilot concierge on WhatsApp'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Arrival into Caldera Dreams',
        location: 'Imerovigli',
        morning: 'Touchdown in Thira. Private chauffeur transfer through volcanic vineyards to your cliffside suite in quiet Imerovigli.',
        afternoon: 'Unpack, cool down in your private terrace plunge pool, and sip complimentary Santo sparkling wine while watching the light shift.',
        evening: 'Sunset dinner at a cliffside taverna featuring fresh sea bass carpaccio and grilled octopus.',
        insiderTip: 'Imerovigli is 300m above sea level—far quieter than Fira and offers unobstructed sunset lines without the cruise crowds.',
        stay: 'Grace Cliff Sanctuary Suites'
      },
      {
        dayNumber: 2,
        title: 'The Ridge Trail & Secret Oia Patios',
        location: 'Oia & Megalochori',
        morning: 'Morning walk along the cliff rim path. Soft breeze, whitewashed bell towers, and dramatic panoramic drops into the caldera.',
        afternoon: 'Afternoon siesta followed by a stroll through Megalochori, a traditional inland village with pirate caves and bougainvillea arches.',
        evening: 'Private balcony reservation at sunset with local lamb kleftiko paired with crisp Assyrtiko.',
        insiderTip: 'Visit the historic Atlantis Books basement in Oia before 4 PM to dodge tour groups.',
        stay: 'Grace Cliff Sanctuary Suites'
      },
      {
        dayNumber: 3,
        title: 'Sails Across the Volcanic Waters',
        location: 'South Coast & Thirassia',
        morning: 'Lazy morning with breakfast pastries and Greek yogurt on the sun deck.',
        afternoon: 'Board a 44ft luxury catamaran. Swim in the secluded sulfur hot springs and snorkel around the dramatic Red Beach sea caves.',
        evening: 'Sunset barbecue on board as the sun dips below the Aegean horizon, returning under starlit skies.',
        insiderTip: 'Bring dark swimwear for the volcanic springs, as mineral-rich sulfur can stain pale fabrics.',
        stay: 'Grace Cliff Sanctuary Suites'
      },
      {
        dayNumber: 4,
        title: 'Artisan Cellars & Hidden Coves',
        location: 'Pyrgos & Akrotiri',
        morning: 'Private driver pickup for an exclusive tour of Akrotiri, the prehistoric Minoan bronze-age city preserved under volcanic ash.',
        afternoon: 'Private sommelier tasting at an organic estate winery tucked into the hills of Pyrgos.',
        evening: 'Tasting menu at a secluded terrace overlooking the southern lighthouse.',
        insiderTip: 'The view from Pyrgos Venetian Castle at dusk rival Oia with only a fraction of the people.',
        stay: 'Grace Cliff Sanctuary Suites'
      },
      {
        dayNumber: 5,
        title: 'Couple Spa & Coastal Solitude',
        location: 'Perivolos Black Beach',
        morning: 'Couples massage infused with local olive oil and volcanic basalt stones.',
        afternoon: 'Reserved sun loungers at a tranquil beach club on the black volcanic sands of Perivolos.',
        evening: 'Stargazing dinner on the sand with grilled Aegean lobster and chilled retsina.',
        insiderTip: 'Wear sandals on the black sand after 11 AM—volcanic grains absorb intense afternoon sun.',
        stay: 'Grace Cliff Sanctuary Suites'
      },
      {
        dayNumber: 6,
        title: 'Photography & Sunset Over Oia',
        location: 'Oia',
        morning: 'Early 7 AM golden-hour stroll through blue-domed alleys before tour boats arrive.',
        afternoon: 'Relaxed cafe hopping, shopping for handmade silver jewelry, and gelato sampling.',
        evening: 'Farewell feast at an intimate family-run cliffside restaurant with prime views.',
        insiderTip: 'Ask your concierge for table 4—it sits isolated on the lower stone promontory.',
        stay: 'Grace Cliff Sanctuary Suites'
      },
      {
        dayNumber: 7,
        title: 'Warm Memories & Homeward Journey',
        location: 'Thira Departure',
        morning: 'Farewell morning espresso overlooking the calm sea. Souvenir honey and wild oregano pickup.',
        afternoon: 'Private chauffeur transfer to Santorini National Airport or port for your journey home.',
        evening: 'Arrival back with unforgettable memories and sun-kissed skin.',
        insiderTip: 'Keep your camera handy during takeoff; caldera views from the port side of the aircraft are spectacular.',
        stay: 'Homebound'
      }
    ],
    featured: true
  },

  // --- FAMILY BUNDLES ---
  {
    id: 'family-swiss-alps-adventures',
    title: 'Swiss Alps Storybook & Funicular Odyssey',
    category: 'family',
    destination: 'Interlaken, Grindelwald & Lucerne',
    country: 'Switzerland',
    durationDays: 8,
    pace: 'Balanced',
    vibe: 'Wholesome · Cable Cars · Alpine Lakes & Chocolate',
    groupSpec: 'Crafted for families of 3 to 6',
    priceEstimate: '$4,200 / family',
    heroImage: '/src/assets/images/bundle_family_adventure_1790782447745.jpg',
    shortDescription: 'Kid-friendly alpine trails, cogwheel trains through waterfalls, chocolate workshops, and zero-stress family transit passes.',
    fullOverview: 'Designed for families who want alpine wonder without parental logistics exhaustion. Hand-tested stroller-friendly paths, fun interactive scavenger hunts for kids, and luggage pre-forwarding between rail stations so parents never wrestle suitcases.',
    highlights: [
      'Swiss Chocolate atelier hands-on workshop in Lucerne',
      'First Cliff Walk suspension bridge & gentle trottibike ride in Grindelwald',
      'Steamer paddle-boat cruise across Lake Brienz to Giessbach Falls',
      'Open-air cogwheel train journey to Mt. Rigi with alpine playground'
    ],
    included: [
      '8-day Swiss Family Travel Pass (kids travel 100% free)',
      'Station-to-station luggage transfer service throughout',
      '7 nights in family interconnecting suites in Lucerne & Grindelwald',
      'Private chocolate masterclass for parents and kids',
      'Daily family buffet breakfasts featuring fresh mountain dairy',
      'Pilot Family Emergency Kit + 24/7 on-call family advisor'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Welcome to the Lakeside Storybook',
        location: 'Lucerne',
        morning: 'Arrive at Zurich Airport. Seamless panoramic train connection directly to Lucerne. Station luggage forwarded directly to hotel.',
        afternoon: 'Check in to lakeside family lodge. Easy walk across the historic wooden Chapel Bridge (Kapellbrücke) admiring medieval roof paintings.',
        evening: 'Casual welcome fondue & rösti dinner at a riverside tavern with children’s play corner.',
        insiderTip: 'Pick up the free Lucerne Swan Scavenger Map from the station desk to keep youngsters engaged on the walk.',
        stay: 'Hotel des Balances Family Suites'
      },
      {
        dayNumber: 2,
        title: 'Chocolate Masters & The Queen of Mountains',
        location: 'Mt. Rigi & Lucerne',
        morning: 'Hands-on artisanal Swiss chocolate workshop: kids craft custom praline bars with dried berries and caramelized hazelnuts.',
        afternoon: 'Historic paddle steamer cruise across Lake Lucerne to Vitznau, connecting to Europe’s oldest cogwheel train climbing Mt. Rigi.',
        evening: 'Picnic at Rigi Kulm summit overlooking 13 alpine lakes, followed by playground exploration at Rigi Staffel.',
        insiderTip: 'The front carriage of the vintage cogwheel train offers kids an unobstructed view of the track mechanisms.',
        stay: 'Hotel des Balances Family Suites'
      },
      {
        dayNumber: 3,
        title: 'Deep Into the Jungfrau Peaks',
        location: 'Grindelwald',
        morning: 'Scenic GoldenPass Express train into the Bernese Oberland, arriving into Grindelwald nestled beneath the north face of the Eiger.',
        afternoon: 'Settle into chalet lodge with mountain meadow views. Stroll through the village toy shop and dairy farm.',
        evening: 'Traditional Swiss alpine dinner with cheese raclette and homemade apple strudel.',
        insiderTip: 'The local bakeries sell freshly baked hazelnut leckerli cookies that make great trail snacks.',
        stay: 'Romantik Chalet Grindelwald'
      },
      {
        dayNumber: 4,
        title: 'Grindelwald First & The Eagle Flight',
        location: 'Grindelwald First',
        morning: 'Gondola ride up to Grindelwald First. Walk the cantilevered First Cliff Walk walkway jutting out over alpine cliffs (totally enclosed and kid-safe).',
        afternoon: 'Gentle family hike along the gravel path to crystal-clear Lake Bachalpsee, with peaks reflected in the mirror water.',
        evening: 'Family board games by the chalet fireplace after hearty alpine soup.',
        insiderTip: 'Pack light rain jackets—weather can shift quickly in the high meadows, even on sunny mornings.',
        stay: 'Romantik Chalet Grindelwald'
      },
      {
        dayNumber: 5,
        title: 'Waterfalls & Underground Marvels',
        location: 'Lauterbrunnen Valley',
        morning: 'Take the local train to Lauterbrunnen, the valley of 72 waterfalls that inspired Tolkien’s Rivendell.',
        afternoon: 'Explore Trümmelbach Falls—the world’s only glacier waterfalls inside a mountain cave, accessed by underground lift.',
        evening: 'Picnic beside Staubbach Falls watching the mist drift down 300 meters into green meadows.',
        insiderTip: 'The cave mist can be cool (around 10°C), so pack a fleece for kids even in summer.',
        stay: 'Romantik Chalet Grindelwald'
      },
      {
        dayNumber: 6,
        title: 'Turquoise Lakes & Historic Steamers',
        location: 'Lake Brienz',
        morning: 'Ferry ride across turquoise Lake Brienz to the grand historic Grandhotel Giessbach.',
        afternoon: 'Walk behind the rushing cascades of Giessbach Falls on safe wooden platforms.',
        evening: 'Barbecue dinner along the lakeshore with stone skimming and sunset canoe rental.',
        insiderTip: 'The vintage funicular railway from the dock up to the hotel is the oldest cable railway in Europe.',
        stay: 'Romantik Chalet Grindelwald'
      },
      {
        dayNumber: 7,
        title: 'Open Meadow Play & Cheese Farm',
        location: 'Mürren',
        morning: 'Car-free mountain village excursion to Mürren via cable car and clifftop train.',
        afternoon: 'Visit an alpine dairy farm where children can watch traditional copper-vat cheese making and pet gentle Simmental cows.',
        evening: 'Celebration dinner overlooking the Eiger, Mönch, and Jungfrau trio.',
        insiderTip: 'The playground at Allmendhubel features the "Flower Trail" with giant wooden marmot slides.',
        stay: 'Romantik Chalet Grindelwald'
      },
      {
        dayNumber: 8,
        title: 'Scenic Rail & Homeward Smiles',
        location: 'Zurich Departure',
        morning: 'Express panoramic train through rolling Swiss countryside directly to Zurich Airport train terminal.',
        afternoon: 'Easy flight departure with luggage already checked in at the rail station.',
        evening: 'Kids arrive home with handmade chocolate badges and unforgettable mountain memories.',
        insiderTip: 'Zurich Airport has an observation deck where kids can watch international airliners take off.',
        stay: 'Homebound'
      }
    ],
    featured: true
  },

  // --- STRANGER BUNDLES (SOLO-TO-GROUP) ---
  {
    id: 'strangers-iceland-ring-road-squad',
    title: 'The Northern Lights & Ring Road Squad',
    category: 'stranger',
    destination: 'Southern Iceland & Golden Circle',
    country: 'Iceland',
    durationDays: 7,
    pace: 'Active',
    vibe: 'Adventure · Squad Vibes · Glaciers & Aurora Campfires',
    groupSpec: 'Matched cohort: 8 to 12 solo travelers (Ages 22-38)',
    priceEstimate: '$1,950 / traveler',
    heroImage: '/src/assets/images/bundle_strangers_squad_1790782460159.jpg',
    shortDescription: 'Travel solo, leave as a bonded crew. Super-jeep glacier treks, black sand bonfire stories, geothermal lagoons, and midnight aurora hunts.',
    fullOverview: 'The antidote to lonely solo travel. Trip Pilot screens and matches small cohorts of solo travelers based on pacing preferences, social energy, and outdoor curiosity. Led by a local expedition pilot who handles all driving and weather adaptation.',
    highlights: [
      'Chasing Aurora Borealis away from city light pollution with hot cocoa',
      'Crampon glacier hike on Sólheimajökull with ice axe safety gear',
      'Soaking together in the natural geothermal Secret Lagoon and Sky Lagoon',
      'Exploring the crystal ice caves beneath Vatnajökull glacier'
    ],
    included: [
      'Twin-share or private room in boutique eco-cabins & guest houses',
      'Custom 4x4 high-clearance expedition van with Wi-Fi & experienced driver-guide',
      'All technical gear (crampons, helmets, harnesses, headlamps)',
      'Pre-trip squad WhatsApp group and Icebreaker virtual meet 1 week before',
      'Daily breakfast and 3 community squad dinners',
      'Trip Pilot Cohort Facilitator to keep group dynamics relaxed and welcoming'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Strangers Assemble in Reykjavik',
        location: 'Reykjavik',
        morning: 'Arrive at Keflavik Airport. Catch the Flybus into vibrant Reykjavik. Check in to your shared boutique basecamp.',
        afternoon: 'Casual squad meet-and-greet over craft beers and Icelandic sourdough at a lively street food hall.',
        evening: 'Sunset soak in the geothermal Sky Lagoon edge pool overlooking the North Atlantic Ocean.',
        insiderTip: 'Complete the Sky Lagoon 7-step ritual—the cold plunge followed by the ocean-view sauna breaks the ice instantly!',
        stay: 'Kex Design Basecamp'
      },
      {
        dayNumber: 2,
        title: 'Golden Circle & Geothermal Bread',
        location: 'Thingvellir & Geysir',
        morning: 'Board the heated 4x4 expedition sprinter. Walk between tectonic plates at Thingvellir National Park.',
        afternoon: 'Witness Strokkur geyser blast boiling water 30 meters high; unearth rye bread baked directly in geothermal volcanic sand.',
        evening: 'Arrive at rustic timber cabins in Hella. First night squad campfire with aurora alerts on standby.',
        insiderTip: 'Download the Aurora app, but trust your driver-guide—they read real-time cloud satellite maps for gaps.',
        stay: 'Stracta Timber Cabins'
      },
      {
        dayNumber: 3,
        title: 'Waterfalls & The Black Sand Coast',
        location: 'Seljalandsfoss & Vik',
        morning: 'Walk completely behind the thunderous 60m curtain of Seljalandsfoss waterfall (full waterproofs required!).',
        afternoon: 'Explore the moody basalt sea stacks and black volcanic pebbles of Reynisfjara beach.',
        evening: 'Squad fish soup dinner in Vik village followed by cards and storytelling under the stars.',
        insiderTip: 'Never turn your back on the waves at Reynisfjara—sneaker waves are real and sudden.',
        stay: 'Vik Black Sand Lodge'
      },
      {
        dayNumber: 4,
        title: 'Crampons on Ancient Glaciers',
        location: 'Sólheimajökull Glacier',
        morning: 'Strap on steel crampons and grip ice axes for a guided walk across ancient blue crevasses on Sólheimajökull.',
        afternoon: 'Learn about the volcanic ash layers trapped in the ice dating back hundreds of years.',
        evening: 'Hot springs dip at the historic Seljavallalaug pool hidden in a mountain pass.',
        insiderTip: 'Wear woolen base layers; synthetic fabrics retain moisture while merino keeps you warm even when damp.',
        stay: 'Vik Black Sand Lodge'
      },
      {
        dayNumber: 5,
        title: 'Floating Icebergs of Jökulsárlón',
        location: 'Jökulsárlón & Diamond Beach',
        morning: 'Drive east along the dramatic southern plains to the breathtaking Jökulsárlón glacier lagoon.',
        afternoon: 'Watch turquoise icebergs drift into the ocean and wash up like cut diamonds on the black sand beach.',
        evening: 'Group cooking night at the lakeside chalet: grilling Arctic char and sharing road trip playlists.',
        insiderTip: 'Keep an eye on the lagoon waters—curious harbor seals frequently poke their heads up between ice floes.',
        stay: 'Fosshotel Glacier Horizon'
      },
      {
        dayNumber: 6,
        title: 'Secret Canyon & Aurora Hunt Farewell',
        location: 'Fjaðrárgljúfur & South Coast',
        morning: 'Morning walk along the dramatic rims of Fjaðrárgljúfur, a 100m deep moss-carpeted canyon.',
        afternoon: 'Scenic cruise back toward Reykjavik with stops at turf-roofed farm churches and lava fields.',
        evening: 'Farewell feast at a harbor brewery in Reykjavik celebrating inside jokes and newly formed lifelong friendships.',
        insiderTip: 'Most squads end up creating a permanent group chat; over 65% of our solo travelers book another trip together next year!',
        stay: 'Kex Design Basecamp'
      },
      {
        dayNumber: 7,
        title: 'Flight Home as a Crew',
        location: 'Keflavik Departure',
        morning: 'Farewell coffee and cinnamon buns at Brauð & Co. Shared airport transfer back to Keflavik.',
        afternoon: 'Hugs at departures, boarding flights with camera rolls filled with photos and memories.',
        evening: 'Touching down home with friends across 4 different cities.',
        insiderTip: 'Exchange shared Google Photos albums before takeoff while airport Wi-Fi is fast.',
        stay: 'Homebound'
      }
    ],
    featured: true
  },

  // Additional bundle cards
  {
    id: 'couple-kyoto-zen-gardens',
    title: 'Kyoto Bamboo Trails & Private Ryokan',
    category: 'couple',
    destination: 'Kyoto & Hakone',
    country: 'Japan',
    durationDays: 6,
    pace: 'Relaxed',
    vibe: 'Mindful · Hot Spring Onsen · Kaiseki Dining',
    groupSpec: 'Curated for 2 travelers',
    priceEstimate: '$2,950 / couple',
    heroImage: '/src/assets/images/bundle_couple_getaway_1790782435019.jpg',
    shortDescription: 'Cedar-wood hot spring onsens, morning private tea ceremonies, and dawn walks through Arashiyama bamboo forest before the city wakes.',
    fullOverview: 'An immersive sanctuary for couples. Stay in a century-old riverside ryokan in Hakone with your own private open-air mineral onsen, followed by bullet-train access to Kyoto for authentic culinary journeys.',
    highlights: [
      'Private dawn entrance to Arashiyama bamboo grove without crowds',
      'Exclusive 10-course Michelin-starred seasonal Kaiseki feast',
      'Private outdoor cypress onsen bath with mountain forest views',
      'Tea masterclass in a 200-year-old traditional machiya townhome'
    ],
    included: [
      '6 nights in premium heritage ryokan and boutique design hotels',
      '7-day Japan Rail Pass with pre-reserved green car luggage space',
      'Private licensed English-speaking cultural guide for 2 days',
      'Pocket Wi-Fi device and customized offline map routes'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Arrival in Kyoto & Gion Lanterns',
        location: 'Kyoto',
        morning: 'Shinkansen arrival at Kyoto Station. Private transfer to your luxury machiya near the Kamogawa river.',
        afternoon: 'Stroll through cobblestone preservation lanes of Gion as paper lanterns flicker to life.',
        evening: 'Intimate multi-course kaiseki dinner featuring seasonal yuba and Kyoto wagyu.',
        insiderTip: 'Walk the Shirakawa canal path after 8 PM for quiet reflection and lantern-lit stone bridges.',
        stay: 'Sowaka Heritage Ryokan'
      },
      {
        dayNumber: 2,
        title: 'Bamboo Sanctuary & Temple Gardens',
        location: 'Arashiyama',
        morning: 'Early 6:30 AM private rickshaw ride through Arashiyama bamboo grove before morning foot traffic.',
        afternoon: 'Explore Tenryu-ji temple’s zen pond garden, designated a world heritage treasure.',
        evening: 'Matcha green tea tasting overlooking the cascading Oi river.',
        insiderTip: 'Cross the Togetsukyo bridge to the south bank for the best mountain reflections.',
        stay: 'Sowaka Heritage Ryokan'
      }
    ]
  },
  {
    id: 'family-costa-rica-wildlife',
    title: 'Costa Rica Rainforest & Volcano Safari',
    category: 'family',
    destination: 'Arenal & Manuel Antonio',
    country: 'Costa Rica',
    durationDays: 7,
    pace: 'Active',
    vibe: 'Wildlife · Sloths & Toucans · Warm Ocean Beaches',
    groupSpec: 'Crafted for families of 3 to 6',
    priceEstimate: '$3,800 / family',
    heroImage: '/src/assets/images/bundle_family_adventure_1790782447745.jpg',
    shortDescription: 'Canopy hanging bridges, wild sloth spotting, geothermal hot spring cascades, and kid-friendly surf lessons in warm Pacific waves.',
    fullOverview: 'The ultimate nature playground for curious kids and adventure-loving parents. Safe, private van transport with experienced naturalist drivers who stop for roadside wild coatis and toucan sightings.',
    highlights: [
      'Guided night walk with infrared flashlights to spot red-eyed tree frogs',
      'Hanging bridge trek through the rainforest canopy facing Arenal Volcano',
      'Kid-friendly beginner surf clinic in calm Manuel Antonio bay',
      'Relaxation in natural thermal mineral rivers under tropical jungle foliage'
    ],
    included: [
      '7 nights in family rainforest lodges with private volcano terraces',
      'Dedicated bilingual naturalist guide and private air-conditioned van',
      'All national park entry permits and wildlife spotting scopes',
      'Daily farm-to-table tropical breakfasts and 2 traditional casados lunches'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Touchdown in San José to Volcano Base',
        location: 'Arenal',
        morning: 'Arrive in San José. Meet your dedicated family driver-guide with chilled coconuts and fresh fruit.',
        afternoon: 'Scenic drive through coffee hills toward the iconic conical silhouette of Arenal Volcano.',
        evening: 'Check into rainforest villa; kids take their first dip in natural hot spring pools.',
        insiderTip: 'Keep your binoculars handy on the drive—you’ll likely spot roadside sloths resting in cecropia trees.',
        stay: 'Arenal Springs Resort'
      },
      {
        dayNumber: 2,
        title: 'Canopy Walk & Sloth Discovery',
        location: 'Mistico Hanging Bridges',
        morning: 'Morning walk across 16 hanging bridges high above the jungle canopy with a telescope guide.',
        afternoon: 'Visit a family-run chocolate plantation to pick fresh cacao pods and taste melted chocolate fondue.',
        evening: 'Evening jungle night-walk: listen to the roar of howler monkeys and find hidden glass frogs.',
        insiderTip: 'Wear closed-toe trail sneakers for the hanging bridges—they are sturdier than sandals on wet metal grates.',
        stay: 'Arenal Springs Resort'
      }
    ]
  },
  {
    id: 'strangers-peru-inca-trail',
    title: 'The Sacred Valley & Inca Trail Cohort',
    category: 'stranger',
    destination: 'Cusco & Machu Picchu',
    country: 'Peru',
    durationDays: 8,
    pace: 'Active',
    vibe: 'High Altitude · Team Camaraderie · Ancient Mysteries',
    groupSpec: 'Matched cohort: 8 to 12 solo adventurers (Ages 24-42)',
    priceEstimate: '$2,100 / traveler',
    heroImage: '/src/assets/images/bundle_strangers_squad_1790782460159.jpg',
    shortDescription: 'Conquer Dead Woman’s Pass together, camp under Andean stars, explore vibrant Cusco markets, and arrive through the Sun Gate to Machu Picchu.',
    fullOverview: 'Form deep bonds through shared endurance and awe. Our small-group solo cohort is fully supported by veteran Quechua porters, gourmet trail chefs, and two certified wilderness mountain guides.',
    highlights: [
      'Classic 4-day Inca Trail supported by licensed Quechua mountain porters',
      'Sunrise arrival through Inti Punku (Sun Gate) overlooking Machu Picchu',
      'Acclimatization walking tour of bohemian San Blas in Cusco with local coffee',
      'Nightly hot dining tent banquets and card games at 3,600m altitude'
    ],
    included: [
      'All official government Inca Trail permits and Machu Picchu tickets',
      'Twin four-season North Face mountain tents and foam sleeping pads',
      'Full porter team carrying group gear and 6kg of personal duffel per trekker',
      'Pre-trek cohort altitude briefing and group welcome dinner in Cusco'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Gathering in Ancient Cusco',
        location: 'Cusco (3,400m)',
        morning: 'Arrive in Cusco. Easy check-in to historic colonial courtyard hotel. Rest and sip hot muña mint tea to acclimate.',
        afternoon: 'Casual walking tour through cobblestone alleys and San Pedro market to try fresh maracuyá juices.',
        evening: 'Cohort welcome dinner at an Andean kitchen to meet your guides and fellow trekkers.',
        insiderTip: 'Drink plenty of water and keep day 1 slow to allow your lungs to adapt to 3,400m altitude smoothly.',
        stay: 'Antigua Casona San Blas'
      },
      {
        dayNumber: 2,
        title: 'Sacred Valley Salt Mines & Ruins',
        location: 'Maras & Ollantaytambo',
        morning: 'Drive down into the warmer Sacred Valley of the Incas to visit the geometric salt pans of Maras.',
        afternoon: 'Climb the colossal stone agricultural terraces of Ollantaytambo fortress.',
        evening: 'Final gear check and squad packing session over craft Andean quinoa beer.',
        insiderTip: 'Ensure your headlamp has fresh batteries; morning trail departures start before dawn!',
        stay: 'El Albergue Ollantaytambo'
      }
    ]
  }
];

export const TRAVEL_FAQ = [
  {
    q: 'How does the "Stranger Bundle" actually work? Is it safe and well-matched?',
    a: 'Stranger Bundles are designed for solo travelers who want the freedom of traveling alone without the isolation. Before finalizing any squad, we run a short 3-minute lifestyle & tempo quiz (wake-up time, nightlife vs nature focus, activity level, and age group). We cap groups at 8–12 travelers, assign a dedicated Trip Pilot Cohort Host, and organize an icebreaker virtual lounge one week before departure. Safety, verified IDs, and mutual respect are our top standards.'
  },
  {
    q: 'Can we modify an existing Couple or Family bundle?',
    a: 'Absolutely! Every pre-curated bundle can be personalized. You can lengthen or shorten the trip, upgrade accommodations (e.g., from deluxe hotel to private pool villa), add specific excursions, or swap destinations. You can also chat directly with our concierge bot or request a custom itinerary.'
  },
  {
    q: 'How do you handle custom itinerary planning requests?',
    a: 'You submit your destination wishlist, budget, and travel preferences via our interactive planner or chatbot. Our certified travel pilots analyze optimal flight routes, seasonal weather, off-peak timing, and boutique stays. Within 24–48 hours, you receive an interactive digital blueprint with day-by-day maps, bookable links, and local perks.'
  },
  {
    q: 'How does the chatbot work with your n8n backend?',
    a: 'Our on-page chatbot sends structured JSON requests to your configured n8n webhook endpoint. Your n8n workflow can connect directly to AI models (like Gemini or OpenAI), CRM systems (like Airtable, Notion, or HubSpot), or email dispatchers. In the chat widget, click "Settings" anytime to test your webhook URL, view payload structures, or toggle back to our built-in simulator.'
  }
];

export const TESTIMONIALS = [
  {
    author: 'Elena & Julian M.',
    type: 'Couple Bundle · Santorini & Amalfi',
    location: 'Zurich, Switzerland',
    quote: 'Trip Pilot found cliffside tables and private boat coves that simply aren’t on Google. It felt like an intimate adventure planned by a close friend with impeccable taste.',
    metrics: '7-day romantic getaway · Zero logistical friction'
  },
  {
    author: 'The Ramirez Family (2 adults, 3 kids)',
    type: 'Family Bundle · Swiss Alps & Funiculars',
    location: 'Austin, TX',
    quote: 'Traveling with kids aged 5, 8, and 12 used to mean endless packing stress. Trip Pilot’s station-to-station luggage transfer and tested stroller routes made this our most joyful family trip ever.',
    metrics: '8 days across 4 alpine regions · 100% kid-approved'
  },
  {
    author: 'Marcus K.',
    type: 'Stranger Bundle · Iceland Ring Road Squad',
    location: 'Toronto, Canada',
    quote: 'I was hesitant about traveling with strangers. By day two, eight of us were laughing in a hot spring under the northern lights. We still meet up for dinner in Toronto and London.',
    metrics: 'Solo traveler matched into 10-person squad · Lifelong crew'
  }
];
