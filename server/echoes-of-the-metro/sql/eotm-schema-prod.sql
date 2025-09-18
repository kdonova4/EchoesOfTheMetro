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
	storyline_title varchar(50) not null unique
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