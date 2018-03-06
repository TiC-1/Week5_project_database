BEGIN;

INSERT INTO users (username) VALUES ('Grumpy');
INSERT INTO users (username) VALUES ('Happy');
INSERT INTO users (username) VALUES ('Sleepy');
INSERT INTO users (username) VALUES ('Sneezy');

INSERT INTO tasks (title) VALUES ('Come home from work singing');
INSERT INTO tasks (title) VALUES ('Wake up Snow White');
INSERT INTO tasks (title) VALUES ('Throw apples out in the trash!');

INSERT INTO tasks_assignments VALUES (1, 1);
INSERT INTO tasks_assignments VALUES (1, 2);
INSERT INTO tasks_assignments VALUES (2, 4);
INSERT INTO tasks_assignments VALUES (3, 1);
INSERT INTO tasks_assignments VALUES (3, 2);
INSERT INTO tasks_assignments VALUES (3, 3);

COMMIT;
