drop schema if exists eotm_test cascade;
create schema eotm_test;
set search_path to eotm_test;

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
	description varchar(200) not null,
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
	event_type varchar(50) not null check(event_type in ('ATTACK','ENCOUNTER','ARTIFACT','ANOMALY','STANDARD','LOCATION')),
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
	created_status varchar(50) not null check(created_status in ('FRESH', 'FADED', 'WEATHERED', 'WITHERED')),
	foreign key (storyline_id) references storylines(storyline_id) on delete cascade,
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


create or replace procedure set_known_good_state()
language plpgsql
as 
$$
begin
	set search_path to eotm_test;

	truncate table app_user_badge cascade;
    truncate table echoes restart identity cascade;
    truncate table journal restart identity cascade;
    truncate table events restart identity cascade;
    truncate table storylines restart identity cascade;
    truncate table badges restart identity cascade;
    truncate table locations restart identity cascade;
    truncate table app_user restart identity cascade;
    truncate table app_role restart identity cascade;

	insert into app_role (role_name) values
	('STALKER'),
	('ADMIN');

	-- Insert users
	insert into app_user (username, email, password_hash, app_role_id, mgr, scrap, fuel, disabled)
	values
	('shadowrunner', 'shadow@example.com', 'hash123', 1, 10, 5, 3, false),
	('metro_admin', 'admin@example.com', 'hash456', 2, 50, 25, 15, false),
	('wanderer', 'wanderer@example.com', 'hash789', 1, 5, 10, 2, false);
	
	-- Insert locations
	insert into locations (location_name, description, location_type)
	values
	('Red Line Station', 'An abandoned metro station filled with echoes of the past.', 'STATION'),
	('Surface Outpost', 'Makeshift camp on the ruined surface.', 'SURFACE');
	
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
	('You stumble upon a hidden stash of scrap.', 'STANDARD', 15, 0, 0, 1, null, '/sounds/stash.mp3', '/media/stash.png'),
	('A strange anomaly blocks your path.', 'ANOMALY', 0, 0, 5, null, 2, '/sounds/anomaly.mp3', '/media/anomaly.png');
	
	-- Insert journals
	insert into journal (title, text, storyline_id, app_user_id, location_id, whispers, created_at, created_status)
	values
	('First Encounter', 'I heard whispers in the tunnels today.', 1, 1, 1, 3, now(), 'FRESH'),
	('Surface Watch', 'The surface is harsher than I imagined.', 2, 3, 2, 0, now(), 'WEATHERED');
	
	-- Insert echoes
	insert into echoes (journal_id, app_user_id)
	values
	(1, 2), -- metro_admin echoed shadowrunner’s journal
	(2, 1); -- shadowrunner echoed wanderer’s journal
	
	-- Insert user badges
	insert into app_user_badge (app_user_id, badge_id, date_earned)
	values
	(1, 1, now()),
	(3, 2, now());

end
$$

-- call set_known_good_state();
-- select * from events;
