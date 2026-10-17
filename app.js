document.addEventListener('DOMContentLoaded', () => {

  // Destinations dataset
  const DESTINATIONS = [
    {
      id: 'spiti-valley',
      name: 'Spiti Valley & Kunzum Pass',
      region: 'Himachal Pradesh, India',
      country: 'India',
      category: 'india',
      vibe: 'mountains',
      budgetTier: 'budget',
      image: 'assets/images/hero.jpg',
      tagline: 'The Mystical Cold Desert & Ancient Silk Route',
      snippet: 'Perched in the trans-Himalayan rain shadow, Spiti offers raw gorges, 1,000-year-old mud monasteries, turquoise glacial rivers, and pure silence at 14,000 ft.',
      bestSeason: 'June to October (Passes Open)',
      bestMonths: [6, 7, 8, 9, 10],
      dailyBudgetInr: '₹1,800 – ₹4,500',
      avgDailyInr: 2800,
      idealDays: '7–10 Days',
      nearestAirport: 'Bhuntar / Chandigarh',
      highlights: [
        'Mailing postcards from Hikkim, the world’s highest post office (14,567 ft)',
        'Circumambulating the sacred Kunzum Pass stupa at 15,060 ft',
        'Morning prayer chants inside 10th-century Key Gompa',
        'Hunting for 200-million-year-old Tethys ocean fossils in Langza scree',
        'Crossing roaring glacial water streams (pagal nallahs) in a 4x4'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹1,200 – ₹1,800', desc: 'HRTC state buses, homestay dorm beds, simple dal-chawal & thukpa' },
        midRange: { rate: '₹3,000 – ₹5,500', desc: 'Shared SUV / rental Himalayan 450, private homestay room, cafe hops' },
        luxury: { rate: '₹7,500 – ₹14,000', desc: 'Private 4x4 Thar with local mountain chauffeur, boutique heritage retreats' }
      },
      foods: ['Siddu with Ghee', 'Spitian Seabuckthorn Tea', 'Hot Butter Tea (Po Cha)', 'Steaming Tingmo & Thukpa', 'Spiti Yak Cheese'],
      transitGuide: 'Enter via Shimla – Kinnaur highway (gradual acclimatization over 2 days) and exit via Kunzum Pass and the Atal Tunnel to Manali. Public HRTC buses run daily from Shimla to Kaza for under ₹600.',
      insiderTip: 'Never rush directly from Manali to Kaza without 48 hours of acclimatization. Entering via Shimla through Sangla & Kalpa reduces Acute Mountain Sickness (AMS) risk by over 85%!',
      proTipCalc: 'Traveling in a group of 3–4 lets you split private SUV and fuel costs, dropping your daily transit expense from ₹4,000 to just ₹1,000 per person.'
    },

    {
      id: 'kashmir-valley',
      name: 'Srinagar & Kashmir Valley',
      region: 'Jammu & Kashmir, India',
      country: 'India',
      category: 'india',
      vibe: 'lakes',
      budgetTier: 'mid',
      image: 'assets/images/kashmir.jpg',
      tagline: 'Paradise on Earth: Alpine Meadows & Floating Shikaras',
      snippet: 'From carved cedar houseboats on mirror-like Dal Lake to the snow-covered pine slopes of Gulmarg and wildflower meadows of Pahalgam.',
      bestSeason: 'April to October (Spring/Autumn) & Jan-Feb (Snow)',
      bestMonths: [4, 5, 6, 7, 8, 9, 10, 1, 2],
      dailyBudgetInr: '₹2,500 – ₹7,000',
      avgDailyInr: 3600,
      idealDays: '6–8 Days',
      nearestAirport: 'Srinagar International (SXR)',
      highlights: [
        'Early sunrise Shikara ride to the floating vegetable market on Dal Lake',
        'Riding the Gulmarg Gondola Phase 2 to 13,780 ft near Apharwat Peak',
        'Walk through Mughal terraced gardens (Nishat & Shalimar Bagh)',
        'Pony trek through the emerald pine forests of Baisaran (Mini Switzerland)',
        'Sipping spiced Kahwa on a carved wooden cedar houseboat veranda'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹1,500 – ₹2,200', desc: 'Local shared sumos, Old Srinagar heritage guesthouses, local street wazwan' },
        midRange: { rate: '₹3,500 – ₹6,500', desc: 'Heritage Dal Lake houseboat, private day cabs to Gulmarg/Pahalgam, multi-course Wazwan' },
        luxury: { rate: '₹12,000 – ₹25,000', desc: 'Luxury resort stays in Khyber Gulmarg, private Shikara, dedicated driver' }
      },
      foods: ['Traditional Wazwan (Rogan Josh & Gushtaba)', 'Spiced Saffron Kahwa with Crushed Almonds', 'Girda & Lavasa Breads', 'Noon Chai (Pink Salt Tea)', 'Dum Aloo Kashmiri'],
      transitGuide: 'Fly directly into Srinagar Airport (connected to Delhi, Mumbai, Bengaluru). Local travel is easiest using pre-booked private tourist taxis or shared cabs from Batamaloo bus stand.',
      insiderTip: 'Book houseboats on Nigeen Lake instead of main Dal Lake Boulevard for 10x more peace, zero commercial noise, and pristine mountain reflections.',
      proTipCalc: 'Pre-book the Gulmarg Gondola tickets online at least 3 weeks in advance on the official J&K tourism portal to skip grueling 3-hour ticket lines.'
    },

    {
      id: 'kyoto-japan',
      name: 'Kyoto & Historic Kansai',
      region: 'Kansai, Japan',
      country: 'Japan',
      category: 'international',
      vibe: 'culture',
      budgetTier: 'luxury',
      image: 'assets/images/kyoto.jpg',
      tagline: 'The Cultural Soul of Japan & Zen Temple Gardens',
      snippet: 'Home to 2,000 Buddhist temples and Shinto shrines, bamboo groves in Arashiyama, Geisha districts in Gion, and ethereal cherry blossoms in spring.',
      bestSeason: 'Late March to May (Sakura) & Oct to Nov (Autumn Foliage)',
      bestMonths: [3, 4, 5, 10, 11],
      dailyBudgetInr: '₹7,500 – ₹22,000',
      avgDailyInr: 9500,
      idealDays: '5–7 Days',
      nearestAirport: 'Osaka Kansai (KIX) / Itami (ITM)',
      highlights: [
        'Walking through 10,000 vermilion Torii gates at Fushimi Inari Taisha',
        'Exploring the whispering Arashiyama Bamboo Grove at sunrise',
        'Witnessing the gold-leaf clad Kinkaku-ji (Golden Pavilion) reflecting in pond',
        'Strolling through Gion lantern-lit alleys in search of Maiko geishas',
        'Participating in an authentic Uji ceremonial matcha tea ritual'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹4,500 – ₹7,000', desc: 'Capsule hotels/hostels, 7-Eleven onigiri & ramen bars, subway day passes' },
        midRange: { rate: '₹9,000 – ₹18,000', desc: 'Boutique ryokan guest house, Shinkansen bullet train, izakaya dining' },
        luxury: { rate: '₹28,000 – ₹60,000', desc: 'Authentic luxury wooden Machiya villa, multi-course Kaiseki dining, private tea master' }
      },
      foods: ['Kaiseki Ryori (Multi-course Haute Cuisine)', 'Uji Matcha Soft Serve & Parfait', 'Kitsune Udon & Ramen', 'Yudofu (Simmered Silken Tofu)', 'Kyoto Style Pressed Sushi'],
      transitGuide: 'Fly into Osaka Kansai (KIX), then take the 75-minute Haruka Express train directly to Kyoto Station. Within Kyoto, city buses (500 yen pass) and rented bicycles are the easiest way to explore.',
      insiderTip: 'Visit Fushimi Inari and Arashiyama Bamboo Forest before 07:00 AM. By 09:30 AM thousands of tour buses arrive; early morning offers serene meditation vibes.',
      proTipCalc: 'Get a digital ICOCA or Suica transit card on your phone for seamless tap-and-go travel across all subway, bus lines, and convenience stores.'
    },

    {
      id: 'swiss-alps',
      name: 'Lauterbrunnen & Swiss Alps',
      region: 'Bernese Oberland, Switzerland',
      country: 'Switzerland',
      category: 'international',
      vibe: 'mountains',
      budgetTier: 'luxury',
      image: 'assets/images/switzerland.jpg',
      tagline: 'The Valley of 72 Waterfalls & Fairytale Alpine Peaks',
      snippet: 'Towering 300-meter vertical limestone cliffs, cascading waterfalls into emerald meadows, rustic wooden chalets, and cogwheel trains winding past the snow-clad Jungfrau.',
      bestSeason: 'June to September (Hiking & Wildflowers) & Dec-Mar (Skiing)',
      bestMonths: [6, 7, 8, 9, 12, 1, 2, 3],
      dailyBudgetInr: '₹14,000 – ₹38,000',
      avgDailyInr: 16500,
      idealDays: '5–8 Days',
      nearestAirport: 'Zurich (ZRH) / Geneva (GVA)',
      highlights: [
        'Hiking from Lauterbrunnen valley to the car-free clifftop village of Mürren',
        'Standing behind the roaring mist of Staubbach Falls',
        'Cogwheel train to Jungfraujoch (The Top of Europe at 11,332 ft)',
        'Cruising the turquoise glacial waters of Lake Brienz and Lake Thun',
        'Riding the cable car to First Cliff Walk and flying the zip-line in Grindelwald'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹8,000 – ₹12,000', desc: 'Youth hostel dorms, Coop/Migros supermarket meals, Swiss Half Fare Card' },
        midRange: { rate: '₹16,000 – ₹30,000', desc: 'Traditional alpine chalet hotel, Swiss Travel Pass, fondue restaurants' },
        luxury: { rate: '₹40,000 – ₹85,000', desc: '5-star luxury mountain resort, helicopter glacier tours, fine dining' }
      },
      foods: ['Swiss Cheese Fondue & Raclette', 'Crispy Rösti with Fried Egg', 'Alpine Swiss Chocolate', 'Bündner Nusstorte (Nut Pastry)', 'Fresh Mountain Milk Cheese'],
      transitGuide: 'Fly into Zurich (ZRH), then take the world-class SBB train to Interlaken Ost and switch to the Bernese Oberland railway into Lauterbrunnen (2.5 hours total). No car needed!',
      insiderTip: 'Buying a Swiss Travel Pass covers all mainline trains, boats, and city transit, plus gives 50% discount on high mountain cable cars like Jungfraujoch and Schilthorn.',
      proTipCalc: 'Save over ₹5,000 per day by preparing picnic lunches from Coop and Migros supermarkets—their ready-made salads, baguettes, and cheeses are top tier.'
    },

    {
      id: 'iceland-aurora',
      name: 'Kirkjufell & Iceland South Coast',
      region: 'Snæfellsnes & South Coast, Iceland',
      country: 'Iceland',
      category: 'international',
      vibe: 'aurora',
      budgetTier: 'luxury',
      image: 'assets/images/iceland.jpg',
      tagline: 'Land of Fire, Ice & Northern Lights',
      snippet: 'Glacial waterfalls tumbling over black volcanic basalt columns, ice caves inside Vatnajökull, and surreal green Aurora Borealis dancing across Arctic night skies.',
      bestSeason: 'September to March (Aurora Borealis) & June to August (Midnight Sun)',
      bestMonths: [9, 10, 11, 12, 1, 2, 3],
      dailyBudgetInr: '₹15,000 – ₹42,000',
      avgDailyInr: 18000,
      idealDays: '7–10 Days (Ring Road)',
      nearestAirport: 'Keflavík International (KEF)',
      highlights: [
        'Hunting the Aurora Borealis over conical Kirkjufell mountain and waterfalls',
        'Walking between glowing crystal icebergs on Reynisfjara Black Sand Beach',
        'Walking behind the roaring 60-meter curtain of Seljalandsfoss waterfall',
        'Soaking in geothermal mineral waters at the Blue Lagoon or Sky Lagoon',
        'Exploring blue glacial ice caves beneath Europe’s largest ice cap'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹8,500 – ₹14,000', desc: 'Campervan rental (sleep + wheels combined), campsite cooking, self-guided hikes' },
        midRange: { rate: '₹18,000 – ₹32,000', desc: '4x4 SUV rental, roadside guesthouses, local thermal pools, casual dining' },
        luxury: { rate: '₹45,000 – ₹90,000', desc: 'Luxury boutique hotels, private Super Jeep glacier guides, spa resorts' }
      },
      foods: ['Icelandic Lamb Soup (Kjötsúpa)', 'Fresh Arctic Char & Langoustines', 'Skyr (Cultured Dairy with Berries)', 'Rúgbrauð (Geothermal Rye Bread)', 'Bæjarins Beztu Pylsur Hot Dogs'],
      transitGuide: 'Fly into Keflavík (KEF). Renting a campervan or 4x4 car right at the airport is the absolute best way to experience Iceland along Route 1 (The Ring Road).',
      insiderTip: 'For Northern Lights, download the "My Aurora Forecast" app and monitor the KP-index and cloud cover map (Vedur.is). Total dark skies and 0% clouds matter far more than cold weather!',
      proTipCalc: 'Renting a campervan combines your lodging and transport into a single expense, slashing total Iceland trip costs by nearly 45%.'
    },

    {
      id: 'chandratal-lake',
      name: 'Chandratal & The Moon Lake',
      region: 'Spiti Valley, Himachal Pradesh, India',
      country: 'India',
      category: 'india',
      vibe: 'lakes',
      budgetTier: 'budget',
      image: 'assets/images/chandratal.jpg',
      tagline: 'Crescent Turquoise Jewel at 14,100 Feet',
      snippet: 'A sacred high-altitude alpine lake mirroring snow-dusted Himalayan massifs. A paradise for stargazers, trekkers, and raw roadtrippers.',
      bestSeason: 'Mid-June to Mid-September (Before Snow Shuts Kunzum Pass)',
      bestMonths: [6, 7, 8, 9],
      dailyBudgetInr: '₹1,500 – ₹4,200',
      avgDailyInr: 2500,
      idealDays: '2–3 Days (PartOf Spiti Circuit)',
      nearestAirport: 'Bhuntar / Kullu',
      highlights: [
        'Trekking the 2 km scenic alpine meadow rim around Chandratal shore',
        'Watching the lake change color from aquamarine to deep emerald as the sun shifts',
        'Glamping in insulated Swiss tents under Bortle 1 dark skies',
        'Crossing the treacherous glacial waters of Chhota Dara off-road section',
        'Visiting the legendary Chacha-Chachi roadside dhaba at Batal'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹1,200 – ₹1,800', desc: 'Shared tent camps, communal vegetarian thali, shared transport from Kaza' },
        midRange: { rate: '₹2,800 – ₹4,800', desc: 'Private deluxe alpine tent with attached washroom, hot water bottles, warm meals' },
        luxury: { rate: '₹6,000 – ₹12,000', desc: 'Private 4x4 camper tour with personal camping team & heated sleeping bags' }
      },
      foods: ['Steaming Mountain Maggi with Veggies', 'Hot Rajma Chawal at Batal Dhaba', 'Ginger Lemon Honey Tea', 'Warm Spiced Dal & Roti'],
      transitGuide: 'Accessible via a rough 14 km dirt track branching off the Kaza–Manali highway near Batal. Vehicles must park 1.5 km before the lake; the rest is a gentle, breathtaking walk.',
      insiderTip: 'Never camp right at the water’s edge (strictly prohibited by environmental laws). Stays are at designated camp areas 2 km away to preserve pristine glacial ecology.',
      proTipCalc: 'Pack thermal base layers and a 20,000 mAh power bank—night temperatures at Chandratal frequently dip below freezing even in July, draining device batteries quickly.'
    },

    {
      id: 'key-monastery',
      name: 'Key Monastery & Ancient Gompas',
      region: 'Spiti Valley, Himachal Pradesh, India',
      country: 'India',
      category: 'india',
      vibe: 'culture',
      budgetTier: 'budget',
      image: 'assets/images/key_monastery.jpg',
      tagline: '1,000-Year Fortified Haven of Tibetan Buddhism',
      snippet: 'Perched dramatically atop a conical hill at 13,668 ft, Key Gompa resembles a fortress of white and terracotta hermitages overlooking the Spiti River basin.',
      bestSeason: 'May to October',
      bestMonths: [5, 6, 7, 8, 9, 10],
      dailyBudgetInr: '₹1,200 – ₹3,500',
      avgDailyInr: 2200,
      idealDays: '1–2 Days',
      nearestAirport: 'Shimla / Bhuntar',
      highlights: [
        'Sharing hot butter tea with resident monks in the ancient wooden monastery kitchen',
        'Meditating in the dark, butter-lamp lit prayer hall amid 1,000-year manuscripts',
        'Panoramic 360-degree overlook across the braided Spiti river valley',
        'Walking up to Kibber village and the Chicham Suspension Bridge (highest in Asia)',
        'Listening to long-horn trumpet calls echoing across mountain ridges at sunrise'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹800 – ₹1,500', desc: 'Monastery guest room stay (voluntary donation) or local Kaza homestay' },
        midRange: { rate: '₹2,200 – ₹4,500', desc: 'Boutique homestay in Kibber or Kaza with private bath and mountain view' },
        luxury: { rate: '₹5,500 – ₹9,000', desc: 'Curated cultural retreat with private local historian guide' }
      },
      foods: ['Monastery Butter Tea & Tsampa', 'Spitian Momos (Veg/Mutton)', 'Tingmo (Steamed Tibetan Bread)', 'Alu Thukpa Soup'],
      transitGuide: 'Located just 14 km uphill from Kaza town. Easily reached via local taxi (₹800 round trip) or a scenic morning hike from Kaza.',
      insiderTip: 'Monks are exceptionally welcoming. If you ask respectfully, they often invite travelers into the centuries-old smoky monastery kitchen for butter tea and heartfelt conversation.',
      proTipCalc: 'Always walk clockwise (kora) around Buddhist shrines, chortens, and prayer wheels as a sign of respect.'
    },

    {
      id: 'langza-stargazing',
      name: 'Langza & Bortle 1 Dark Skies',
      region: 'Spiti Valley, Himachal Pradesh, India',
      country: 'India',
      category: 'india',
      vibe: 'mountains',
      budgetTier: 'budget',
      image: 'assets/images/stargazing.jpg',
      tagline: 'The Fossil Village & Astrophotography Heaven',
      snippet: 'Guarded by a giant golden Buddha statue facing the majestic Chau Chau Kang Nilda peak, Langza is one of the darkest and highest inhabited villages on Earth.',
      bestSeason: 'May to October (New Moon Nights for Milky Way Core)',
      bestMonths: [5, 6, 7, 8, 9, 10],
      dailyBudgetInr: '₹1,200 – ₹3,800',
      avgDailyInr: 2400,
      idealDays: '1–2 Days',
      nearestAirport: 'Shimla / Chandigarh',
      highlights: [
        'Photographing the Milky Way arching directly over the colossal Langza Buddha statue',
        'Finding prehistoric cephalopod fossils (Shaligram / Ammonites) in the dry mountain ravines',
        'Stargazing under Bortle Class 1 night skies with zero artificial light pollution',
        'Staying in an authentic mud-and-poplar Spitian family homestay',
        'Sunset views of 6,303-meter snow peak Chau Chau Kang Nilda'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹1,000 – ₹1,500', desc: 'Traditional homestay inclusive of homecooked breakfast and dinner' },
        midRange: { rate: '₹2,500 – ₹4,500', desc: 'Private room in heritage Langza homestay with solar water heater' },
        luxury: { rate: '₹5,000 – ₹9,000', desc: 'Specialized astrophotography tour with telescope and guided photo workshops' }
      },
      foods: ['Organic Barley Khambir Bread', 'Local Mustard Green Curry', 'Desi Ghee Rice with Mountain Dal', 'Spitian Herbal Mint Tea'],
      transitGuide: '16 km from Kaza along a winding paved mountain road. Can be combined in a single high-altitude day loop with Hikkim and Komic.',
      insiderTip: 'Plan your trip during the New Moon phase (1st and 4th weeks of the lunar calendar). When the moon is down, the Milky Way core is so bright it casts visible shadows on the ground!',
      proTipCalc: 'Buying fossils from children encourages illegal excavation of geological heritage; search for them yourself in the scree and leave them in place for future travelers.'
    },

    {
      id: 'leh-ladakh',
      name: 'Leh Ladakh & Pangong Tso',
      region: 'Ladakh, India',
      country: 'India',
      category: 'india',
      vibe: 'mountains',
      budgetTier: 'mid',
      image: 'assets/images/ladakh.jpg',
      tagline: 'Land of High Mountain Passes & Color-Shifting Lakes',
      snippet: 'High-altitude desert plateaus, dramatic cliffside monasteries, winding mountain passes above 17,500 ft, and the mystical color-changing waters of Pangong Tso.',
      bestSeason: 'May to September (High Passes Open)',
      bestMonths: [5, 6, 7, 8, 9],
      dailyBudgetInr: '₹2,800 – ₹6,500',
      avgDailyInr: 3800,
      idealDays: '7–10 Days',
      nearestAirport: 'Leh Kushok Bakula (IXL)',
      highlights: [
        'Driving over Khardung La Pass (17,982 ft) into the Nubra Valley dunes',
        'Watching sunrise over the 134 km long indigo waters of Pangong Lake',
        'Riding double-humped Bactrian camels across white sands in Hunder',
        'Exploring the whitewashed cliffside Thiksey Monastery at morning prayers',
        'Stargazing at the Hanle Dark Sky Reserve, one of the clearest on Earth'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹1,500 – ₹2,200', desc: 'Shared sumos, Old Leh family homestays, local thukpa and momo cafes' },
        midRange: { rate: '₹3,500 – ₹7,000', desc: 'Shared/rental 4x4 or Innova, boutique heritage hotels, Nubra deluxe camps' },
        luxury: { rate: '₹12,000 – ₹28,000', desc: '5-star glamping retreats (Chamba Camp), private heated camps, dedicated guide' }
      },
      foods: ['Ladakhi Skyu (Stew with wheat dough)', 'Hot Butter Tea (Gur Gur Chai)', 'Tingmo with spicy Alu Phingsha', 'Fresh Apricot Jam & Tart', 'Steaming Mutton Momos'],
      transitGuide: 'Fly directly into Leh (IXL) and mandatorily rest 48 hours for AMS acclimatization, or drive the iconic Manali–Leh or Srinagar–Leh highways during summer months.',
      insiderTip: 'Do not plan any excursions on Day 1 and 2. Rest completely in Leh town (11,500 ft) to avoid acute mountain sickness before attempting high passes.',
      proTipCalc: 'Inner Line Permits (ILP) are required for Nubra, Pangong, and Hanle. Apply online via the official LAHDC portal to skip third-party agent markups.'
    },

    {
      id: 'kerala-backwaters',
      name: 'Alleppey & Kerala Backwaters',
      region: 'Kerala, India',
      country: 'India',
      category: 'india',
      vibe: 'lakes',
      budgetTier: 'mid',
      image: 'assets/images/kerala.jpg',
      tagline: 'God’s Own Country: Tropical Lagoons & Palm Canals',
      snippet: 'Drift along serene emerald canals in traditional thatched Kettuvallam houseboats, explore spice plantations, and unwind with authentic Ayurvedic wellness rituals.',
      bestSeason: 'October to March (Pleasant Tropical Breeze)',
      bestMonths: [10, 11, 12, 1, 2, 3],
      dailyBudgetInr: '₹2,200 – ₹5,800',
      avgDailyInr: 3200,
      idealDays: '4–6 Days',
      nearestAirport: 'Cochin International (COK)',
      highlights: [
        'Cruising through narrow village canals on an eco-friendly wooden canoe (Shikara)',
        'Overnight stay on a luxury traditional thatched houseboat with onboard chef',
        'Catching sunset over Chinese fishing nets in historic Fort Kochi',
        'Trekking through lush rolling tea estates in nearby Munnar hills',
        'Witnessing traditional Kathakali classical dance and Kalaripayattu martial arts'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹1,200 – ₹1,800', desc: 'Government SWTD ferry boats, village homestays, local banana-leaf fish curry meals' },
        midRange: { rate: '₹3,000 – ₹6,000', desc: 'Private AC canoe day tours, canal-side heritage resorts, fresh seafood dining' },
        luxury: { rate: '₹10,000 – ₹24,000', desc: 'Private luxury multi-room houseboat, Ayurveda wellness spa retreats, chauffeur transfers' }
      },
      foods: ['Karimeen Pollichathu (Pearl Spot in banana leaf)', 'Appam with Vegetable/Chicken Stew', 'Kerala Sadya feast on banana leaf', 'Malabar Parotta with Roast', 'Fresh Tender Coconut Water'],
      transitGuide: 'Fly into Cochin International (COK), then take a 1.5-hour taxi or train south to Alleppey (Alappuzha). Within backwaters, government passenger ferries cost under ₹40 per ride.',
      insiderTip: 'Instead of an expensive 24-hr houseboat, book a 3-hour hand-rowed country canoe for ₹1,200. It accesses the narrowest, most authentic village canals where big houseboats cannot enter!',
      proTipCalc: 'State water transport ferries (SWTD) operate like commuter buses through the backwaters—take the Alleppey to Kottayam ferry route for ₹30 for an incredible 2.5-hour scenic cruise.'
    },

    {
      id: 'bali-indonesia',
      name: 'Bali & Nusa Penida',
      region: 'Lesser Sunda Islands, Indonesia',
      country: 'Indonesia',
      category: 'international',
      vibe: 'culture',
      budgetTier: 'mid',
      image: 'assets/images/bali.jpg',
      tagline: 'Island of the Gods: Sacred Cliffs & Tropical Cascades',
      snippet: 'Lush terraced rice paddies in Ubud, ancient volcanic sea temples, roaring jungle waterfalls, and breathtaking cliffhead lookouts towering above azure Indian Ocean breakers.',
      bestSeason: 'April to October (Dry Season & Low Humidity)',
      bestMonths: [4, 5, 6, 7, 8, 9, 10],
      dailyBudgetInr: '₹3,200 – ₹8,500',
      avgDailyInr: 4500,
      idealDays: '6–8 Days',
      nearestAirport: 'Denpasar Bali (DPS)',
      highlights: [
        'Standing at the edge of Kelingking T-Rex cliff viewpoint in Nusa Penida',
        'Sunrise trek up active volcano Mount Batur overlooking Lake Batur',
        'Walking through the UNESCO emerald stepped rice terraces of Tegallalang',
        'Visiting cliffside Uluwatu Temple for the evening Kecak Fire Dance at sunset',
        'Snorkeling with wild manta rays in the crystal waters of Manta Point'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹1,800 – ₹2,800', desc: 'Hostels & guesthouses with pool, rented scooter, local warung dining (Nasi Goreng)' },
        midRange: { rate: '₹4,500 – ₹9,000', desc: 'Private pool villa in Ubud or Canggu, shared speedboats, cafe hopping' },
        luxury: { rate: '₹15,000 – ₹35,000', desc: '5-star cliffside ocean resort, private chauffeur, beach clubs, luxury spa rituals' }
      },
      foods: ['Nasi Campur Bali', 'Babi Guling (Spiced roast pork)', 'Sate Lilit (Minced seafood skewers)', 'Pisang Goreng with honey', 'Fresh Dragonfruit & Coconut Smoothie Bowls'],
      transitGuide: 'Fly into Denpasar (DPS). Renting a scooter (₹450/day) is popular for solo travelers, while hiring a private car with driver runs roughly ₹2,800–₹3,200 for a full 10-hour day.',
      insiderTip: 'Take the early 07:30 AM fast boat from Sanur to Nusa Penida to beat the crowds at Kelingking Beach and Broken Beach before tour groups arrive at 11:00 AM.',
      proTipCalc: 'Use local transport apps Grab and Gojek for food delivery and short rides to avoid inflated tourist taxi rates.'
    },

    {
      id: 'amalfi-coast',
      name: 'Positano & Amalfi Coast',
      region: 'Campania, Italy',
      country: 'Italy',
      category: 'international',
      vibe: 'culture',
      budgetTier: 'luxury',
      image: 'assets/images/amalfi.jpg',
      tagline: 'Vertical Cliffside Havens & Mediterranean Azure',
      snippet: 'Pastel villages tumbling dramatically down sheer cliffs to turquoise coves, fragrant cliffside lemon groves, seaside trattorias, and the scenic Path of the Gods hiking trail.',
      bestSeason: 'May to June & September to October (Warm & Mellow)',
      bestMonths: [5, 6, 9, 10],
      dailyBudgetInr: '₹12,000 – ₹32,000',
      avgDailyInr: 15500,
      idealDays: '4–6 Days',
      nearestAirport: 'Naples (NAP) / Rome (FCO)',
      highlights: [
        'Admiring Positano’s iconic cascading pastel houses from a vintage wooden Riva boat',
        'Hiking the legendary Path of the Gods (Sentiero degli Dei) high above the coastline',
        'Visiting the romantic cliffside gardens of Villa Cimbrone and Villa Rufolo in Ravello',
        'Sampling chilled handmade Limoncello in fragrant Amalfi lemon orchards',
        'Day trip ferry to the crystalline Blue Grotto and Faraglioni rocks of Capri'
      ],
      budgetBreakdown: {
        backpacker: { rate: '₹7,000 – ₹10,500', desc: 'Guesthouses in Sorrento or Salerno, SITA buses & ferries, pizza al taglio & paninis' },
        midRange: { rate: '₹14,000 – ₹26,000', desc: 'Boutique cliffside hotel in Praiano or Minori, public ferries, seaside trattorias' },
        luxury: { rate: '₹35,000 – ₹80,000', desc: '5-star historic cliffside resort, private Gozzo boat charters, Michelin-starred dining' }
      },
      foods: ['Spaghetti alle Vongole (Clams)', 'Delizia al Limone (Amalfi Lemon Pastry)', 'Authentic Neapolitan Pizza', 'Insalata Caprese with fresh Buffalo Mozzarella', 'Chilled Artisanal Limoncello'],
      transitGuide: 'Take high-speed train from Rome to Naples, then regional train to Sorrento or Salerno. From there, scenic Travelmar ferries connect Positano, Amalfi, and Minori without cliffside road traffic.',
      insiderTip: 'Avoid driving rental cars along the Amalfi drive in peak season—the narrow clifftop road has standstill traffic. Travel by ferry instead: it offers breathtaking views from the water and zero congestion!',
      proTipCalc: 'Stay in Praiano, Minori, or Vietri sul Mare instead of Positano center—hotel rates are 50% cheaper, but Positano is just a 15-minute scenic ferry or bus ride away.'
    }
  ];

  // State
  let currentCategory = 'all';
  let currentSearchQuery = '';
  let currentRegionFilter = 'all';
  let currentBudgetFilter = 'all';
  let currentVibeFilter = 'all';
  let currentSort = 'popular';

  let bucketList = JSON.parse(localStorage.getItem('wanderlust_bucket') || '[]');

  // Toast notifications
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(msg, duration = 3000) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, duration);
  }

  // Bucket list
  const bucketCountEl = document.getElementById('bucketCount');

  function updateBucketCount() {
    if (bucketCountEl) {
      bucketCountEl.textContent = bucketList.length;
    }
  }

  function toggleBucketItem(destId) {
    const idx = bucketList.indexOf(destId);
    if (idx > -1) {
      bucketList.splice(idx, 1);
      showToast('Removed from your Bucket List');
    } else {
      bucketList.push(destId);
      showToast('Saved to your Bucket List');
    }
    localStorage.setItem('wanderlust_bucket', JSON.stringify(bucketList));
    updateBucketCount();
    renderDestinations();
    renderBucketListModal();
  }

  updateBucketCount();

  // Destination grid
  const destinationsGrid = document.getElementById('destinationsGrid');
  const resultsCount = document.getElementById('resultsCount');

  function filterDestinations() {
    return DESTINATIONS.filter((item) => {
      if (currentCategory !== 'all') {
        if (currentCategory === 'india' && item.category !== 'india') return false;
        if (currentCategory === 'international' && item.category !== 'international') return false;
        if (currentCategory === 'mountains' && item.vibe !== 'mountains') return false;
        if (currentCategory === 'lakes' && item.vibe !== 'lakes') return false;
        if (currentCategory === 'culture' && item.vibe !== 'culture') return false;
      }

      // Dropdown Region filter
      if (currentRegionFilter !== 'all' && item.category !== currentRegionFilter) return false;

      // Dropdown Budget filter
      if (currentBudgetFilter !== 'all') {
        if (currentBudgetFilter === 'budget' && item.avgDailyInr > 3000) return false;
        if (currentBudgetFilter === 'mid' && (item.avgDailyInr <= 3000 || item.avgDailyInr > 8000)) return false;
        if (currentBudgetFilter === 'luxury' && item.avgDailyInr <= 8000) return false;
      }

      // Dropdown Vibe filter
      if (currentVibeFilter !== 'all' && item.vibe !== currentVibeFilter) return false;

      // Search query
      if (currentSearchQuery.trim() !== '') {
        const query = currentSearchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchRegion = item.region.toLowerCase().includes(query);
        const matchCountry = item.country.toLowerCase().includes(query);
        const matchSnippet = item.snippet.toLowerCase().includes(query);
        const matchTagline = item.tagline.toLowerCase().includes(query);
        const matchHighlights = item.highlights.some(h => h.toLowerCase().includes(query));
        const matchFoods = item.foods.some(f => f.toLowerCase().includes(query));
        if (!matchName && !matchRegion && !matchCountry && !matchSnippet && !matchTagline && !matchHighlights && !matchFoods) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (currentSort === 'budget-low') return a.avgDailyInr - b.avgDailyInr;
      if (currentSort === 'budget-high') return b.avgDailyInr - a.avgDailyInr;
      if (currentSort === 'name') return a.name.localeCompare(b.name);
      return 0; // default order
    });
  }

  function renderDestinations() {
    if (!destinationsGrid) return;
    const items = filterDestinations();

    if (resultsCount) {
      resultsCount.innerHTML = `Showing <strong>${items.length}</strong> verified destination guides`;
    }

    if (items.length === 0) {
      destinationsGrid.innerHTML = `
        <div class="empty-results-box glass-panel">
          <i class="fa-solid fa-compass"></i>
          <h3>No matching travel destinations found</h3>
          <p class="text-muted">Try clearing your search term or adjusting filters to discover more wonders.</p>
          <button class="btn btn-outline btn-sm mt-3" id="resetFiltersBtn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);
      return;
    }

    destinationsGrid.innerHTML = items.map((dest) => {
      const isSaved = bucketList.includes(dest.id);
      return `
        <article class="destination-card glass-panel" data-id="${dest.id}">
          <div class="card-img-wrap">
            <img src="${dest.image}" alt="${dest.name}" class="card-img" loading="lazy">
            <div class="card-top-badges">
              <span class="badge-country"><i class="fa-solid fa-location-dot text-accent"></i> ${dest.country}</span>
              <button class="btn-card-bookmark ${isSaved ? 'saved' : ''}" data-id="${dest.id}" title="${isSaved ? 'Remove from' : 'Save to'} Bucket List" aria-label="Save to bucket list">
                <i class="fa-${isSaved ? 'solid' : 'regular'} fa-heart"></i>
              </button>
            </div>
          </div>

          <div class="card-body">
            <div class="card-title-row">
              <h3 class="card-title">${dest.name}</h3>
            </div>
            <div class="card-tagline">${dest.tagline}</div>
            <p class="card-snippet">${dest.snippet}</p>

            <div class="card-metrics-strip">
              <div class="card-metric">
                <span class="cm-label"><i class="fa-regular fa-calendar-check text-accent"></i> Best Season</span>
                <span class="cm-val">${dest.bestSeason.split('(')[0].trim()}</span>
              </div>
              <div class="card-metric">
                <span class="cm-label"><i class="fa-solid fa-wallet text-accent"></i> Daily Budget</span>
                <span class="cm-val">${dest.dailyBudgetInr}</span>
              </div>
            </div>

            <div class="card-highlights-row">
              <span class="ch-tag"><i class="fa-solid fa-clock"></i> ${dest.idealDays}</span>
              <span class="ch-tag"><i class="fa-solid fa-plane"></i> ${dest.nearestAirport.split('/')[0].trim()}</span>
              <span class="ch-tag"><i class="fa-solid fa-mountain"></i> ${dest.vibe.toUpperCase()}</span>
            </div>

            <div class="card-footer-action">
              <button class="btn btn-outline btn-block view-guide-btn" data-id="${dest.id}">
                <span>View Full Traveler Guide</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to cards
    destinationsGrid.querySelectorAll('.view-guide-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        openDestinationModal(id);
      });
    });

    destinationsGrid.querySelectorAll('.btn-card-bookmark').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        toggleBucketItem(id);
      });
    });
  }

  function resetAllFilters() {
    currentCategory = 'all';
    currentSearchQuery = '';
    currentRegionFilter = 'all';
    currentBudgetFilter = 'all';
    currentVibeFilter = 'all';

    document.querySelectorAll('.dest-tab').forEach((tab) => tab.classList.remove('active'));
    document.querySelector('.dest-tab[data-category="all"]').classList.add('active');

    const searchInput = document.getElementById('destinationSearch');
    if (searchInput) searchInput.value = '';
    const clearBtn = document.getElementById('clearSearchBtn');
    if (clearBtn) clearBtn.classList.remove('active');

    const filterRegion = document.getElementById('filterRegion');
    if (filterRegion) filterRegion.value = 'all';
    const filterBudget = document.getElementById('filterBudget');
    if (filterBudget) filterBudget.value = 'all';
    const filterVibe = document.getElementById('filterVibe');
    if (filterVibe) filterVibe.value = 'all';

    renderDestinations();
  }

  renderDestinations();

  // Search and filter listeners
  const categoryTabs = document.querySelectorAll('.dest-tab');
  categoryTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category');
      renderDestinations();
    });
  });

  const searchInput = document.getElementById('destinationSearch');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (clearSearchBtn) {
        if (currentSearchQuery.length > 0) {
          clearSearchBtn.classList.add('active');
        } else {
          clearSearchBtn.classList.remove('active');
        }
      }
      renderDestinations();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentSearchQuery = '';
      clearSearchBtn.classList.remove('active');
      renderDestinations();
    });
  }

  const filterRegion = document.getElementById('filterRegion');
  if (filterRegion) {
    filterRegion.addEventListener('change', (e) => {
      currentRegionFilter = e.target.value;
      renderDestinations();
    });
  }

  const filterBudget = document.getElementById('filterBudget');
  if (filterBudget) {
    filterBudget.addEventListener('change', (e) => {
      currentBudgetFilter = e.target.value;
      renderDestinations();
    });
  }

  const filterVibe = document.getElementById('filterVibe');
  if (filterVibe) {
    filterVibe.addEventListener('change', (e) => {
      currentVibeFilter = e.target.value;
      renderDestinations();
    });
  }

  const sortDestinations = document.getElementById('sortDestinations');
  if (sortDestinations) {
    sortDestinations.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderDestinations();
    });
  }

  // Hero quick search tag chips
  document.querySelectorAll('.quick-tag-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const tagText = chip.getAttribute('data-search') || chip.textContent.replace('#', '');
      if (searchInput) {
        searchInput.value = tagText;
        currentSearchQuery = tagText;
        if (clearSearchBtn) clearSearchBtn.classList.add('active');
        renderDestinations();
        const destSection = document.getElementById('destinations');
        if (destSection) {
          destSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Footer destination links
  document.querySelectorAll('.f-links a[data-filter]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filterKey = (link.getAttribute('data-filter') || '').toLowerCase().trim();
      if (!filterKey) return;

      const targetDest = DESTINATIONS.find((d) => {
        const id = d.id.toLowerCase();
        const country = d.country.toLowerCase();
        const name = d.name.toLowerCase();

        return (
          id === filterKey ||
          id.includes(filterKey) ||
          filterKey.includes(id) ||
          country.includes(filterKey) ||
          name.includes(filterKey) ||
          ((filterKey.includes('swiss') || filterKey.includes('switzerland')) && id === 'swiss-alps')
        );
      });

      if (targetDest) {
        openDestinationModal(targetDest.id);
      } else {
        const searchInput = document.getElementById('destinationSearch');
        if (searchInput) {
          searchInput.value = link.textContent.split(',')[0].trim();
          currentSearchQuery = searchInput.value;
          renderDestinations();
        }
        const destSection = document.getElementById('destinations');
        if (destSection) {
          destSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Destination details modal
  const destinationModal = document.getElementById('destinationModal');
  const closeDestModalBtn = document.getElementById('closeDestModal');
  let currentViewingDestId = null;

  function openDestinationModal(destId) {
    const dest = DESTINATIONS.find(d => d.id === destId);
    if (!dest || !destinationModal) return;

    currentViewingDestId = destId;

    // Populate data
    document.getElementById('modalDestImg').src = dest.image;
    document.getElementById('modalDestImg').alt = dest.name;
    document.getElementById('modalCountryBadge').textContent = `${dest.country} • ${dest.region}`;
    document.getElementById('modalDestTitle').textContent = dest.name;
    document.getElementById('modalDestTagline').textContent = dest.tagline;

    document.getElementById('modalBestSeason').textContent = dest.bestSeason;
    document.getElementById('modalDailyBudget').textContent = dest.dailyBudgetInr;
    document.getElementById('modalIdealDuration').textContent = dest.idealDays;
    document.getElementById('modalNearestAirport').textContent = dest.nearestAirport;

    document.getElementById('modalOverview').textContent = dest.snippet;

    // Budget Grid
    const budgetGrid = document.getElementById('modalBudgetGrid');
    if (budgetGrid) {
      budgetGrid.innerHTML = `
        <div class="m-budget-card">
          <span class="mb-name">Backpacker</span>
          <div class="mb-rate">${dest.budgetBreakdown.backpacker.rate}</div>
          <p class="mb-details">${dest.budgetBreakdown.backpacker.desc}</p>
        </div>
        <div class="m-budget-card">
          <span class="mb-name text-accent">Mid-Range Comfort</span>
          <div class="mb-rate text-accent">${dest.budgetBreakdown.midRange.rate}</div>
          <p class="mb-details">${dest.budgetBreakdown.midRange.desc}</p>
        </div>
        <div class="m-budget-card">
          <span class="mb-name">Luxury / Private</span>
          <div class="mb-rate">${dest.budgetBreakdown.luxury.rate}</div>
          <p class="mb-details">${dest.budgetBreakdown.luxury.desc}</p>
        </div>
      `;
    }

    // Highlights
    const hlList = document.getElementById('modalHighlightsList');
    if (hlList) {
      hlList.innerHTML = dest.highlights.map(h => `<li><i class="fa-solid fa-circle-check"></i> <span>${h}</span></li>`).join('');
    }

    // Food
    const foodWrap = document.getElementById('modalFoodTags');
    if (foodWrap) {
      foodWrap.innerHTML = dest.foods.map(f => `<span class="food-pill"><i class="fa-solid fa-utensils"></i> ${f}</span>`).join('');
    }

    // Transit & Insider
    document.getElementById('modalTransitGuide').textContent = dest.transitGuide;
    document.getElementById('modalInsiderTip').textContent = dest.insiderTip;

    // Bookmark button state
    const bookmarkBtn = document.getElementById('modalBookmarkBtn');
    if (bookmarkBtn) {
      const isSaved = bucketList.includes(dest.id);
      bookmarkBtn.innerHTML = `<i class="fa-${isSaved ? 'solid text-danger' : 'regular'} fa-heart"></i> <span>${isSaved ? 'Saved in Bucket List' : 'Add to Bucket List'}</span>`;
    }

    destinationModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDestinationModal() {
    if (!destinationModal) return;
    destinationModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeDestModalBtn) closeDestModalBtn.addEventListener('click', closeDestinationModal);

  const modalBookmarkBtn = document.getElementById('modalBookmarkBtn');
  if (modalBookmarkBtn) {
    modalBookmarkBtn.addEventListener('click', () => {
      if (currentViewingDestId) {
        toggleBucketItem(currentViewingDestId);
        const isSaved = bucketList.includes(currentViewingDestId);
        modalBookmarkBtn.innerHTML = `<i class="fa-${isSaved ? 'solid text-danger' : 'regular'} fa-heart"></i> <span>${isSaved ? 'Saved in Bucket List' : 'Add to Bucket List'}</span>`;
      }
    });
  }

  const modalEstimateTripBtn = document.getElementById('modalEstimateTripBtn');
  if (modalEstimateTripBtn) {
    modalEstimateTripBtn.addEventListener('click', () => {
      closeDestinationModal();
      const calcSelect = document.getElementById('calcDestinationSelect');
      if (calcSelect && currentViewingDestId) {
        calcSelect.value = currentViewingDestId;
        recalculateTripBudget();
      }
      const budgetSection = document.getElementById('budget-calculator');
      if (budgetSection) budgetSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Seasonal radar
  const MONTHS_DATA = {
    1: { name: 'January', tag: 'PEAK WINTER SNOW & TROPICAL SUN', summary: 'Kashmir transforms into a winter wonderland with skiing in Gulmarg. Kerala backwaters offer idyllic warm sunny breezes, and Iceland dazzles with blue ice caves.', places: ['kashmir-valley', 'kerala-backwaters', 'iceland-aurora'] },
    2: { name: 'February', tag: 'DEEP SNOW & FROZEN WONDERS', summary: 'Crisp blue skies and frozen waterfalls in Kashmir and Swiss Alps. Warm tropical cruising in Kerala and clear dark aurora skies in Iceland.', places: ['kerala-backwaters', 'kashmir-valley', 'swiss-alps'] },
    3: { name: 'March', tag: 'SPRING BLOSSOMS & SHOULDER DEALS', summary: 'Kyoto’s legendary cherry blossoms (Sakura) begin to bloom in late March. Lower altitude Himalayan valleys warm up with apple blossoms.', places: ['kyoto-japan', 'kashmir-valley', 'kerala-backwaters'] },
    4: { name: 'April', tag: 'SPRINGTIME AWAKENING', summary: 'Peak cherry blossom season across Kyoto. Srinagar’s Indira Gandhi Memorial Tulip Garden opens with millions of vibrant tulips in bloom.', places: ['kyoto-japan', 'kashmir-valley', 'bali-indonesia'] },
    5: { name: 'May', tag: 'MEDITERRANEAN SPRING & HIMALAYAN PASSES', summary: 'Positano and the Amalfi Coast bloom with pleasant temperatures. Snow melts across Swiss foothills and lower Himalayan passes open.', places: ['amalfi-coast', 'bali-indonesia', 'swiss-alps'] },
    6: { name: 'June', tag: 'HIGH-PASS OPENING & MIDNIGHT SUN', summary: 'Kunzum and Khardung La passes officially open! Spiti Valley and Leh Ladakh become accessible. Swiss Alps meadows turn emerald green.', places: ['spiti-valley', 'leh-ladakh', 'swiss-alps'] },
    7: { name: 'July', tag: 'ALPINE EXPEDITIONS & RAINSHADOW OASIS', summary: 'While Indian plains experience monsoon, Ladakh and Spiti sit in dry rainshadow with clear sunny skies. Bali enjoys peak dry surfing season.', places: ['leh-ladakh', 'spiti-valley', 'bali-indonesia'] },
    8: { name: 'August', tag: 'SUMMER PRIME & WILDFLOWERS', summary: 'Peak wildflowers at Chandratal and Pangong Tso. Sunny dry days across Bali’s cliff lookouts and warm hiking weather in the Swiss Alps.', places: ['leh-ladakh', 'chandratal-lake', 'bali-indonesia'] },
    9: { name: 'September', tag: 'THE GOLDEN WINDOW (BEST OVERALL)', summary: 'Arguably the single best travel month for Spiti, Ladakh, and the Amalfi Coast: crystal clear skies, zero rain, golden poplars, and peak Milky Way nights.', places: ['spiti-valley', 'amalfi-coast', 'leh-ladakh'] },
    10: { name: 'October', tag: 'AUTUMN CRIMSON & CRISP AIR', summary: 'Kashmir’s Chinar trees turn fiery crimson and gold. Kyoto’s autumn foliage begins and the Amalfi Coast offers mellow uncrowded beaches.', places: ['amalfi-coast', 'kashmir-valley', 'kyoto-japan'] },
    11: { name: 'November', tag: 'PEAK AUTUMN LEAVES & BACKWATER BREEZES', summary: 'Kyoto’s maple foliage peaks with illuminated evening gardens. Kerala enters its prime cruising weather and Arctic nights return to Iceland.', places: ['kerala-backwaters', 'kyoto-japan', 'iceland-aurora'] },
    12: { name: 'December', tag: 'FAIRYTALE WINTER & TROPICAL ESCAPES', summary: 'Snow dusts Swiss alpine chalets in Lauterbrunnen and Zermatt. Frozen waterfalls in Gulmarg and golden tropical sunsets across Kerala backwaters.', places: ['kerala-backwaters', 'swiss-alps', 'iceland-aurora'] }
  };

  const monthBtns = document.querySelectorAll('.month-btn');
  const spotlightSeasonTag = document.getElementById('spotlightSeasonTag');
  const spotlightMonthTitle = document.getElementById('spotlightMonthTitle');
  const spotlightSummary = document.getElementById('spotlightSummary');
  const spotlightPlacesGrid = document.getElementById('spotlightPlacesGrid');

  function renderMonthRadar(monthNum) {
    const data = MONTHS_DATA[monthNum];
    if (!data) return;

    if (spotlightSeasonTag) spotlightSeasonTag.textContent = data.tag;
    if (spotlightMonthTitle) spotlightMonthTitle.textContent = `Where to Travel in ${data.name}`;
    if (spotlightSummary) spotlightSummary.textContent = data.summary;

    if (spotlightPlacesGrid) {
      spotlightPlacesGrid.innerHTML = data.places.map((destId) => {
        const dest = DESTINATIONS.find(d => d.id === destId);
        if (!dest) return '';
        return `
          <div class="spotlight-place-card" data-id="${dest.id}">
            <span class="sp-country">${dest.country}</span>
            <h4 class="sp-title">${dest.name}</h4>
            <p class="sp-why">${dest.tagline}</p>
            <span class="sp-cost"><i class="fa-solid fa-coins text-accent"></i> ${dest.dailyBudgetInr} / day</span>
          </div>
        `;
      }).join('');

      spotlightPlacesGrid.querySelectorAll('.spotlight-place-card').forEach((card) => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-id');
          openDestinationModal(id);
        });
      });
    }
  }

  monthBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      monthBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mNum = parseInt(btn.getAttribute('data-month'), 10);
      renderMonthRadar(mNum);
    });
  });

  // Initial load
  renderMonthRadar(6);

  // Budget calculator
  const calcDestinationSelect = document.getElementById('calcDestinationSelect');
  const calcDaysRange = document.getElementById('calcDaysRange');
  const calcDaysVal = document.getElementById('calcDaysVal');
  const calcTravCount = document.getElementById('calcTravCount');
  const calcTravDec = document.getElementById('calcTravDec');
  const calcTravInc = document.getElementById('calcTravInc');

  const calcTotalInr = document.getElementById('calcTotalInr');
  const calcTotalUsd = document.getElementById('calcTotalUsd');
  const calcPerPersonLine = document.getElementById('calcPerPersonLine');
  const expStayCost = document.getElementById('expStayCost');
  const expTransitCost = document.getElementById('expTransitCost');
  const expFoodCost = document.getElementById('expFoodCost');
  const expActivityCost = document.getElementById('expActivityCost');
  const calcProTip = document.getElementById('calcProTip');

  if (calcDestinationSelect) {
    calcDestinationSelect.innerHTML = DESTINATIONS.map(d => `<option value="${d.id}">${d.name} (${d.country})</option>`).join('');
  }

  function recalculateTripBudget() {
    if (!calcDestinationSelect || !calcDaysRange || !calcTravCount) return;

    const destId = calcDestinationSelect.value;
    const dest = DESTINATIONS.find(d => d.id === destId) || DESTINATIONS[0];
    const days = parseInt(calcDaysRange.value, 10);
    const travelers = parseInt(calcTravCount.value, 10);

    const selectedTierRadio = document.querySelector('input[name="calcTier"]:checked');
    const tier = selectedTierRadio ? selectedTierRadio.value : 'comfort';

    let tierMultiplier = 1.0;
    if (tier === 'backpacker') tierMultiplier = 0.55;
    if (tier === 'luxury') tierMultiplier = 2.4;

    const baseDaily = dest.avgDailyInr * tierMultiplier;

    // Daily breakdown: lodging 38%, transport 30%, food 20%, activities 12%
    const stayCost = Math.round(baseDaily * 0.38 * days * (travelers > 1 ? Math.ceil(travelers / 2) * 1.3 : 1));
    const transitCost = Math.round(baseDaily * 0.30 * days * (travelers > 1 ? 1 + (travelers - 1) * 0.35 : 1));
    const foodCost = Math.round(baseDaily * 0.20 * days * travelers);
    const activityCost = Math.round(baseDaily * 0.12 * days * travelers);

    const totalInr = stayCost + transitCost + foodCost + activityCost;
    const totalUsd = Math.round(totalInr / 84);
    const perPersonInr = Math.round(totalInr / travelers);

    const formatInr = (n) => '₹' + n.toLocaleString('en-IN');

    if (calcDaysVal) calcDaysVal.textContent = `${days} Days`;
    if (calcTotalInr) calcTotalInr.textContent = totalInr.toLocaleString('en-IN');
    if (calcTotalUsd) calcTotalUsd.textContent = `(~$${totalUsd.toLocaleString('en-US')} USD)`;
    if (calcPerPersonLine) calcPerPersonLine.innerHTML = `Approx. <strong>${formatInr(perPersonInr)}</strong> per traveler for ${days} days`;

    if (expStayCost) expStayCost.textContent = formatInr(stayCost);
    if (expTransitCost) expTransitCost.textContent = formatInr(transitCost);
    if (expFoodCost) expFoodCost.textContent = formatInr(foodCost);
    if (expActivityCost) expActivityCost.textContent = formatInr(activityCost);

    if (calcProTip) {
      calcProTip.innerHTML = `<strong>Pro-Tip for ${dest.name.split('&')[0].trim()}:</strong> ${dest.proTipCalc}`;
    }
  }

  if (calcDestinationSelect) calcDestinationSelect.addEventListener('change', recalculateTripBudget);
  if (calcDaysRange) calcDaysRange.addEventListener('input', recalculateTripBudget);

  document.querySelectorAll('input[name="calcTier"]').forEach((radio) => {
    radio.addEventListener('change', recalculateTripBudget);
  });

  if (calcTravDec && calcTravInc && calcTravCount) {
    calcTravDec.addEventListener('click', () => {
      let val = parseInt(calcTravCount.value, 10);
      if (val > 1) {
        calcTravCount.value = val - 1;
        recalculateTripBudget();
      }
    });

    calcTravInc.addEventListener('click', () => {
      let val = parseInt(calcTravCount.value, 10);
      if (val < 10) {
        calcTravCount.value = val + 1;
        recalculateTripBudget();
      }
    });
  }

  recalculateTripBudget();

  // Bucket list drawer
  const bucketListModal = document.getElementById('bucketListModal');
  const openBucketListBtn = document.getElementById('openBucketListBtn');
  const closeBucketListModalBtn = document.getElementById('closeBucketListModal');
  const bucketListContainer = document.getElementById('bucketListContainer');

  function renderBucketListModal() {
    if (!bucketListContainer) return;
    if (bucketList.length === 0) {
      bucketListContainer.innerHTML = `
        <div class="empty-results-box">
          <i class="fa-regular fa-heart"></i>
          <h4>Your Bucket List is empty</h4>
          <p class="text-muted">Click the heart icon on any destination card to save it for your next trip!</p>
        </div>
      `;
      return;
    }

    bucketListContainer.innerHTML = bucketList.map((id) => {
      const dest = DESTINATIONS.find(d => d.id === id);
      if (!dest) return '';
      return `
        <div class="bucket-item-row" data-id="${dest.id}">
          <div class="bucket-item-info">
            <strong>${dest.name} (${dest.country})</strong>
            <span>${dest.bestSeason} &bull; ${dest.dailyBudgetInr}/day</span>
          </div>
          <div class="bucket-item-actions">
            <button class="btn btn-outline btn-sm view-saved-btn" data-id="${dest.id}">View Guide</button>
            <button class="bucket-remove-btn" data-id="${dest.id}" title="Remove from list"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      `;
    }).join('');

    bucketListContainer.querySelectorAll('.view-saved-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        closeBucketListModal();
        openDestinationModal(btn.getAttribute('data-id'));
      });
    });

    bucketListContainer.querySelectorAll('.bucket-remove-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        toggleBucketItem(btn.getAttribute('data-id'));
      });
    });
  }

  function openBucketListModal() {
    renderBucketListModal();
    if (bucketListModal) {
      bucketListModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeBucketListModal() {
    if (bucketListModal) {
      bucketListModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (openBucketListBtn) openBucketListBtn.addEventListener('click', openBucketListModal);
  if (closeBucketListModalBtn) closeBucketListModalBtn.addEventListener('click', closeBucketListModal);

  // Guide route buttons (Spiti, Ladakh, Kerala, Swiss Alps, Kyoto)
  document.querySelectorAll('.guide-route-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const destId = btn.getAttribute('data-dest-id');
      if (destId) {
        openDestinationModal(destId);
      }
    });
  });

  // High Altitude Advisory Modal
  const guideAdvisoryModal = document.getElementById('guideAdvisoryModal');
  const openGuideAdvisoryBtn = document.getElementById('openGuideAdvisoryBtn');
  const closeGuideAdvisoryBtn = document.getElementById('closeGuideAdvisoryBtn');
  const ackGuideAdvisoryBtn = document.getElementById('ackGuideAdvisoryBtn');

  function openGuideAdvisory() {
    if (guideAdvisoryModal) {
      guideAdvisoryModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeGuideAdvisory() {
    if (guideAdvisoryModal) {
      guideAdvisoryModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (openGuideAdvisoryBtn) openGuideAdvisoryBtn.addEventListener('click', openGuideAdvisory);
  if (closeGuideAdvisoryBtn) closeGuideAdvisoryBtn.addEventListener('click', closeGuideAdvisory);
  if (ackGuideAdvisoryBtn) {
    ackGuideAdvisoryBtn.addEventListener('click', () => {
      closeGuideAdvisory();
      showToast('Altitude safety briefing acknowledged & logged.');
    });
  }

  // Close modals on clicking outside or pressing Escape
  window.addEventListener('click', (e) => {
    if (e.target === destinationModal) closeDestinationModal();
    if (e.target === bucketListModal) closeBucketListModal();
    if (e.target === guideAdvisoryModal) closeGuideAdvisory();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDestinationModal();
      closeBucketListModal();
      closeGuideAdvisory();
    }
  });

  // Mobile menu drawer
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');

  if (mobileMenuToggle && mobileDrawer && drawerClose) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    };

    drawerClose.addEventListener('click', closeDrawer);
    document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', closeDrawer));
  }

  // Smooth scroll entrance animations for sections
  const revealElements = document.querySelectorAll('.section-spacing, .expert-guide-section, .hero-content-wrapper');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => {
      el.classList.add('reveal-init');
      revealObserver.observe(el);
    });
  }

});
