create database burgers_db;

use burgers_db;

create table burgers(
	id int auto_increment,
    burger_name varchar(255) not null,
    devoured boolean not null default 0,
    date timestamp,
    primary key(id)
);