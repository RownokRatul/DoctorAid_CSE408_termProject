-- CREATE TABLE DOCTORAID.user_login_info  (
-- 	USERNAME VARCHAR(20) PRIMARY KEY,
-- 	HASH_PASSWORD VARCHAR(50) NOT NULL,
-- 	ROLE_ VARCHAR(20) NOT NULL
-- );

-- CREATE TABLE DOCTORAID.DOCTOR_INFO (
-- 	username VARCHAR(20) PRIMARY KEY,
-- 	name VARCHAR(50) NOT NULL,
-- 	specialization VARCHAR(100) NOT NULL,
-- 	degree VARCHAR(80) NOT NULL,
-- 	phone VARCHAR(20) NOT NULL,
-- 	email VARCHAR(30), 

-- 	CONSTRAINT fk_doctor_info_user_login_info
--     FOREIGN KEY (username) 
--     REFERENCES DOCTORAID.user_login_info (username)
--     ON DELETE CASCADE
-- );

-- CREATE TABLE DOCTORAID.RECEPTIONIST_INFO (
-- 	username VARCHAR(20) PRIMARY KEY,
-- 	name VARCHAR(50) NOT NULL,
-- 	phone VARCHAR(20) NOT NULL, 
	
-- 	CONSTRAINT fk_receptionist_info_user_login_info
-- 	FOREIGN KEY (username)
-- 	REFERENCES DOCTORAID.user_login_info (username)
-- 	ON DELETE CASCADE
-- );

-- CREATE TABLE DOCTORAID.INTERN_INFO (
-- 	username VARCHAR(20) PRIMARY KEY,
-- 	name VARCHAR(50) NOT NULL,
-- 	phone VARCHAR(20) NOT NULL, 

-- 	CONSTRAINT fk_intern_info_user_login_info
-- 	FOREIGN KEY (username)
-- 	REFERENCES DOCTORAID.user_login_info (username)
-- 	ON DELETE CASCADE
-- );

-- INSERT INTO doctoraid.user_login_info VALUES ('doc_oc', 'MTIz', 'DOCTOR');
-- INSERT INTO doctoraid.user_login_info VALUES ('recep', 'MTIz', 'RECEPTIONIST');
-- INSERT INTO doctoraid.user_login_info VALUES ('intern', 'MTIz', 'INTERN');

-- CREATE TABLE DOCTORAID.PATIENT_BASIC_INFO (
-- 	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- 	name VARCHAR(50) NOT NULL,
-- 	age INTEGER NOT NULL,
-- 	phone VARCHAR(20) NOT NULL,
-- 	address VARCHAR(100) NOT NULL,
-- 	occupation VARCHAR(100) NOT NULL,
-- 	NID VARCHAR(20),
-- 	DoB DATE NOT NULL,
-- 	gender VARCHAR(1) NOT NULL );
	
--     INSERT INTO DOCTORAID.PATIENT_BASIC_INFO (name, age, phone, address, occupation, NID, DoB, gender)
-- VALUES
--   ('John Doe', 30, '1234567890', '123 Main Street', 'Engineer', 'ABCD1234', '1993-05-15', 'M'),
--   ('Jane Smith', 25, '9876543210', '456 Park Avenue', 'Teacher', 'EFGH5678', '1996-09-20', 'F'),
--   ('Michael Johnson', 40, '5678901234', '789 Elm Road', 'Doctor', 'IJKL9012', '1981-03-10', 'M'),
--   ('Emily Williams', 28, '6543210987', '321 Oak Lane', 'Designer', NULL, '1995-11-28', 'F'),
--   ('David Brown', 35, '2345678901', '567 Pine Street', 'Accountant', 'MNOP3456', '1988-07-12', 'M');

INSERT INTO DOCTORAID.DOCTOR_INFO (username, name, specialization, degree, phone, email)
VALUES ('dummyuser1', 'John Doe', 'General Medicine', 'MD', '1234567890', 'john.doe@example.com'),
       ('dummyuser2', 'Jane Smith', 'Pediatrics', 'MBBS', '9876543210', 'jane.smith@example.com');

INSERT INTO DOCTORAID.RECEPTIONIST_INFO (username, name, phone)
VALUES ('recep', 'Miss X', '0202010101');

INSERT INTO DOCTORAID.INTERN_INFO (username, name, phone)
VALUES ('intern', 'Miss X', '1234523432');