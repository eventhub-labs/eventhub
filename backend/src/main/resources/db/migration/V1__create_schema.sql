CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) NOT NULL UNIQUE,
    username    VARCHAR(100) NOT NULL UNIQUE,
    name        VARCHAR(100),
    surname     VARCHAR(100),
    user_img    VARCHAR(512),
    phone       VARCHAR(30),
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(20) NOT NULL,

    CONSTRAINT chk_users_role
        CHECK (role IN ('USER', 'ADMIN', 'MODERATOR'))
);

CREATE TABLE events (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_user_id     UUID NOT NULL,
    name                VARCHAR(100) NOT NULL,
    description         VARCHAR(600),
    is_date_approved    BOOLEAN NOT NULL DEFAULT FALSE,
    date                TIMESTAMPTZ,

    CONSTRAINT fk_events_creator
        FOREIGN KEY (creator_user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_events_approved_date
        CHECK (NOT is_date_approved OR date IS NOT NULL)
);

CREATE TABLE user_events (
    user_id     UUID NOT NULL,
    event_id    UUID NOT NULL,
    status      VARCHAR(20) NOT NULL,

    PRIMARY KEY (user_id, event_id),

    CONSTRAINT fk_user_events_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_events_event
        FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_user_events_status
        CHECK (status IN ('INVITED', 'ACCEPTED', 'DECLINED'))
);

CREATE TABLE comments (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL,
    event_id    UUID NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    text        VARCHAR(600) NOT NULL,

    CONSTRAINT fk_comments_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_comments_event
        FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE
);

CREATE TABLE tasks (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(600),
    status      VARCHAR(20) NOT NULL DEFAULT 'PLANNED',
    event_id    UUID NOT NULL,

    CONSTRAINT fk_tasks_event
        FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_tasks_status
        CHECK (status IN ('PLANNED', 'IN_PROGRESS', 'DONE'))
);

CREATE TABLE votings (
    event_id     UUID PRIMARY KEY,
    vote_ended   BOOLEAN NOT NULL DEFAULT FALSE,
    end_date     TIMESTAMPTZ,
    description  VARCHAR(600),

    CONSTRAINT fk_votings_event
        FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE
);

CREATE TABLE date_variants (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id    UUID NOT NULL,
    date        TIMESTAMPTZ NOT NULL,

    CONSTRAINT fk_date_variants_voting
        FOREIGN KEY (event_id)
        REFERENCES votings(event_id)
        ON DELETE CASCADE,

    CONSTRAINT uq_date_variants_event_date
        UNIQUE (event_id, date)
);

CREATE TABLE user_date_votes (
    user_id          UUID NOT NULL,
    date_variant_id  UUID NOT NULL,

    PRIMARY KEY (user_id, date_variant_id),

    CONSTRAINT fk_user_date_votes_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_date_votes_variant
        FOREIGN KEY (date_variant_id)
        REFERENCES date_variants(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_events_creator_user_id
    ON events(creator_user_id);

CREATE INDEX idx_user_events_event_id
    ON user_events(event_id);

CREATE INDEX idx_comments_event_id
    ON comments(event_id);

CREATE INDEX idx_comments_created_at
    ON comments(created_at);

CREATE INDEX idx_tasks_event_id
    ON tasks(event_id);

CREATE INDEX idx_user_date_votes_variant_id
    ON user_date_votes(date_variant_id);
