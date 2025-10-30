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
	event_text varchar(1000) not null,
	event_type varchar(50) not null check(event_type in ('ATTACK', 'ENCOUNTER', 'ARTIFACT', 'ANOMALY', 'LOCATION', 'STANDARD')),
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
	('Ghost Train', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761709113/ghost-train-badge_a8sa6d.png'),
	('Wicked Phenomenon', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761709120/anomaly-badge_lvqexq.png'),
	('Singing Pipes', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761709120/pipes-badge_xprte8.png'),
	('Mental Survivor', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761709117/mental-badge_qqa1b8.png'),
	('The Black Ones', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761709117/darkone-badge_citdgd.png'),
	('A Spartan Stash', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761709116/stash-badge_oaqv80.png'),
	('Savior For Paveletskaya', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761709114/savior-paveletskaya-badge_b2z8gq.png'),
	('Savior For Cursed Staion', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761709114/cursed-station-save-badge_msd5la.png'),
	('The Center of The Metro', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761709113/polis-badge_hastcm.png'),
	('Theatrics', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761709113/theater-badge_ag7lcb.png'),
	('Atomized Purgatory', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761709120/ghost-badge_ochwgb.png');
	
	-- Insert storylines
	insert into storylines (storyline_title, app_user_id)
	values
	('The Fall of the Metro', 1),
	('Rise of the Wanderers', 3);
	
	-- Insert events
	insert into events (event_text, event_type, scrap_found, fuel_found, mgr_collected, location_id, badge_id, sound_path, media_path)
	values
	('You stumble upon a hidden stash of scrap.', 'STANDARD', 15, 2, 1, null, null, null, null),
	('You Reach Polis, the center of the whole metro. A station with immense wealth and power', 'LOCATION', 0, 0, 0, 1, 9, null, 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761778231/Polis_g2sqcv.webp'),
	('You Reach VDNKh, It is under constant attack by the Dark Ones, many of its soldiers have been driven mad by their psychic attacks.', 'LOCATION', 0, 0, 0, 2, null, null, 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761778317/000VDNKhSpeaker_xuz4lu.webp'),
	('In your travel, you hear a strange noise. Almost like there is a subway train heading right for you. You quickly move off to the side of the tracks and witness a ghostly image of a train whizz past, lights blinding you in the suffacating darkness. It takes a moment for you eyes to readjust, and to process what you just saw', 'ANOMALY', 0, 0, 0, null, 1, 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761785018/ghost_train_break_cv4s9i.wav', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761778813/ghosttrain_lqgzwh.png'),
	('You hear a strange buzzing in the distance, as it closes upon you, you begin to feel stange. An electric ball of light appears floating in you direction. You hide under an old derailed cart. You see it float by you buzzing and arcing to the walls of the tunnel. Once it passes so does the strange feeling in your gut. You find a pouch cartridges while under the cart, seems like someone meant to comeback and grab it, maybe that thing got them.', 'ANOMALY', 0, 0, 8, null, 2, 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761785012/anomaly_spark3_brl1wj.wav', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761779250/ezgif-83bf3c33f13270_xiv75b.gif'),
	('You catch a faint murmur from one of the old pipes running along the tunnel wall — low, uneven, and unmistakably human. As you edge closer, the voice steadies, whispering from deep within the metal, like someone pleading from far below. Without warning, it erupts into a piercing scream that tears through the tunnel, rattling the walls and knocking you backward as your ears ring.', 'ANOMALY', 0, 0, 0, null, 3, 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761785033/pipe_cry_1_fvydhj.wav', null),
	('You move cautiously through the tunnel everyone warned you about — a place whispered to swallow men whole. The deeper you go, the thicker the darkness becomes, until your flashlight barely cuts through the air, its beam swallowed just a few feet ahead. Your body grows heavy, each step harder than the last, until your knees buckle and the world fades to black. When you wake, the tunnel is silent, your light works again, and everything looks untouched — yet every instinct screams that you were not welcome here.', 'ANOMALY', 0, 0, 0, null, 4, 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761785039/tun_moan_2_zjuvx8.wav', null),
	('Having arrived at VDNKh, you decide to investigate the rumors plaguing the old metro station and join the next patrol heading toward the tunnel outskirts. You are joking quietly with the others, trading rumors to keep the tension at bay, when a shape shifts in the distance, catching all of your eyes. A sharp, agonizing voice rips through your mind, echoing inside everyone’s skull, and you all reach for your weapons only to find your limbs frozen; then, as suddenly as it began, the presence vanishes, leaving nothing but a lingering, suffocating sense that something watched you.', 'ENCOUNTER', 0, 0, 0, 2, 5, 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761785019/dark_one_start12secpik_mkpooy.wav', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761779633/ezgif-8df11191b317c3_gqjnrn.gif'),
	('Along the route to your destination, you stumble across a hidden Spartan stash tucked into a crumbling alcove. Inside, supplies are neatly arranged, ammo, rations, and a few rare tools, a quiet reminder that someone had passed this way before you. You take what you need, leaving the rest untouched, and move on, the shadowed tunnel swallowing your footsteps once more.', 'STANDARD', 5, 1, 3, null, 6, null, null),
	('You arrive at Paveletskaya in the middle of an attack, shielding a woman and her child as mutants burst through the barricades and pour into the station. The guards are locked in a desperate struggle, and you join the fight, firing into the shadows to push the creatures back. When the last mutant falls, the woman presses a few cartridges into your hands, her voice shaking as she thanks you for keeping her and her child alive.', 'LOCATION', 0, 0, 4, 10, 7, null, null),
	('You arrive at Cursed Station just in the nick of time, the echoes of mutant screams and gunfire filling the air as the last soldiers struggle to hold the tunnels. Racing through the chaos, you help push back the creatures, giving the survivors in their tents a brief moment of safety. When the dust settles, one of the soldiers presses his pockets full of cartridges into your hands, nodding in gratitude for your timely aid.', 'LOCATION', 0, 0, 12, 7, 8, null, null),
	('You arrive at Polis, the heart of the Metro, where the hum of machinery and the bustle of people echo through vast platforms and towering structures. The air carries a mix of industry and intellect, a city where knowledge and order still hold sway amidst the darkness of the tunnels. Everywhere you look, scholars, soldiers, and merchants move with purpose, a stark reminder that this is a place unlike any other in the Metro. A bastion of civilization in a world gone mad.', 'LOCATION', 0, 0, 0, 1, 9, null, 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761780068/ezgif-8ae5f76ef0ae4a_t1gczd.gif'),
	('You arrive at Teatralnaya Station, known for its plays and performances, which remain the station’s main attraction. Red Line guards patrol the platforms, some armed with flamethrowers, while travelers and refugees move through the corridors. Despite the tension between the Reich and the Red Line, the theater spaces are still maintained, a reminder of the station’s cultural importance.', 'LOCATION', 0, 0, 0, 11, 10, null, 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761780162/TheatreLocation_r233o1.webp'),
	('As you move through the tunnel, faint ghostly forms begin to flicker along the walls, shapes that shift like shadows caught in the glow of your flashlight. You catch glimpses of outlines frozen in motion, figures repeating gestures that seem eerily familiar yet impossible. Unease grips you, and you break into a run, desperate to leave this section of the tunnels, the phantoms stretching and twisting along the walls as you hurry toward safety.', 'ANOMALY', 0, 0, 0, null, 11, 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761785018/ghost_scream_4_vux6wy.wav', 'https://res.cloudinary.com/dhucaqc0o/image/upload/v1761780333/ghosts_aboxvk.png'),
	('You stumble upon a half-buried ammo crate. A few rounds are still usable.', 'STANDARD', 6, 0, 3, NULL, NULL, NULL, NULL),
	('A derailed trolley blocks your way. You pry loose some metal scrap from its frame.', 'STANDARD', 18, 0, 0, NULL, NULL, NULL, NULL),
	('An old soldier’s corpse lies in the tunnel. His vest still holds a pouch of military-grade rounds.', 'STANDARD', 0, 0, 7, NULL, NULL, NULL, NULL),
	('You dig through a collapsed maintenance room and recover a bundle of wiring.', 'STANDARD', 12, 0, 0, NULL, NULL, NULL, NULL),
	('You find a rusted lantern beside a burnt-out fire. There’s a small fuel canister next to it.', 'STANDARD', 0, 5, 0, NULL, NULL, NULL, NULL),
	('A sealed locker bursts open under your prybar—inside are two pristine mags of military rounds.', 'STANDARD', 0, 0, 12, NULL, NULL, NULL, NULL),
	('The air feels charged. You spot glowing fungus that seems to hum faintly—nothing useful, but deeply unsettling.', 'STANDARD', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You discover a dismantled railcar loaded with scrap metal and burned tools.', 'STANDARD', 22, 0, 0, NULL, NULL, NULL, NULL),
	('You hear distant laughter, but find only a child’s doll beside a few scattered casings.', 'STANDARD', 0, 0, 2, NULL, NULL, NULL, NULL),
	('A barricade lies smashed open. Among the wreckage, you recover a jerrycan of fuel.', 'STANDARD', 0, 10, 0, NULL, NULL, NULL, NULL),
	('Someone scrawled “TURN BACK” in blood. You find a few rounds beneath the writing.', 'STANDARD', 0, 0, 5, NULL, NULL, NULL, NULL),
	('An overturned crate spills tools and gears. You salvage what you can.', 'STANDARD', 14, 0, 0, NULL, NULL, NULL, NULL),
	('You hear something moving behind a wall. You leave quickly.', 'STANDARD', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You find an old helmet filled with dirty water. At the bottom lie a few corroded rounds.', 'STANDARD', 0, 0, 3, NULL, NULL, NULL, NULL),
	('A faint light flickers ahead. You find a maintenance station filled with scrap.', 'STANDARD', 20, 0, 0, NULL, NULL, NULL, NULL),
	('You stumble upon a half-eaten meal still warm. Whoever was here left in a hurry.', 'STANDARD', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You find a collapsed wall revealing an old supply room. You take a half-empty fuel drum.', 'STANDARD', 0, 9, 0, NULL, NULL, NULL, NULL),
	('You hear whispers behind you but find nothing—only a discarded scrap knife.', 'STANDARD', 3, 0, 0, NULL, NULL, NULL, NULL),
	('You find a tattered map with a few bullets taped to the back.', 'STANDARD', 0, 0, 5, NULL, NULL, NULL, NULL),
	('Someone rigged a tripwire. You disarm it and collect the metal parts.', 'STANDARD', 16, 0, 0, NULL, NULL, NULL, NULL),
	('You find a destroyed turret. Its ammo belt still holds a handful of rounds.', 'STANDARD', 0, 0, 9, NULL, NULL, NULL, NULL),
	('You wade through ankle-deep water and spot a faint green glow. A crate of scrap is half-submerged nearby.', 'STANDARD', 13, 0, 0, NULL, NULL, NULL, NULL),
	('A flicker of movement catches your eye. It’s just your reflection in a broken visor.', 'STANDARD', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You find an engineer’s notebook beside a small pile of brass fittings.', 'STANDARD', 11, 0, 0, NULL, NULL, NULL, NULL),
	('The tunnel grows cold. Your lamp flickers, but a metal box glints nearby.', 'STANDARD', 7, 0, 2, NULL, NULL, NULL, NULL),
	('You loot a smashed generator for spare parts.', 'STANDARD', 19, 0, 0, NULL, NULL, NULL, NULL),
	('A mutant’s corpse still smokes from recent combat. You salvage a pouch of rounds.', 'STANDARD', 0, 0, 9, NULL, NULL, NULL, NULL),
	('An overturned fuel drum leaks slowly. You manage to collect some of it.', 'STANDARD', 0, 9, 0, NULL, NULL, NULL, NULL),
	('You scavenge parts from a ruined generator. Some are still usable.', 'STANDARD', 17, 0, 0, NULL, NULL, NULL, NULL),
	('A makeshift shrine sits by the rail. A few rounds lie as an offering.', 'STANDARD', 0, 0, 5, NULL, NULL, NULL, NULL),
	('The tunnel feels wrong. You see your own shadow moving out of sync.', 'STANDARD', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You pry open a maintenance hatch and find a hidden stash of ammo.', 'STANDARD', 0, 0, 14, NULL, NULL, NULL, NULL),
	('A survivor shares a story of ghosts in the tunnels and gives you a handful of rounds for luck.', 'STANDARD', 0, 0, 6, NULL, NULL, NULL, NULL),
	('You run into a merchant convoy headed toward Polis. They trade you a few rounds for helping them push a cart.', 'ENCOUNTER', 0, 0, 3, NULL, NULL, NULL, NULL),
	('A group of bandits block the tunnel ahead, but you spot them first and hide until they pass.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('Two stalkers share a fire with you. They give you a bit of fuel for your lighter before heading east.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You overhear bandits arguing. While they fight among themselves, you quietly move past.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('A nosalis pack prowls ahead. You douse your light and wait until the screeching fades away.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('A lone wanderer shares a story of cursed tunnels and gives you a single round for luck.', 'ENCOUNTER', 0, 0, 1, NULL, NULL, NULL, NULL),
	('A Nazi patrol searches nearby. You stay hidden behind a broken wall until they move on.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('A nosalis drags a corpse into the dark just ahead. You stay frozen, then slip by unseen.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You spot a Red patrol ahead. They don’t notice you slipping into a maintenance hatch.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('A scavenger warns of mutants nearby, then vanishes into the darkness.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('A lurker darts past your feet and disappears into a vent.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You hear a child crying in the distance, but when you look, the tunnel is empty.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You meet a drunk scavenger who insists he saw ghosts. He drops a few rounds as he stumbles away.', 'ENCOUNTER', 0, 0, 2, NULL, NULL, NULL, NULL),
	('You find a trader’s cart overturned and looted, but a few liters of fuel remain.', 'ENCOUNTER', 0, 5, 0, NULL, NULL, NULL, NULL),
	('A Red officer offers you a cigarette and tells you to move along.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('A group of travelers invite you to rest by their fire. They share a small can of fuel.', 'ENCOUNTER', 0, 2, 0, NULL, NULL, NULL, NULL),
	('A lurker follows you for a while before losing interest.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('A merchant caravan offers you a few spare casings as thanks for scouting ahead.', 'ENCOUNTER', 0, 0, 3, NULL, NULL, NULL, NULL),
	('You hide behind a generator as a nosalis pack tears through the tunnel.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You meet an old man muttering about ghost tunnels. He trades you a bit of ammo for listening.', 'ENCOUNTER', 0, 0, 3, NULL, NULL, NULL, NULL),
	('You find a collapsed tunnel where bandits once camped. A few rounds glint in the dust.', 'ENCOUNTER', 0, 0, 4, NULL, NULL, NULL, NULL),
	('A fellow traveler shares a story of a ghost train that passes once a month.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You spot bandits looting a corpse. You wait until they leave, then take a few scraps.', 'ENCOUNTER', 5, 0, 0, NULL, NULL, NULL, NULL),
	('You meet a trader’s apprentice who gifts you a handful of scrap for helping him lift a crate.', 'ENCOUNTER', 7, 0, 0, NULL, NULL, NULL, NULL),
	('A lurker screeches nearby but flees when you flash your light.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('Someone is trapped under debris. You help free him, and he pays you with a few rounds.', 'ENCOUNTER', 0, 0, 3, NULL, NULL, NULL, NULL),
	('You meet a silent figure in an old gas mask. When you blink, he’s gone.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('A merchant warns of Nazis ahead, then disappears down a side tunnel.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You encounter a wounded Red soldier. He offers you spare bullets before limping away.', 'ENCOUNTER', 0, 0, 3, NULL, NULL, NULL, NULL),
	('A nosalis sniffs the air near your hiding spot, then loses your scent.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('A bandit group argues over loot. You quietly scavenge a few scraps while they’re distracted.', 'ENCOUNTER', 5, 0, 0, NULL, NULL, NULL, NULL),
	('You meet a trader heading to a Hansa station. He offers you a round as thanks for helping move a crate.', 'ENCOUNTER', 0, 0, 1, NULL, NULL, NULL, NULL),
	('A lurker nest crackles with movement. You slip through while they’re distracted by prey.', 'ENCOUNTER', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You share a flask with a Red deserter. He gifts you a handful of scrap before vanishing.', 'ENCOUNTER', 8, 0, 0, NULL, NULL, NULL, NULL),
	('A merchant camp offers to refill your lamp for free as thanks for standing watch.', 'ENCOUNTER', 0, 2, 0, NULL, NULL, NULL, NULL),
	('You find a Nazi checkpoint abandoned, with a few rounds left behind.', 'ENCOUNTER', 0, 0, 4, NULL, NULL, NULL, NULL),
	('A pack of Nosalises ambushes you near a collapsed tunnel. You fight them off with your knife and a few shots. After catching your breath, you scavenge a few useful scraps.', 'ATTACK', 8, 0, 0, NULL, NULL, NULL, NULL),
	('You’re ambushed by a pair of Lurkers while crossing a flooded section. Their screeches echo off the walls, but you manage to put them down. You recover some fuel from a nearby generator.', 'ATTACK', 0, 4, 0, NULL, NULL, NULL, NULL),
	('A group of Red patrolmen mistakes you for a spy and opens fire. You dive for cover, returning a few warning shots before slipping away. You find a dropped pouch of military-grade rounds.', 'ATTACK', 0, 0, 3, NULL, NULL, NULL, NULL),
	('You’re caught in crossfire between Nazi and Red patrols. You stay low and crawl to safety as bullets tear through the air. After the skirmish, you find some rounds among the fallen.', 'ATTACK', 0, 0, 10, NULL, NULL, NULL, NULL),
	('Bandits block your path and demand tribute. When they try to rob you, you react faster. After the fight, you take a few of their supplies.', 'ATTACK', 6, 2, 1, NULL, NULL, NULL, NULL),
	('A lone Nosalis leaps out from a service hatch. You shoot it at point blank, its body twitching before falling still. You recover and move on.', 'ATTACK', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You’re chased by a small pack of Nosalises down a side tunnel. You throw a Molotov and the flames drive them off. You collect melted scrap from the wreckage.', 'ATTACK', 5, 0, 0, NULL, NULL, NULL, NULL),
	('A Red patrol suddenly storms from a maintenance door, searching for deserters. You exchange fire, barely escaping through a ventilation shaft. You pick up a dropped ammo pouch.', 'ATTACK', 0, 0, 4, NULL, NULL, NULL, NULL),
	('Two Lurkers emerge from the darkness, their claws scraping metal. You fight them off with your shotgun, then salvage their nest for useful materials.', 'ATTACK', 7, 0, 0, NULL, NULL, NULL, NULL),
	('Bandits set up an ambush near a dimly lit section of the line. You spot the tripwire just in time, turn the tables, and leave with their stolen fuel canisters.', 'ATTACK', 0, 5, 0, NULL, NULL, NULL, NULL),
	('A Nazi patrol spots your flashlight and opens fire. You hit the ground, firing back until they retreat. You find a fallen soldier’s ammo pouch.', 'ATTACK', 0, 0, 2, NULL, NULL, NULL, NULL),
	('Bandits attack as you approach an old barricade. You duck behind cover and return fire. When it’s over, you find a small stash of rounds in their camp.', 'ATTACK', 0, 0, 5, NULL, NULL, NULL, NULL),
	('You hear claws scraping on the tracks before Nosalises swarm. You fend them off with gunfire.', 'ATTACK', 0, 0, 0, NULL, NULL, NULL, NULL),
	('Lurkers stalk you through a half-collapsed tunnel. One lunges, but you blast it midair.', 'ATTACK', 0, 0, 0, NULL, NULL, NULL, NULL),
	('Bandits chase you through an abandoned service line. You take cover behind an old train car and return fire. They retreat.', 'ATTACK', 0, 0, 0, NULL, NULL, NULL, NULL),
	('You’re attacked by starving Nosalises. You light them up with your flashlight and fire until the tunnel goes quiet.', 'ATTACK', 0, 0, 0, NULL, NULL, NULL, NULL),
	('A group of Lurkers tries to drag you into a flooded maintenance pit. You break free and cut them down.', 'ATTACK', 0, 0, 0, NULL, NULL, NULL, NULL),
	('Nosalises tear through a barricade in front of you. You fire into the chaos, surviving by luck and instinct. You scavenge scrap from the ruined barricade.', 'ATTACK', 10, 0, 0, NULL, NULL, NULL, NULL),
	('A Nazi patrol opens fire from a distance. You duck behind the rails and return controlled bursts. When they flee, you collect a few scattered unused rounds.', 'ATTACK', 0, 0, 2, NULL, NULL, NULL, NULL);
		
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
	select * from journal;
	select * from app_user_badge;
	select * from app_user;