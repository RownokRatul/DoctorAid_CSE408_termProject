-- CREATE SCHEMA doctoraid;

-- CREATE TABLE doctoraid.testTable (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(20) DEFAULT 'Unknown'
-- );

INSERT INTO doctoraid.testTable VALUES ('2', 'RATUL');
INSERT INTO doctoraid.testTable VALUES ('1', 'TOKI');

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA doctoraid TO your_user;
