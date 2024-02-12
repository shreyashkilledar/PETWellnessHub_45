drop database petShop;

CREATE DATABASE petShop;

USE petShop;

CREATE TABLE
    User(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name varchar(100),
        last_name varchar(100),
        email varchar(255),
        password varchar(255),
        phone_No varchar(255)
    );
CREATE TABLE 
      Pet_Owner(
         id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
         user_id  INT ,
         CONSTRAINT fk_userid FOREIGN KEY (user_id) REFERENCES User(id) ON UPDATE CASCADE ON DELETE CASCADE
            
      );

CREATE TABLE
         products(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title varchar(255),
        description VARCHAR(2000),
        image varchar(255)
    );

CREATE TABLE 
    Pets(
         id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
         name varchar(255),
        owner_id int,
        CONSTRAINT fk_ownerid FOREIGN KEY (owner_id)REFERENCES Pet_Owner(id),
        image varchar(255),
        type varchar(100),
        breed varchar(100)
    );

    