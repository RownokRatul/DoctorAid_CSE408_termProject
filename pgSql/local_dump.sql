--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-08-13 18:32:33 +06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3632 (class 1262 OID 16397)
-- Name: doctorAid; Type: DATABASE; Schema: -; Owner: postgres
--

-- CREATE DATABASE "doctorAid" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


-- ALTER DATABASE "doctorAid" OWNER TO postgres;

-- \connect "doctorAid"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 16407)
-- Name: doctoraid; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA doctoraid;


ALTER SCHEMA doctoraid OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16422)
-- Name: doctor_info; Type: TABLE; Schema: doctoraid; Owner: postgres
--

CREATE TABLE doctoraid.doctor_info (
    username character varying(20) NOT NULL,
    name character varying(50) NOT NULL,
    specialization character varying(100) NOT NULL,
    degree character varying(80) NOT NULL,
    phone character varying(20) NOT NULL,
    email character varying(30)
);


ALTER TABLE doctoraid.doctor_info OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16442)
-- Name: intern_info; Type: TABLE; Schema: doctoraid; Owner: postgres
--

CREATE TABLE doctoraid.intern_info (
    username character varying(20) NOT NULL,
    name character varying(50) NOT NULL,
    phone character varying(20) NOT NULL
);


ALTER TABLE doctoraid.intern_info OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16453)
-- Name: patient_basic_info; Type: TABLE; Schema: doctoraid; Owner: postgres
--

CREATE TABLE doctoraid.patient_basic_info (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    age integer NOT NULL,
    phone character varying(20) NOT NULL,
    address character varying(100) NOT NULL,
    occupation character varying(100) NOT NULL,
    nid character varying(20),
    dob date NOT NULL,
    gender character varying(1) NOT NULL
);


ALTER TABLE doctoraid.patient_basic_info OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16452)
-- Name: patient_basic_info_id_seq; Type: SEQUENCE; Schema: doctoraid; Owner: postgres
--

ALTER TABLE doctoraid.patient_basic_info ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME doctoraid.patient_basic_info_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16432)
-- Name: receptionist_info; Type: TABLE; Schema: doctoraid; Owner: postgres
--

CREATE TABLE doctoraid.receptionist_info (
    username character varying(20) NOT NULL,
    name character varying(50) NOT NULL,
    phone character varying(20) NOT NULL
);


ALTER TABLE doctoraid.receptionist_info OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16409)
-- Name: testtable; Type: TABLE; Schema: doctoraid; Owner: postgres
--

CREATE TABLE doctoraid.testtable (
    id integer NOT NULL,
    name character varying(20) DEFAULT 'Unknown'::character varying
);


ALTER TABLE doctoraid.testtable OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16408)
-- Name: testtable_id_seq; Type: SEQUENCE; Schema: doctoraid; Owner: postgres
--

CREATE SEQUENCE doctoraid.testtable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE doctoraid.testtable_id_seq OWNER TO postgres;

--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 214
-- Name: testtable_id_seq; Type: SEQUENCE OWNED BY; Schema: doctoraid; Owner: postgres
--

ALTER SEQUENCE doctoraid.testtable_id_seq OWNED BY doctoraid.testtable.id;


--
-- TOC entry 216 (class 1259 OID 16416)
-- Name: user_login_info; Type: TABLE; Schema: doctoraid; Owner: postgres
--

CREATE TABLE doctoraid.user_login_info (
    username character varying(20) NOT NULL,
    hash_password character varying(50) NOT NULL,
    user_role character varying(20)
);


ALTER TABLE doctoraid.user_login_info OWNER TO postgres;

--
-- TOC entry 3460 (class 2604 OID 16412)
-- Name: testtable id; Type: DEFAULT; Schema: doctoraid; Owner: postgres
--

ALTER TABLE ONLY doctoraid.testtable ALTER COLUMN id SET DEFAULT nextval('doctoraid.testtable_id_seq'::regclass);


--
-- TOC entry 3622 (class 0 OID 16422)
-- Dependencies: 217
-- Data for Name: doctor_info; Type: TABLE DATA; Schema: doctoraid; Owner: postgres
--

INSERT INTO doctoraid.doctor_info (username, name, specialization, degree, phone, email) VALUES ('doc_oc', 'Doctor Octopus', 'General Medicine', 'MD', '1234567890', 'dococ@example.com');


--
-- TOC entry 3624 (class 0 OID 16442)
-- Dependencies: 219
-- Data for Name: intern_info; Type: TABLE DATA; Schema: doctoraid; Owner: postgres
--

INSERT INTO doctoraid.intern_info (username, name, phone) VALUES ('intern', 'Miss X', '1234523432');


--
-- TOC entry 3626 (class 0 OID 16453)
-- Dependencies: 221
-- Data for Name: patient_basic_info; Type: TABLE DATA; Schema: doctoraid; Owner: postgres
--

INSERT INTO doctoraid.patient_basic_info (id, name, age, phone, address, occupation, nid, dob, gender) OVERRIDING SYSTEM VALUE VALUES (1, 'John Doe', 30, '1234567890', '123 Main Street', 'Engineer', 'ABCD1234', '1993-05-15', 'M');
INSERT INTO doctoraid.patient_basic_info (id, name, age, phone, address, occupation, nid, dob, gender) OVERRIDING SYSTEM VALUE VALUES (2, 'Jane Smith', 25, '9876543210', '456 Park Avenue', 'Teacher', 'EFGH5678', '1996-09-20', 'F');
INSERT INTO doctoraid.patient_basic_info (id, name, age, phone, address, occupation, nid, dob, gender) OVERRIDING SYSTEM VALUE VALUES (3, 'Michael Johnson', 40, '5678901234', '789 Elm Road', 'Doctor', 'IJKL9012', '1981-03-10', 'M');
INSERT INTO doctoraid.patient_basic_info (id, name, age, phone, address, occupation, nid, dob, gender) OVERRIDING SYSTEM VALUE VALUES (4, 'Emily Williams', 28, '6543210987', '321 Oak Lane', 'Designer', NULL, '1995-11-28', 'F');
INSERT INTO doctoraid.patient_basic_info (id, name, age, phone, address, occupation, nid, dob, gender) OVERRIDING SYSTEM VALUE VALUES (5, 'David Brown', 35, '2345678901', '567 Pine Street', 'Accountant', 'MNOP3456', '1988-07-12', 'M');
INSERT INTO doctoraid.patient_basic_info (id, name, age, phone, address, occupation, nid, dob, gender) OVERRIDING SYSTEM VALUE VALUES (6, 'tanjeem', 24, '010101', 'BR', 'Student', '1234', '1993-05-15', 'F');
INSERT INTO doctoraid.patient_basic_info (id, name, age, phone, address, occupation, nid, dob, gender) OVERRIDING SYSTEM VALUE VALUES (7, 'toki', 25, '0120201', 'shantinagar', 'Student', '1234444', '1993-05-15', 'M');


--
-- TOC entry 3623 (class 0 OID 16432)
-- Dependencies: 218
-- Data for Name: receptionist_info; Type: TABLE DATA; Schema: doctoraid; Owner: postgres
--

INSERT INTO doctoraid.receptionist_info (username, name, phone) VALUES ('recep', 'Miss X', '0202010101');


--
-- TOC entry 3620 (class 0 OID 16409)
-- Dependencies: 215
-- Data for Name: testtable; Type: TABLE DATA; Schema: doctoraid; Owner: postgres
--

INSERT INTO doctoraid.testtable (id, name) VALUES (2, 'RATUL');
INSERT INTO doctoraid.testtable (id, name) VALUES (1, 'TOKI');


--
-- TOC entry 3621 (class 0 OID 16416)
-- Dependencies: 216
-- Data for Name: user_login_info; Type: TABLE DATA; Schema: doctoraid; Owner: postgres
--

INSERT INTO doctoraid.user_login_info (username, hash_password, user_role) VALUES ('BOB', '123', 'doctor');
INSERT INTO doctoraid.user_login_info (username, hash_password, user_role) VALUES ('doc_oc', 'MTIz', 'DOCTOR');
INSERT INTO doctoraid.user_login_info (username, hash_password, user_role) VALUES ('recep', 'MTIz', 'RECEPTIONIST');
INSERT INTO doctoraid.user_login_info (username, hash_password, user_role) VALUES ('intern', 'MTIz', 'INTERN');


--
-- TOC entry 3641 (class 0 OID 0)
-- Dependencies: 220
-- Name: patient_basic_info_id_seq; Type: SEQUENCE SET; Schema: doctoraid; Owner: postgres
--

SELECT pg_catalog.setval('doctoraid.patient_basic_info_id_seq', 7, true);


--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 214
-- Name: testtable_id_seq; Type: SEQUENCE SET; Schema: doctoraid; Owner: postgres
--

SELECT pg_catalog.setval('doctoraid.testtable_id_seq', 1, false);


--
-- TOC entry 3467 (class 2606 OID 16426)
-- Name: doctor_info doctor_info_pkey; Type: CONSTRAINT; Schema: doctoraid; Owner: postgres
--

ALTER TABLE ONLY doctoraid.doctor_info
    ADD CONSTRAINT doctor_info_pkey PRIMARY KEY (username);


--
-- TOC entry 3471 (class 2606 OID 16446)
-- Name: intern_info intern_info_pkey; Type: CONSTRAINT; Schema: doctoraid; Owner: postgres
--

ALTER TABLE ONLY doctoraid.intern_info
    ADD CONSTRAINT intern_info_pkey PRIMARY KEY (username);


--
-- TOC entry 3473 (class 2606 OID 16457)
-- Name: patient_basic_info patient_basic_info_pkey; Type: CONSTRAINT; Schema: doctoraid; Owner: postgres
--

ALTER TABLE ONLY doctoraid.patient_basic_info
    ADD CONSTRAINT patient_basic_info_pkey PRIMARY KEY (id);


--
-- TOC entry 3469 (class 2606 OID 16436)
-- Name: receptionist_info receptionist_info_pkey; Type: CONSTRAINT; Schema: doctoraid; Owner: postgres
--

ALTER TABLE ONLY doctoraid.receptionist_info
    ADD CONSTRAINT receptionist_info_pkey PRIMARY KEY (username);


--
-- TOC entry 3463 (class 2606 OID 16415)
-- Name: testtable testtable_pkey; Type: CONSTRAINT; Schema: doctoraid; Owner: postgres
--

ALTER TABLE ONLY doctoraid.testtable
    ADD CONSTRAINT testtable_pkey PRIMARY KEY (id);


--
-- TOC entry 3465 (class 2606 OID 16420)
-- Name: user_login_info user_info_pkey; Type: CONSTRAINT; Schema: doctoraid; Owner: postgres
--

ALTER TABLE ONLY doctoraid.user_login_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (username);


--
-- TOC entry 3474 (class 2606 OID 16427)
-- Name: doctor_info fk_doctor_info_user_login_info; Type: FK CONSTRAINT; Schema: doctoraid; Owner: postgres
--

ALTER TABLE ONLY doctoraid.doctor_info
    ADD CONSTRAINT fk_doctor_info_user_login_info FOREIGN KEY (username) REFERENCES doctoraid.user_login_info(username) ON DELETE CASCADE;


--
-- TOC entry 3476 (class 2606 OID 16447)
-- Name: intern_info fk_intern_info_user_login_info; Type: FK CONSTRAINT; Schema: doctoraid; Owner: postgres
--

ALTER TABLE ONLY doctoraid.intern_info
    ADD CONSTRAINT fk_intern_info_user_login_info FOREIGN KEY (username) REFERENCES doctoraid.user_login_info(username) ON DELETE CASCADE;


--
-- TOC entry 3475 (class 2606 OID 16437)
-- Name: receptionist_info fk_receptionist_info_user_login_info; Type: FK CONSTRAINT; Schema: doctoraid; Owner: postgres
--

ALTER TABLE ONLY doctoraid.receptionist_info
    ADD CONSTRAINT fk_receptionist_info_user_login_info FOREIGN KEY (username) REFERENCES doctoraid.user_login_info(username) ON DELETE CASCADE;


--
-- TOC entry 3633 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA doctoraid; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA doctoraid TO doctoraiduser;


--
-- TOC entry 3634 (class 0 OID 0)
-- Dependencies: 217
-- Name: TABLE doctor_info; Type: ACL; Schema: doctoraid; Owner: postgres
--

GRANT ALL ON TABLE doctoraid.doctor_info TO doctoraiduser;


--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 219
-- Name: TABLE intern_info; Type: ACL; Schema: doctoraid; Owner: postgres
--

GRANT ALL ON TABLE doctoraid.intern_info TO doctoraiduser;


--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 221
-- Name: TABLE patient_basic_info; Type: ACL; Schema: doctoraid; Owner: postgres
--

GRANT ALL ON TABLE doctoraid.patient_basic_info TO doctoraiduser;


--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE receptionist_info; Type: ACL; Schema: doctoraid; Owner: postgres
--

GRANT ALL ON TABLE doctoraid.receptionist_info TO doctoraiduser;


--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 215
-- Name: TABLE testtable; Type: ACL; Schema: doctoraid; Owner: postgres
--

GRANT ALL ON TABLE doctoraid.testtable TO doctoraiduser;


--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 216
-- Name: TABLE user_login_info; Type: ACL; Schema: doctoraid; Owner: postgres
--

GRANT ALL ON TABLE doctoraid.user_login_info TO doctoraiduser;


-- Completed on 2023-08-13 18:32:34 +06

--
-- PostgreSQL database dump complete
--

