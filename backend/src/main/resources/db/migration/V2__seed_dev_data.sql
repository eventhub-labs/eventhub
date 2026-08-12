-- Password for every seeded user:
--   Password123!


INSERT INTO users (id, email, username, name, surname, user_img, phone, password, role)
VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'alice@eventhub.dev',
    'alice',
    'Alice',
    'Martin',
    NULL,
    '+33600000001',
    crypt('Password123!', gen_salt('bf', 10)),
    'ADMIN'
),
(
    '22222222-2222-2222-2222-222222222222',
    'bob@eventhub.dev',
    'bob',
    'Bob',
    'Durand',
    NULL,
    '+33600000002',
    crypt('Password123!', gen_salt('bf', 10)),
    'USER'
),
(
    '33333333-3333-3333-3333-333333333333',
    'clara@eventhub.dev',
    'clara',
    'Clara',
    'Bernard',
    NULL,
    NULL,
    crypt('Password123!', gen_salt('bf', 10)),
    'USER'
),
(
    '44444444-4444-4444-4444-444444444444',
    'max@eventhub.dev',
    'max',
    'Max',
    'Robert',
    NULL,
    NULL,
    crypt('Password123!', gen_salt('bf', 10)),
    'MODERATOR'
);

INSERT INTO events (
    id,
    creator_user_id,
    name,
    description,
    is_date_approved,
    date
)
VALUES
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    'EventHub Team Meetup',
    'First team meetup for the EventHub project.',
    TRUE,
    '2026-09-05 18:30:00+02'
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '22222222-2222-2222-2222-222222222222',
    'Weekend in Lyon',
    'Choose every date that works for you.',
    FALSE,
    NULL
),
(
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '44444444-4444-4444-4444-444444444444',
    'Board Games Evening',
    'Board games, pizza and drinks.',
    TRUE,
    '2026-09-18 19:00:00+02'
);

INSERT INTO user_events (user_id, event_id, status)
VALUES
('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ACCEPTED'),
('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ACCEPTED'),
('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'INVITED'),

('22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ACCEPTED'),
('33333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ACCEPTED'),
('44444444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'DECLINED'),

('44444444-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'INVITED');

INSERT INTO comments (id, user_id, event_id, created_at, text)
VALUES
(
    'd1111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '2026-08-12 18:20:00+02',
    'I will be there!'
),
(
    'd2222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '2026-08-12 19:10:00+02',
    'Saturday works best for me.'
),
(
    'd3333333-3333-3333-3333-333333333333',
    '33333333-3333-3333-3333-333333333333',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '2026-08-12 19:35:00+02',
    'I selected both dates I can attend.'
);

INSERT INTO tasks (id, name, description, status, event_id)
VALUES
(
    'e1111111-1111-1111-1111-111111111111',
    'Book a table',
    'Reserve a table for the team meetup.',
    'DONE',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
),
(
    'e2222222-2222-2222-2222-222222222222',
    'Choose restaurant',
    'Find a place near the city centre.',
    'IN_PROGRESS',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
),
(
    'e3333333-3333-3333-3333-333333333333',
    'Prepare transport',
    NULL,
    'PLANNED',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
);

INSERT INTO votings (event_id, vote_ended, end_date, description)
VALUES
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    FALSE,
    '2026-08-25 20:00:00+02',
    'Select every date when you are available.'
);

INSERT INTO date_variants (id, event_id, date)
VALUES
(
    'f1111111-1111-1111-1111-111111111111',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '2026-09-12 10:00:00+02'
),
(
    'f2222222-2222-2222-2222-222222222222',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '2026-09-13 10:00:00+02'
),
(
    'f3333333-3333-3333-3333-333333333333',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '2026-09-19 10:00:00+02'
);

INSERT INTO user_date_votes (user_id, date_variant_id)
VALUES
('11111111-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111'),
('11111111-1111-1111-1111-111111111111', 'f2222222-2222-2222-2222-222222222222'),
('22222222-2222-2222-2222-222222222222', 'f1111111-1111-1111-1111-111111111111'),
('33333333-3333-3333-3333-333333333333', 'f2222222-2222-2222-2222-222222222222'),
('33333333-3333-3333-3333-333333333333', 'f3333333-3333-3333-3333-333333333333');


-- =========================================================
-- USERS
-- =========================================================

INSERT INTO users (id, email, username, name, surname, user_img, phone, password, role)
VALUES
(
    '55555555-5555-5555-5555-555555555555',
    'emma@eventhub.dev',
    'emma',
    'Emma',
    'Petit',
    NULL,
    '+33600000005',
    crypt('Password123!', gen_salt('bf', 10)),
    'USER'
),
(
    '66666666-6666-6666-6666-666666666666',
    'lucas@eventhub.dev',
    'lucas',
    'Lucas',
    'Moreau',
    NULL,
    '+33600000006',
    crypt('Password123!', gen_salt('bf', 10)),
    'USER'
),
(
    '77777777-7777-7777-7777-777777777777',
    'lea@eventhub.dev',
    'lea',
    'Léa',
    'Simon',
    NULL,
    '+33600000007',
    crypt('Password123!', gen_salt('bf', 10)),
    'USER'
),
(
    '88888888-8888-8888-8888-888888888888',
    'hugo@eventhub.dev',
    'hugo',
    'Hugo',
    'Laurent',
    NULL,
    NULL,
    crypt('Password123!', gen_salt('bf', 10)),
    'USER'
),
(
    '99999999-9999-9999-9999-999999999999',
    'chloe@eventhub.dev',
    'chloe',
    'Chloé',
    'Lefevre',
    NULL,
    '+33600000009',
    crypt('Password123!', gen_salt('bf', 10)),
    'MODERATOR'
),
(
    '12121212-1212-1212-1212-121212121212',
    'nathan@eventhub.dev',
    'nathan',
    'Nathan',
    'Roux',
    NULL,
    NULL,
    crypt('Password123!', gen_salt('bf', 10)),
    'USER'
),
(
    '13131313-1313-1313-1313-131313131313',
    'camille@eventhub.dev',
    'camille',
    'Camille',
    'Fournier',
    NULL,
    '+33600000011',
    crypt('Password123!', gen_salt('bf', 10)),
    'USER'
),
(
    '14141414-1414-1414-1414-141414141414',
    'theo@eventhub.dev',
    'theo',
    'Théo',
    'Girard',
    NULL,
    '+33600000012',
    crypt('Password123!', gen_salt('bf', 10)),
    'USER'
);

-- =========================================================
-- EVENTS
-- =========================================================

INSERT INTO events (
    id,
    creator_user_id,
    name,
    description,
    is_date_approved,
    date
)
VALUES
(
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    '55555555-5555-5555-5555-555555555555',
    'Birthday Dinner',
    'Dinner with friends in Lyon.',
    TRUE,
    '2026-09-10 20:00:00+02'
),
(
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    '66666666-6666-6666-6666-666666666666',
    'Hackathon Weekend',
    'A weekend hackathon for small project teams.',
    FALSE,
    NULL
),
(
    'abababab-abab-abab-abab-abababababab',
    '77777777-7777-7777-7777-777777777777',
    'Hiking Trip',
    'One-day hiking trip outside Lyon.',
    FALSE,
    NULL
),
(
    'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd',
    '99999999-9999-9999-9999-999999999999',
    'Community Meetup',
    'Monthly EventHub community meetup.',
    TRUE,
    '2026-09-22 18:45:00+02'
),
(
    'efefefef-efef-efef-efef-efefefefefef',
    '12121212-1212-1212-1212-121212121212',
    'Cinema Night',
    'Choose a movie and meet before the session.',
    TRUE,
    '2026-09-26 19:30:00+02'
),
(
    'acacacac-acac-acac-acac-acacacacacac',
    '13131313-1313-1313-1313-131313131313',
    'Study Group',
    'Study session before the final exam.',
    FALSE,
    NULL
);

-- =========================================================
-- EVENT MEMBERSHIP / INVITATIONS
-- =========================================================

INSERT INTO user_events (user_id, event_id, status)
VALUES
-- Birthday Dinner
('55555555-5555-5555-5555-555555555555', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'ACCEPTED'),
('33333333-3333-3333-3333-333333333333', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'ACCEPTED'),
('66666666-6666-6666-6666-666666666666', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'INVITED'),
('77777777-7777-7777-7777-777777777777', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'DECLINED'),

-- Hackathon Weekend
('66666666-6666-6666-6666-666666666666', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ACCEPTED'),
('22222222-2222-2222-2222-222222222222', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ACCEPTED'),
('55555555-5555-5555-5555-555555555555', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ACCEPTED'),
('88888888-8888-8888-8888-888888888888', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ACCEPTED'),
('12121212-1212-1212-1212-121212121212', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'INVITED'),
('14141414-1414-1414-1414-141414141414', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ACCEPTED'),

-- Hiking Trip
('77777777-7777-7777-7777-777777777777', 'abababab-abab-abab-abab-abababababab', 'ACCEPTED'),
('33333333-3333-3333-3333-333333333333', 'abababab-abab-abab-abab-abababababab', 'ACCEPTED'),
('55555555-5555-5555-5555-555555555555', 'abababab-abab-abab-abab-abababababab', 'ACCEPTED'),
('99999999-9999-9999-9999-999999999999', 'abababab-abab-abab-abab-abababababab', 'INVITED'),
('13131313-1313-1313-1313-131313131313', 'abababab-abab-abab-abab-abababababab', 'ACCEPTED'),

-- Community Meetup
('99999999-9999-9999-9999-999999999999', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', 'ACCEPTED'),
('22222222-2222-2222-2222-222222222222', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', 'ACCEPTED'),
('55555555-5555-5555-5555-555555555555', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', 'ACCEPTED'),
('66666666-6666-6666-6666-666666666666', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', 'INVITED'),
('77777777-7777-7777-7777-777777777777', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', 'ACCEPTED'),
('88888888-8888-8888-8888-888888888888', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', 'ACCEPTED'),

-- Cinema Night
('12121212-1212-1212-1212-121212121212', 'efefefef-efef-efef-efef-efefefefefef', 'ACCEPTED'),
('13131313-1313-1313-1313-131313131313', 'efefefef-efef-efef-efef-efefefefefef', 'ACCEPTED'),
('14141414-1414-1414-1414-141414141414', 'efefefef-efef-efef-efef-efefefefefef', 'INVITED'),
('44444444-4444-4444-4444-444444444444', 'efefefef-efef-efef-efef-efefefefefef', 'ACCEPTED'),

-- Study Group
('13131313-1313-1313-1313-131313131313', 'acacacac-acac-acac-acac-acacacacacac', 'ACCEPTED'),
('33333333-3333-3333-3333-333333333333', 'acacacac-acac-acac-acac-acacacacacac', 'ACCEPTED'),
('77777777-7777-7777-7777-777777777777', 'acacacac-acac-acac-acac-acacacacacac', 'ACCEPTED'),
('88888888-8888-8888-8888-888888888888', 'acacacac-acac-acac-acac-acacacacacac', 'INVITED'),
('14141414-1414-1414-1414-141414141414', 'acacacac-acac-acac-acac-acacacacacac', 'ACCEPTED');

-- =========================================================
-- COMMENTS
-- =========================================================

INSERT INTO comments (id, user_id, event_id, created_at, text)
VALUES
('c1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '2026-08-13 09:10:00+02', 'Looks good to me.'),
('c1000000-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '2026-08-13 09:30:00+02', 'Can I bring one more person?'),
('c1000000-0000-0000-0000-000000000003', '55555555-5555-5555-5555-555555555555', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '2026-08-13 09:45:00+02', 'Yes, I will update the reservation.'),

('c1000000-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '2026-08-13 10:05:00+02', 'I can work on the backend.'),
('c1000000-0000-0000-0000-000000000005', '88888888-8888-8888-8888-888888888888', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '2026-08-13 10:15:00+02', 'I prefer Saturday.'),
('c1000000-0000-0000-0000-000000000006', '14141414-1414-1414-1414-141414141414', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '2026-08-13 10:22:00+02', 'I can bring my laptop and a spare monitor.'),

('c1000000-0000-0000-0000-000000000007', '33333333-3333-3333-3333-333333333333', 'abababab-abab-abab-abab-abababababab', '2026-08-13 11:00:00+02', 'The first route seems easier.'),
('c1000000-0000-0000-0000-000000000008', '55555555-5555-5555-5555-555555555555', 'abababab-abab-abab-abab-abababababab', '2026-08-13 11:20:00+02', 'I can drive three people.'),
('c1000000-0000-0000-0000-000000000009', '77777777-7777-7777-7777-777777777777', 'abababab-abab-abab-abab-abababababab', '2026-08-13 11:35:00+02', 'Perfect, thanks!'),

('c1000000-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', '2026-08-13 12:00:00+02', 'Do we need to prepare anything?'),
('c1000000-0000-0000-0000-000000000011', '99999999-9999-9999-9999-999999999999', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', '2026-08-13 12:10:00+02', 'No, just bring your badge.'),
('c1000000-0000-0000-0000-000000000012', '77777777-7777-7777-7777-777777777777', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd', '2026-08-13 12:18:00+02', 'I will arrive around 18:30.'),

('c1000000-0000-0000-0000-000000000013', '13131313-1313-1313-1313-131313131313', 'efefefef-efef-efef-efef-efefefefefef', '2026-08-13 13:00:00+02', 'I vote for the comedy.'),
('c1000000-0000-0000-0000-000000000014', '44444444-4444-4444-4444-444444444444', 'efefefef-efef-efef-efef-efefefefefef', '2026-08-13 13:11:00+02', 'Anything except horror.'),

('c1000000-0000-0000-0000-000000000015', '33333333-3333-3333-3333-333333333333', 'acacacac-acac-acac-acac-acacacacacac', '2026-08-13 14:00:00+02', 'Thursday evening works for me.'),
('c1000000-0000-0000-0000-000000000016', '77777777-7777-7777-7777-777777777777', 'acacacac-acac-acac-acac-acacacacacac', '2026-08-13 14:14:00+02', 'Same here.'),
('c1000000-0000-0000-0000-000000000017', '14141414-1414-1414-1414-141414141414', 'acacacac-acac-acac-acac-acacacacacac', '2026-08-13 14:25:00+02', 'I added my available dates.');

-- =========================================================
-- TASKS
-- =========================================================

INSERT INTO tasks (id, name, description, status, event_id)
VALUES
('b1000000-0000-0000-0000-000000000001', 'Reserve restaurant', 'Confirm reservation for eight people.', 'DONE', 'dddddddd-dddd-dddd-dddd-dddddddddddd'),
('b1000000-0000-0000-0000-000000000002', 'Buy cake', 'Pick up the birthday cake before dinner.', 'IN_PROGRESS', 'dddddddd-dddd-dddd-dddd-dddddddddddd'),
('b1000000-0000-0000-0000-000000000003', 'Send final reminder', NULL, 'PLANNED', 'dddddddd-dddd-dddd-dddd-dddddddddddd'),

('b1000000-0000-0000-0000-000000000004', 'Create teams', 'Split participants into teams of two or three.', 'PLANNED', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),
('b1000000-0000-0000-0000-000000000005', 'Prepare repository', 'Create Git repository and starter README.', 'IN_PROGRESS', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),
('b1000000-0000-0000-0000-000000000006', 'Order pizza', NULL, 'PLANNED', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),
('b1000000-0000-0000-0000-000000000007', 'Prepare demo', 'Prepare five-minute final presentation.', 'PLANNED', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),

('b1000000-0000-0000-0000-000000000008', 'Choose hiking route', 'Compare two routes and pick one.', 'IN_PROGRESS', 'abababab-abab-abab-abab-abababababab'),
('b1000000-0000-0000-0000-000000000009', 'Check weather', NULL, 'PLANNED', 'abababab-abab-abab-abab-abababababab'),
('b1000000-0000-0000-0000-000000000010', 'Organize cars', 'Confirm available seats in each car.', 'PLANNED', 'abababab-abab-abab-abab-abababababab'),
('b1000000-0000-0000-0000-000000000011', 'Prepare snacks', NULL, 'PLANNED', 'abababab-abab-abab-abab-abababababab'),

('b1000000-0000-0000-0000-000000000012', 'Book meeting room', NULL, 'DONE', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd'),
('b1000000-0000-0000-0000-000000000013', 'Prepare presentation', 'Prepare community update slides.', 'IN_PROGRESS', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd'),
('b1000000-0000-0000-0000-000000000014', 'Print badges', NULL, 'PLANNED', 'cdcdcdcd-cdcd-cdcd-cdcd-cdcdcdcdcdcd'),

('b1000000-0000-0000-0000-000000000015', 'Choose movie', NULL, 'DONE', 'efefefef-efef-efef-efef-efefefefefef'),
('b1000000-0000-0000-0000-000000000016', 'Buy tickets', 'Buy tickets online before Friday.', 'IN_PROGRESS', 'efefefef-efef-efef-efef-efefefefefef'),
('b1000000-0000-0000-0000-000000000017', 'Choose meeting point', NULL, 'PLANNED', 'efefefef-efef-efef-efef-efefefefefef'),

('b1000000-0000-0000-0000-000000000018', 'Prepare exercises', 'Pick exercises for the study session.', 'IN_PROGRESS', 'acacacac-acac-acac-acac-acacacacacac'),
('b1000000-0000-0000-0000-000000000019', 'Reserve library room', NULL, 'PLANNED', 'acacacac-acac-acac-acac-acacacacacac'),
('b1000000-0000-0000-0000-000000000020', 'Share notes', 'Upload notes before the meeting.', 'PLANNED', 'acacacac-acac-acac-acac-acacacacacac');

-- =========================================================
-- VOTINGS
-- =========================================================

INSERT INTO votings (event_id, vote_ended, end_date, description)
VALUES
(
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    FALSE,
    '2026-08-28 22:00:00+02',
    'Select every weekend slot when you can attend.'
),
(
    'abababab-abab-abab-abab-abababababab',
    FALSE,
    '2026-08-24 20:00:00+02',
    'Choose every hiking date that works for you.'
),
(
    'acacacac-acac-acac-acac-acacacacacac',
    FALSE,
    '2026-08-30 18:00:00+02',
    'Select all study sessions you can attend.'
);

-- =========================================================
-- DATE VARIANTS
-- =========================================================

INSERT INTO date_variants (id, event_id, date)
VALUES
-- Hackathon
('a1000000-0000-0000-0000-000000000001', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '2026-09-05 09:00:00+02'),
('a1000000-0000-0000-0000-000000000002', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '2026-09-12 09:00:00+02'),
('a1000000-0000-0000-0000-000000000003', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '2026-09-19 09:00:00+02'),
('a1000000-0000-0000-0000-000000000004', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '2026-09-26 09:00:00+02'),

-- Hiking
('a2000000-0000-0000-0000-000000000001', 'abababab-abab-abab-abab-abababababab', '2026-09-06 08:00:00+02'),
('a2000000-0000-0000-0000-000000000002', 'abababab-abab-abab-abab-abababababab', '2026-09-13 08:00:00+02'),
('a2000000-0000-0000-0000-000000000003', 'abababab-abab-abab-abab-abababababab', '2026-09-20 08:00:00+02'),
('a2000000-0000-0000-0000-000000000004', 'abababab-abab-abab-abab-abababababab', '2026-09-27 08:00:00+02'),

-- Study group
('a3000000-0000-0000-0000-000000000001', 'acacacac-acac-acac-acac-acacacacacac', '2026-09-03 18:00:00+02'),
('a3000000-0000-0000-0000-000000000002', 'acacacac-acac-acac-acac-acacacacacac', '2026-09-04 18:00:00+02'),
('a3000000-0000-0000-0000-000000000003', 'acacacac-acac-acac-acac-acacacacacac', '2026-09-07 18:00:00+02'),
('a3000000-0000-0000-0000-000000000004', 'acacacac-acac-acac-acac-acacacacacac', '2026-09-08 18:00:00+02');

-- =========================================================
-- USER VOTES
-- =========================================================

INSERT INTO user_date_votes (user_id, date_variant_id)
VALUES
-- Hackathon votes
('66666666-6666-6666-6666-666666666666', 'a1000000-0000-0000-0000-000000000001'),
('66666666-6666-6666-6666-666666666666', 'a1000000-0000-0000-0000-000000000002'),
('22222222-2222-2222-2222-222222222222', 'a1000000-0000-0000-0000-000000000001'),
('22222222-2222-2222-2222-222222222222', 'a1000000-0000-0000-0000-000000000003'),
('55555555-5555-5555-5555-555555555555', 'a1000000-0000-0000-0000-000000000002'),
('55555555-5555-5555-5555-555555555555', 'a1000000-0000-0000-0000-000000000003'),
('88888888-8888-8888-8888-888888888888', 'a1000000-0000-0000-0000-000000000001'),
('88888888-8888-8888-8888-888888888888', 'a1000000-0000-0000-0000-000000000004'),
('14141414-1414-1414-1414-141414141414', 'a1000000-0000-0000-0000-000000000001'),
('14141414-1414-1414-1414-141414141414', 'a1000000-0000-0000-0000-000000000002'),

-- Hiking votes
('77777777-7777-7777-7777-777777777777', 'a2000000-0000-0000-0000-000000000001'),
('77777777-7777-7777-7777-777777777777', 'a2000000-0000-0000-0000-000000000002'),
('33333333-3333-3333-3333-333333333333', 'a2000000-0000-0000-0000-000000000002'),
('33333333-3333-3333-3333-333333333333', 'a2000000-0000-0000-0000-000000000003'),
('55555555-5555-5555-5555-555555555555', 'a2000000-0000-0000-0000-000000000001'),
('55555555-5555-5555-5555-555555555555', 'a2000000-0000-0000-0000-000000000004'),
('13131313-1313-1313-1313-131313131313', 'a2000000-0000-0000-0000-000000000001'),
('13131313-1313-1313-1313-131313131313', 'a2000000-0000-0000-0000-000000000002'),
('13131313-1313-1313-1313-131313131313', 'a2000000-0000-0000-0000-000000000003'),

-- Study group votes
('13131313-1313-1313-1313-131313131313', 'a3000000-0000-0000-0000-000000000001'),
('13131313-1313-1313-1313-131313131313', 'a3000000-0000-0000-0000-000000000003'),
('33333333-3333-3333-3333-333333333333', 'a3000000-0000-0000-0000-000000000001'),
('33333333-3333-3333-3333-333333333333', 'a3000000-0000-0000-0000-000000000002'),
('77777777-7777-7777-7777-777777777777', 'a3000000-0000-0000-0000-000000000001'),
('77777777-7777-7777-7777-777777777777', 'a3000000-0000-0000-0000-000000000004'),
('14141414-1414-1414-1414-141414141414', 'a3000000-0000-0000-0000-000000000002'),
('14141414-1414-1414-1414-141414141414', 'a3000000-0000-0000-0000-000000000003');
