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
	('Red Line Station', 'Once part of a thriving metro, the Red Line now lies in ruins. Crumbling arches drip with condensation, and every step echoes like a ghost of passengers long gone.', 'STATION'),
	('Blue Line Station', 'The Blue Line is lit by flickering bulbs that buzz faintly above rusted tracks. Puddles ripple with every distant tremor, as though something unseen still stirs the tunnels.', 'STATION'),
	('Green Line Terminal', 'A collapsed ceiling has buried half the tracks in rubble. Jagged rebar juts like broken teeth, forcing travelers to squeeze through unstable debris to move forward.', 'STATION'),
	('Central Hub', 'Once a bustling interchange that connected thousands, the Hub now sits as a hollow maze of shattered glass, broken signs, and long-dead escalators covered in dust.', 'STATION'),
	('Iron Gate Station', 'At the far end, massive corroded blast doors stand frozen in place, half-buried in rust. Once a defense line, they now serve only as grim reminders of forgotten wars.', 'STATION'),
	('Echo Hall Station', 'This wide, vaulted platform amplifies every sound. A whisper can travel the length of the chamber, making it impossible to tell if someone is truly nearby.', 'STATION'),
	('Shadow Depths Station', 'No light survives here. Even lantern flames seem smothered by the oppressive dark, forcing travelers to rely on touch and instinct alone to survive the passage.', 'STATION'),
	('Forgotten Crossing', 'Graffiti sprawls across every surface, telling stories of scavengers long gone. Broken rails vanish into shadow, scars of collapsed tunnels that no map can guide through.', 'STATION'),
	('Rustpoint Station', 'Flaking steel beams drip constant flakes of orange rust into pools of stagnant water. The air tastes metallic, and the sound of corrosion feels almost alive.', 'STATION'),
	('Old Town Station', 'Mosaics and murals still cling stubbornly to cracked tiles, depicting a world long gone. Dust and soot veil them like shrouds, leaving only faded colors behind.', 'STATION'),
	('Ashen Station', 'Thick layers of ash blanket the platform, stirred into choking clouds by footsteps. The air burns the throat, as though the fire that birthed it never truly ended.', 'STATION'),
	('Broken Tracks Station', 'Rails here are warped and twisted beyond repair, melted into serpentine shapes. The silence is punctuated only by the creak of metal cooling in unseen drafts.', 'STATION'),
	('Deep Core Station', 'The lowest point of the system. Claustrophobic passages squeeze inward, pressing down on lungs and hearts alike. Every breath feels heavier, every sound muted.', 'STATION'),
	('Steel Hollow', 'Rusted girders groan overhead, as though the cavern itself is alive. The hollow space seems to breathe, expanding and contracting with every shift of the earth.', 'STATION'),
	('Silent Platform', 'No train has arrived here in decades, yet the wind carries a phantom rush as if one lingers just beyond sight. The silence feels staged, like a trap waiting.', 'STATION'),
	('Lost Junction', 'Collapsed tunnels turn this junction into a labyrinth. Maps still promise open routes, but reality offers only rubble, dust, and dead ends.', 'STATION'),
	('Marrow Station', 'Bones litter the corners like decorations. Strange carvings etched into the walls hint at cults or scavengers who left more than just their shadows behind.', 'STATION'),
	('Ironspire Station', 'Tall support beams stab upward, blackened with soot. Their sheer size gives the illusion of a cathedral, built not for worship but survival under crushing weight.', 'STATION'),
	('Chasm Station', 'Half the floor has fallen into a yawning pit. Shouts and stones cast below return as warped echoes, voices that do not quite match the ones sent down.', 'STATION'),
	('Hollow Gate Station', 'An ancient gate stands half-open, its iron frame bent and corroded. Wind howls through the gap, turning every gust into a low moan like a grieving spirit.', 'STATION'),
	('Dustveil Station', 'The air here is thick with choking dust, stirred by unseen drafts. Each breath feels like swallowing grit, and every step leaves swirling veils behind.', 'STATION'),
	('Vein Station', 'Pipes and wires crawl along the walls like arteries. Some still pulse faintly with energy, leaking sparks and warmth as if the station itself is alive.', 'STATION'),
	('Blackwell Station', 'Pools of stagnant water stretch across the floor, reflecting broken lamps overhead. The reek of mold and decay saturates the air, clinging to the skin.', 'STATION'),
	('Stoneclad Station', 'Desperate survivors reinforced these walls with crude stonework, stacking rubble into makeshift fortifications against enemies that never came.', 'STATION'),
	('Frostbite Station', 'Cold drafts slice through the tunnels like knives. Frost clings stubbornly to the rails and walls, turning metal brittle and air painfully sharp.', 'STATION'),
	('Obsidian Station', 'The walls gleam like volcanic glass, unnaturally smooth and black. Torches barely cling to the surfaces, as though the rock resists illumination itself.', 'STATION'),
	('Cinder Station', 'Charred scorch marks climb the walls like scars. Shards of burnt metal crunch beneath boots, the smell of smoke lingering decades after the fire ended.', 'STATION'),
	('Gravewalk Station', 'The station feels like a mausoleum. Bones and forgotten belongings rest in corners, left where travelers once fell and were quietly forgotten.', 'STATION'),
	('Duskfall Station', 'Lanterns flicker along the walls but never stay lit. The faint glow stretches shadows until they seem alive, crawling across broken tiles.', 'STATION'),
	('Bloodline Station', 'Legends whisper of a massacre here. Gouged walls, shattered glass, and dried stains mark the site, too stubborn to fade with time.', 'STATION'),
	('Collapsed Junction', 'Ceiling cave-ins block half the passages, jagged stone and steel forming impassable barricades. The other half groans with instability.', 'STATION'),
	('Twilight Station', 'The whole platform lives in a perpetual twilight. Dim bulbs glow faintly, casting a sickly orange dusk that never shifts to dawn.', 'STATION'),
	('Ironveil Station', 'Clouds of hot steam pour endlessly from leaking pipes, cloaking the station in fog. Shapes vanish and reappear without warning in the haze.', 'STATION'),
	('Wraith Station', 'Shadows here move even when no one does. Figures flicker at the edge of sight, dissolving as soon as they are faced directly.', 'STATION'),
	('Crimson Station', 'The walls are permanently stained red. No one remembers how, and no amount of scrubbing has erased the marks. Whispers say the walls themselves bleed.', 'STATION'),
	
	-- Surface
	('Surface Outpost', 'A fragile cluster of tents and barricades built from scrap metal. Its defenders watch the horizon constantly, knowing survival depends on vigilance.', 'SURFACE'),
	('Burnt Ruins', 'The blackened skeletons of buildings rise like charred bones. The ground still radiates faint heat, as if the fire that claimed it never truly ended.', 'SURFACE'),
	('Shattered Plaza', 'Once a civic square, now a broken crater of cracked stone. Weeds claw through the fractures, reclaiming what concrete once denied.', 'SURFACE'),
	('Windswept Overpass', 'A highway bridge fractured in half, dangling above the city like broken ribs. Winds scream through the steel skeleton, making the structure groan.', 'SURFACE'),
	('Ashfield', 'An open plain coated in thick layers of ash. Every step raises clouds that cling to skin and lungs, as though the dead soil resists disturbance.', 'SURFACE'),
	('Collapsed Tower', 'Half a skyscraper still juts into the sky, leaning dangerously. Its exposed steel frame resembles bones, skeletal and defiant against collapse.', 'SURFACE'),
	('Rustyard', 'Crumbling vehicles and machines lie in heaps, their corroded skeletons long picked clean by scavengers. Every gust rattles metal like chimes.', 'SURFACE'),
	('The Crater', 'A gaping wound in the earth, its rim lined with glassy rock from unimaginable heat. The air carries a metallic tang that burns the lungs.', 'SURFACE'),
	('Bone Dunes', 'Sand dunes roll endlessly, but shifting winds reveal pale bones buried beneath. They resurface again and again like the desert refuses to forget.', 'SURFACE'),
	('Blasted Park', 'A public park reduced to twisted playgrounds and melted benches. The soil is black and cracked, trees reduced to brittle, skeletal stumps.', 'SURFACE'),
	('Frozen Overpass', 'A shattered roadway encased in ice. Jagged icicles dangle dangerously, and the surface is treacherous with slick black ice and fractured asphalt.', 'SURFACE'),
	('Silent Streets', 'Endless avenues stretch empty, buildings looming like silent watchers. Every footstep echoes too loudly, as though the city itself listens.', 'SURFACE'),
	('Glass Flats', 'The earth here is fused into sheets of jagged glass, glittering painfully under sunlight. Walking across it is slow, every step a danger.', 'SURFACE'),
	('Smokestack Ruins', 'Collapsed industrial towers still belch smoke, though their fires should have died decades ago. The air here burns with ash and soot.', 'SURFACE'),
	('The Watchpoint', 'A high ridge fortified with scavenged metal sheets. From here, the wasteland stretches endless in all directions, both beautiful and terrifying.', 'SURFACE');


	
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
	('You stumble upon a hidden stash of scrap.', 'STANDARD', 15, 2, 1, null, 1, 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1759875245/ghost_scream_1_scllb9.wav', '/media/stash.png'),
	('A strange anomaly blocks your path.', 'ANOMALY', 0, 0, 5, null, null, null, '/media/anomaly.png');
	
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