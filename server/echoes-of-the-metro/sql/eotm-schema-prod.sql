drop schema if exists eotm cascade;
create schema eotm;
set search_path to eotm;

create table app_role (
	app_role_id serial primary key,
	role_name varchar(50) unique not null
);

create table app_user (
	app_user_id serial primary key,
	username varchar(50) unique not null,
	email varchar(254) unique not null,
	password_hash varchar(2048) not null,
	mgr int not null default 0,
	scrap int not null default 0,
	fuel int not null default 0,
	app_role_id int not null,
	disabled boolean not null default false,
	foreign key (app_role_id) references app_role(app_role_id)
);

create table locations (
	location_id serial primary key,
	location_name varchar(50) not null,
	description varchar(5000) not null,
	location_type varchar(50) not null check(location_type in ('STATION', 'SURFACE'))
);

create table badges (
	badge_id serial primary key,
	badge_name varchar(50) not null,
	badge_image_path varchar(200) not null
);

create table events (
	event_id serial primary key,
	event_text varchar(200) not null,
	event_type varchar(50) not null check(event_type in ('ATTACK', 'ENCOUNTER', 'ARTIFACT', 'ANOMALY', 'RESOURCE', 'STANDARD')),
	scrap_found int,
	fuel_found int,
	mgr_collected int,
	location_id int,
	badge_id int,
	sound_path varchar(200),
	media_path varchar(200),
	foreign key (location_id) references locations(location_id),
	foreign key (badge_id) references badges(badge_id)
);

create table storylines (
	storyline_id serial primary key,
	storyline_title varchar(50) not null unique,
	app_user_id int not null,
	foreign key (app_user_id) references app_user(app_user_id) on delete cascade
);

create table journal (
	journal_id serial primary key,
	title varchar(50) not null,
	text varchar(5000) not null,
	storyline_id int,
	app_user_id int not null,
	location_id int not null,
	whispers int default 0,
	created_at timestamp not null,
	created_status varchar(50) not null default 'FRESH' check(created_status in ('FRESH', 'FADED', 'WEATHERED', 'WITHERED')),
	foreign key (storyline_id) references storylines(storyline_id),
	foreign key (location_id) references locations(location_id),
	foreign key (app_user_id) references app_user(app_user_id) on delete cascade
);

create table echoes (
	echo_id serial primary key,
	journal_id int not null,
	app_user_id int not null,
	unique (journal_id, app_user_id),
	foreign key (journal_id) references journal(journal_id) on delete cascade,
	foreign key (app_user_id) references app_user(app_user_id) on delete cascade
);

create table app_user_badge (
	app_user_id int not null,
	badge_id int not null,
	date_earned timestamp not null,
	primary key (app_user_id, badge_id),
	foreign key (app_user_id) references app_user(app_user_id) on delete cascade,
	foreign key (badge_id) references badges(badge_id) on delete cascade
);


select * from storylines;
select * from badges;


	insert into app_role (role_name) values
	('STALKER'),
	('ADMIN');

	-- Insert users
	insert into app_user (username, email, password_hash, app_role_id, mgr, scrap, fuel, disabled)
	values
	('shadowrunner', 'shadow@example.com', '$2y$10$ykL7/uZEO2EAs1oAQsHrgeZ19CwBSimniaQ77GkHHYNNJCxlsDbpS', 1, 10, 5, 3, false),
	('metro_admin', 'admin@example.com', '$2y$10$ykL7/uZEO2EAs1oAQsHrgeZ19CwBSimniaQ77GkHHYNNJCxlsDbpS', 2, 50, 25, 15, false),
	('wanderer', 'wanderer@example.com', '$2y$10$ykL7/uZEO2EAs1oAQsHrgeZ19CwBSimniaQ77GkHHYNNJCxlsDbpS', 1, 5, 10, 2, false);

	-- Insert locations
	INSERT INTO locations (location_name, description, location_type)
	VALUES
	-- Stations
	('Polis', 'Located at the junction of the Serpukhovsko–Timiryazevskaya, Arbatsko–Pokrovskaya, and Koltsevaya lines. Considered the political and cultural center of the Metro. One of the few stations to remain largely intact after the bombings. Electricity is stable, air filters are clean, and trade is open to most factions. The Council of Polis governs from here, maintaining what’s left of law and knowledge. The Great Library is nearby, though expeditions there are dangerous. Despite its order and strength, Polis relies heavily on supplies from Hansa and the southern lines.', 'STATION'),
	('VDNKh Station', 'A major station on the Kaluzhsko-Rizhskaya Line, named for the All-Russia Exhibition Centre above. It is a large, well-organized settlement with a stable economy, primarily based on the production and trade of mushroom tea. The station maintains strict laws and rules, enforces education for children, and sustains a substantial population that is generally well-fed and sheltered. VDNKh maintains strong security, collapsing one tunnel to reduce guard duties while patrolling the remaining tunnels rigorously. It also supports nearby smaller stations by providing manpower and protection in exchange for cooperation and trade. Despite occasional mutant activity in nearby tunnels, the station remains prosperous and self-sufficient.', 'STATION'),
	('Alexeyevskaya Station', 'A small, sparsely populated station on the Kaluzhsko-Rizhskaya Line. Inhabitants farm mushrooms and raise pigs, though production is often limited. The station relies on trade and protection from VDNKh, with connecting tunnels patrolled for safety. Local law enforcement maintains order, and basic infrastructure links the station to nearby settlements.', 'STATION'),
	('Rizhskaya Station', 'A small, rundown station and member of the VDNKh Commonwealth. The station struggles with overcrowding and poor living conditions, with residents often confined to tiny, mud-floored houses. Local trade includes mushroom vodka and basic supplies, while a small pig farm supports the community. The station relies on aid and protection from VDNKh, and its tunnels are patrolled for safety. Despite frequent setbacks and misfortune, the inhabitants maintain the station and sustain its limited economy.', 'STATION'),
	('Prospekt Mira Station', 'A large station with multiple functional areas, including a bar, a market, and a rail bike repair section near the tunnels to Hanza. Weapon and ammunition vendors operate alongside the repair area, and a retrofitted train car provides living quarters. The station maintains order through its guards, while a radio operator keeps communications with other stations active. Despite occasional tensions with outsiders, Prospekt Mira serves as a well-organized and active hub on its line.', 'STATION'),
	('Sukharevskaya Station', 'A fortified station serving as a bandit base. The station is dark and sparsely lit, with scattered bonfires marking gathering areas, some brighter for higher-ranking individuals. The layout includes a central passage with offshoots to sleeping quarters, toilets, and a small recreational area. Barricades divide the station, and residents engage in gambling and target practice. Sukharevskaya functions primarily as a stronghold rather than a hub for trade or travel.', 'STATION'),
	('Turgenevskaya Station (Cursed Station)', 'A shallow station with a main passage and offshoots to the platforms. The few remaining survivors live in fear of constant nosalise attacks, using sandbags, machine guns, and barricades for defense. Makeshift shelters occupy the escalators, and the far end of the platform contains a concrete wall with a hole leading to a ventilation area serving as a shrine to the dead. Both platforms are blocked at the ends, with one breached by the invading creatures, making the station a dangerous and contested stronghold.', 'STATION'),
	('Kitay-gorod Station', 'A transfer station divided between two gangs, with no law or formal enforcement. One faction consists of Russian Slavs, the other of Muslim Caucasians. Travelers and caravans pass through from Sukharevskaya, but the station is dominated by anarchy and crime. The station is connected to nearby lines, serving as a dangerous waypoint rather than a safe settlement.', 'STATION'),
	('Venice', 'A flooded, independent section of Tretyakovskaya and Novokuznetskaya. Formally overseen by station master Simon, the station is largely controlled by gangsters, giving it economic freedom but little formal law. Flooded streets and irradiated waters shape daily life, with fishing providing a key source of food and trade. Public areas are relatively safe, with shops, a bar, and a small brothel, but criminal activity is common in less accessible sections. Venice functions as a unique, semi-open hub in the Metro despite its hazards.', 'STATION'),
	('Paveletskaya Station', 'A station with a missing surface Hermetic Door, leaving it exposed to nightly mutant attacks. The population is small and weak, with children showing signs of mutation due to radiation and poor living conditions. Water and air are heavily polluted. Steel gates enforce a strict curfew to protect inhabitants, and guards patrol constantly to defend against surface monsters. The station is respected by other factions for controlling a major Metro entrance, despite its harsh environment.', 'STATION'),
	('Teatralnaya Station', 'Teatralnaya serves as the cultural heart of the Metro while standing on the frontline between Red Line and Reich territory. Red Line soldiers maintain strict patrols, fortified entrances, and automated defenses to protect the station from attack. Theaters remain active, hosting performances for refugees and locals alike, though the content is often limited to avoid offending either faction. Periodic raids and skirmishes with Reich forces keep the station on high alert, and the Red Line’s presence ensures the safety of both performers and civilians while preserving Teatralnaya as a rare center of culture amid the ongoing conflict.', 'STATION'),
	('Kuznetsky Most Station', 'A large station under Red Line control, officially claiming independence but closely monitored with curfews and frequent searches. The settlement produces the majority of the Metro’s weapons and ammunition, using the knowledge and equipment brought from the surface factory above. The main passage houses workers, vendors, and manufacturing areas, while small living quarters are packed tightly for residents. Red Army iconography and guards dominate the station, reflecting its role as a stronghold and industrial hub for the Communist faction.', 'STATION'),
	('Polyanka Station', 'An abandoned, ghostly station south of Polis. No one lives here, and travelers often experience strange visions of the past or people long dead. Bonfires may appear along the platforms, seemingly attended by phantoms. The station is considered dangerous and eerie, serving only as a passage between other settlements, with occasional mutant threats in its tunnels. Known as "Destiny Station" by the Council of Polis.', 'STATION'),
	('Oktyabrskaya Station', 'A two-part station split between Hansa and Red Line control. The Radial side is controlled by the Reds, while the Ring side falls under Hansa, though the station has experienced severe devastation. A deadly infection wiped out most residents, leaving buildings burned and bodies abandoned. The Reds attempted to use the virus as a weapon to weaken Hansa, but the plan ultimately failed. The station now stands largely abandoned and dangerous, serving as a cautionary passage rather than a populated settlement.', 'STATION'),
	('Smolenskaya Station', 'A heavily organized and militarized station with a tense, fortified atmosphere. Soldiers patrol throughout, and civilians are wary of outsiders. The station serves as a logistical hub for restocking and coordinating operations, while also being home to a diverse population, including Caucasians. Its strategic importance and defensive setup make it one of the more secure stations in the Metro.', 'STATION'),
	('Novokosino Station', 'A terminal station of the Kalininskaya line and part of the Kalininskaya Confederation. The station is peaceful and economically stable, with little threat from mutants or bandits. Residents focus on daily life and trade, benefiting from the calm and secure environment of the Confederation. Occasional anomalies are the only significant danger in the area.', 'STATION'),
	('Ryazansky Prospekt', 'The capital station of the Ryazan Community on the Tagansko-Krasnopresnenskaya line. The community controls Tekstil’schiki, Kuzminki, and Ryazansky Prospekt, but is effectively cut off from the rest of the Metro because the surface section between Volgogradsky Prospekt and Tekstil’schiki is too dangerous to traverse. Kuzminki serves as the agricultural center, providing mushrooms and rat meat to the population, while Ryazansky Prospekt acts as the administrative and trade hub.', 'STATION'),
	('Ploshchad Il''yicha Station', 'An abandoned station of the Kalininskaya Confederation. Only fragments of crumpled structures remain, gnawed by oversized rats. Once the capital of the Confederation, the station now houses a ruined hospital, a few pre-war railcars, and remnants of administrative offices. Leaflets with work schedules are scattered across the lobbies. A central hall provides a connection to Rimskaya and other branches of the Metro.', 'STATION'),
	('Kievskaya Station', 'Kievskaya is a sparsely populated station southwest of Polis. The residents live in tightly packed tents, as they are terrified of an unknown threat. The station struggles with the disappearance of children and other residents, creating a constant atmosphere of fear.', 'STATION'),
	('Belorusskaya Station', 'Belorusskaya is a small but extremely wealthy station nestled between the farming communities to the north and Hansa to the south. The station maintains its independence and neutrality, with its traders, who call themselves “managers”, keeping commerce flowing without allegiance to the Ring Line. Despite its wealth, the station has a dark undercurrent; in the stories told by travelers, Satanists are known to abduct drunks for sacrifices, and Belorusskaya trades with the Fourth Reich, likely exchanging food for gear and supplies.', 'STATION');
	
	-- Insert badges
	insert into badges (badge_name, badge_image_path)
	values
	('First Steps', '/images/badges/first_steps.png'),
	('Explorer', '/images/badges/explorer.png');
	
	-- Insert storylines
	insert into storylines (storyline_title, app_user_id)
	values
	('The Fall of the Metro', 1),
	('Rise of the Wanderers', 3);
	
	-- Insert events
	insert into events (event_text, event_type, scrap_found, fuel_found, mgr_collected, location_id, badge_id, sound_path, media_path)
	values
	('You stumble upon a hidden stash of scrap.', 'STANDARD', 15, 2, 1, null, 1, 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1759875245/ghost_scream_1_scllb9.wav', null),
	('A strange anomaly blocks your path.', 'ANOMALY', 0, 0, 5, null, null, null, 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1755818893/wlvmzkpop3zxwedll5la.png');
	
	-- Insert journals
	insert into journal (title, text, storyline_id, app_user_id, location_id, whispers, created_at, created_status)
	values
	('Echoes of the Past', 'Every footstep here feels borrowed, as if the station remembers its passengers more vividly than the living do.', null, 1, 1, 0, NOW() - INTERVAL '87 days', 'FRESH'),
	('Dripping Arches', 'The sound of water dripping from the arches keeps time like a clock that refuses to stop.', null, 3, 1, 0, NOW() - INTERVAL '140 days', 'WEATHERED'),
	('Ghosts of the Red Line', 'I swear I heard a conductor call out the next stop. No trains have run here in decades.', null, 1, 1, 0, NOW() - INTERVAL '200 days', 'FRESH'),
	('Rust and Silence', 'Metallic air clings to the lungs. Even silence tastes of iron here.', null, 3, 1, 0, NOW() - INTERVAL '32 days', 'WEATHERED'),
	('Half-Seen Shadows', 'A silhouette darted across the tracks, vanishing before I could breathe.', null, 1, 1, 0, NOW() - INTERVAL '270 days', 'FRESH'),
	('Passenger Murmurs', 'A hum fills the tunnels, too soft to be the wind. I avoid the far platform now.', null, 3, 1, 0, NOW() - INTERVAL '64 days', 'FRESH'),
	('Return to Dust', 'Tiles crumble under my boots. One day the whole station will collapse into itself.', null, 1, 1, 0, NOW() - INTERVAL '99 days', 'WEATHERED'),
	('The Third Rail', 'I found the third rail intact, but dead. Still, I could swear I heard a current buzzing faintly.', null, 3, 1, 0, NOW() - INTERVAL '180 days', 'FRESH'),
	('Painted Walls', 'Graffiti still glows faintly in lantern light. Some symbols don’t look human.', null, 1, 1, 0, NOW() - INTERVAL '15 days', 'FRESH'),
	('Departure Never Called', 'A broken speaker crackled with static today, then whispered a station name I didn’t recognize.', null, 3, 1, 0, NOW() - INTERVAL '320 days', 'WEATHERED'),
	('Buzzing Lights', 'The old bulbs hum louder than they should, like they resent still being alive.', null, 1, 2, 0, NOW() - INTERVAL '43 days', 'FRESH'),
	('Water on the Tracks', 'Ripples spread across the puddles even when I hold my breath.', null, 3, 2, 0, NOW() - INTERVAL '88 days', 'FRESH'),
	('Footsteps Not Mine', 'The water reflects more than one figure. I was alone.', null, 1, 2, 0, NOW() - INTERVAL '200 days', 'WEATHERED'),
	('Still Stirring', 'Something below the platform keeps moving the stones when no one is there.', null, 3, 2, 0, NOW() - INTERVAL '320 days', 'FRESH'),
	('Rust and Sparks', 'My lamp caught a wire sparking in the dark, but the circuit should be dead.', null, 1, 2, 0, NOW() - INTERVAL '60 days', 'FRESH'),
	('Beneath the Blue', 'There is a smell like burnt ozone here that never fades.', null, 3, 2, 0, NOW() - INTERVAL '130 days', 'WEATHERED'),
	('Unseen Traveler', 'The rails shook as though a train was arriving. Nothing came.', null, 1, 2, 0, NOW() - INTERVAL '220 days', 'FRESH'),
	('Crushed Tracks', 'Half the rail is buried under concrete teeth. I crawled through but felt the rubble shift above.', null, 3, 3, 0, NOW() - INTERVAL '45 days', 'WEATHERED'),
	('Jagged Teeth', 'Steel rods jab upward like fangs. Something bled here once, and the stains remain.', null, 1, 3, 0, NOW() - INTERVAL '125 days', 'FRESH'),
	('Buried Alive', 'It feels like the debris is waiting to fall again, eager to trap more lives beneath.', null, 3, 3, 0, NOW() - INTERVAL '300 days', 'FRESH'),
	('Faint Airflow', 'Despite the collapse, air still breathes through. But from where?', null, 1, 3, 0, NOW() - INTERVAL '150 days', 'WEATHERED'),
	('Dead End', 'The rubble isn’t just blocking—it’s sealing. Like someone meant it that way.', null, 3, 3, 0, NOW() - INTERVAL '190 days', 'FRESH'),
	('Vaulted Echoes', 'Every whisper bounces endlessly, making it impossible to tell friend from foe.', null, 1, 6, 0, NOW() - INTERVAL '30 days', 'FRESH'),
	('Footsteps Behind', 'A set of footsteps follows me exactly, yet when I turn no one is there.', null, 3, 6, 0, NOW() - INTERVAL '75 days', 'WEATHERED'),
	('Whispering Walls', 'The walls themselves seem to speak in tones just below hearing.', null, 1, 6, 0, NOW() - INTERVAL '140 days', 'FRESH'),
	('Faint Glow', 'Broken lights flicker in harmony with the echoes, creating phantom shapes.', null, 3, 6, 0, NOW() - INTERVAL '90 days', 'FRESH'),
	('Muffled Screams', 'Far off, something sounds like a scream, but I see only shadows.', null, 1, 6, 0, NOW() - INTERVAL '220 days', 'FRESH'),
	('Hall of Mirrors', 'Reflections in puddles multiply sounds until I can no longer trust them.', null, 3, 6, 0, NOW() - INTERVAL '50 days', 'WEATHERED'),
	('Resonance', 'The chamber hums at a frequency I can almost feel in my chest.', null, 1, 6, 0, NOW() - INTERVAL '180 days', 'FRESH'),
	('Endless Arch', 'I can never see the end; the echoes suggest it goes on forever.', null, 3, 6, 0, NOW() - INTERVAL '10 days', 'FRESH'),
	('Total Darkness', 'No light penetrates here. I rely on touch and intuition alone.', null, 1, 7, 0, NOW() - INTERVAL '25 days', 'FRESH'),
	('Cold Breath', 'The air bites my lungs; each step feels like moving through water.', null, 3, 7, 0, NOW() - INTERVAL '70 days', 'WEATHERED'),
	('Hands on the Wall', 'Every wall is damp, and I feel strange shapes brushing past me.', null, 1, 7, 0, NOW() - INTERVAL '120 days', 'FRESH'),
	('Whispering Floors', 'Even the floorboards seem to creak with someone else’s weight.', null, 3, 7, 0, NOW() - INTERVAL '95 days', 'FRESH'),
	('Breath of Something', 'I hear exhalations that do not belong to me.', null, 1, 7, 0, NOW() - INTERVAL '200 days', 'FRESH'),
	('Endless Tunnel', 'Every turn leads to more darkness, I fear I will walk forever.', null, 3, 7, 0, NOW() - INTERVAL '160 days', 'WEATHERED'),
	('Graffiti Stories', 'Each wall tells a tale of scavengers and wanderers lost to time.', null, 1, 8, 0, NOW() - INTERVAL '15 days', 'FRESH'),
	('Vanishing Rails', 'Rails vanish into shadow; maps cannot guide anyone here.', null, 3, 8, 0, NOW() - INTERVAL '50 days', 'WEATHERED'),
	('Shadowed Corners', 'Dark corners hide more than debris.', null, 1, 8, 0, NOW() - INTERVAL '120 days', 'FRESH'),
	('Collapsing Roof', 'The ceiling groans; I fear it will give way any moment.', null, 3, 8, 0, NOW() - INTERVAL '80 days', 'FRESH'),
	('Whispers of Others', 'I hear footsteps echo that do not match mine.', null, 1, 8, 0, NOW() - INTERVAL '200 days', 'FRESH'),
	('Cracked Tile', 'Each step risks the tile crumbling beneath.', null, 3, 8, 0, NOW() - INTERVAL '180 days', 'FRESH'),
	('Rubble Maze', 'Tunnels twist like a labyrinth; I lose sense of direction.', null, 1, 8, 0, NOW() - INTERVAL '30 days', 'WEATHERED'),
	('Faded Signs', 'Signage points nowhere useful, mocking lost travelers.', null, 3, 8, 0, NOW() - INTERVAL '100 days', 'FRESH'),
	('Distant Echo', 'A sound from deep below returns distorted, unsettling.', null, 1, 8, 0, NOW() - INTERVAL '250 days', 'FRESH'),
	('Rust Drip', 'Orange flakes fall into puddles; the metallic smell is suffocating.', null, 1, 9, 0, NOW() - INTERVAL '60 days', 'FRESH'),
	('Creaking Beams', 'The steel groans like it is alive, threatening to collapse.', null, 3, 9, 0, NOW() - INTERVAL '90 days', 'WEATHERED'),
	('Corrosion Breath', 'The air tastes of old metal and dust.', null, 1, 9, 0, NOW() - INTERVAL '120 days', 'FRESH'),
	('Shadowed Puddles', 'Reflections in water seem to shift when I look away.', null, 3, 9, 0, NOW() - INTERVAL '180 days', 'FRESH'),
	('Stale Wind', 'A constant breeze carries a metallic tang that stings eyes.', null, 1, 9, 0, NOW() - INTERVAL '40 days', 'WEATHERED'),
	('Collapsed Support', 'One beam sags dangerously; I avoid the center of the platform.', null, 3, 9, 0, NOW() - INTERVAL '200 days', 'FRESH'),
	('Lonely Tracks', 'Tracks vanish into darkness, unused for decades.', null, 1, 9, 0, NOW() - INTERVAL '15 days', 'FRESH'),
	('Faded Murals', 'Ancient mosaics tell stories no one remembers.', null, 3, 10, 0, NOW() - INTERVAL '20 days', 'FRESH'),
	('Veiled in Dust', 'Dust coats everything like a funeral shroud.', null, 1, 10, 0, NOW() - INTERVAL '50 days', 'WEATHERED'),
	('Cracked Tiles', 'Each step releases clouds of gray dust.', null, 3, 10, 0, NOW() - INTERVAL '100 days', 'FRESH'),
	('Forgotten Residents', 'Shoes, hats, and notes left behind whisper of lives vanished.', null, 1, 10, 0, NOW() - INTERVAL '180 days', 'FRESH'),
	('Silent Corridors', 'Hallways stretch endlessly, carrying no sound but my own.', null, 3, 10, 0, NOW() - INTERVAL '75 days', 'FRESH'),
	('Time’s Shadow', 'Sunlight never reaches the interior; darkness rules.', null, 1, 10, 0, NOW() - INTERVAL '150 days', 'FRESH');

	-- Insert echoes
	insert into echoes (journal_id, app_user_id)
	values
	(1, 2), -- metro_admin echoed shadowrunner’s journal
	(2, 1); -- shadowrunner echoed wanderer’s journal
	
	-- Insert user badges
	insert into app_user_badge (app_user_id, badge_id, date_earned)
	values
	(3, 2, now());

	select * from echoes;
	select * from app_user_badge;
	select * from app_user;