CREATE TYPE rooming_list_status AS ENUM (
  'Active',
  'Closed',
  'Cancelled'
);

CREATE TYPE agreement_type AS ENUM (
  'leisure',
  'staff',
  'artist'
);

CREATE TABLE bookings (
  booking_id            SERIAL PRIMARY KEY,
  hotel_id              INTEGER NOT NULL,
  event_id              INTEGER NOT NULL,
  guest_name            VARCHAR(255) NOT NULL,
  guest_phone_number    VARCHAR(50),
  check_in_date         DATE    NOT NULL,
  check_out_date        DATE    NOT NULL
);

CREATE TABLE rooming_lists (
  rooming_list_id   SERIAL PRIMARY KEY,
  event_id          INTEGER NOT NULL,
  hotel_id          INTEGER NOT NULL,
  rfp_name          VARCHAR(255)         NOT NULL,
  cut_off_date      DATE                 NOT NULL,
  status            rooming_list_status  NOT NULL DEFAULT 'Active',
  agreement_type    agreement_type       NOT NULL
);

CREATE TABLE rooming_list_bookings (
  rooming_list_id  INTEGER NOT NULL
    REFERENCES rooming_lists(rooming_list_id)
      ON DELETE CASCADE,
  booking_id       INTEGER NOT NULL
    REFERENCES bookings(booking_id)
      ON DELETE CASCADE,
  PRIMARY KEY (rooming_list_id, booking_id)
);