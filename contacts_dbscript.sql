create table users (userId serial primary key);
create table contacts (
    contactId serial primary key, 
    userId int not null,
    name varchar (50) not null,
    lastName varchar (50) not null,
    company varchar (50),
    phone varchar (50) unique,
    email varchar (300) unique not null
);