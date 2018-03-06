BEGIN;

INSERT INTO users (user_name) VALUES ('Grumpy');
INSERT INTO users (user_name) VALUES ('Happy');
INSERT INTO users (user_name) VALUES ('Sleepy');
INSERT INTO users (user_name) VALUES ('Sneezy');

INSERT INTO tasks (task_title) VALUES ('Come home from work singing');
INSERT INTO tasks (task_title) VALUES ('Wake up Snow White');
INSERT INTO tasks (task_title) VALUES ('Throw apples out in the trash!');

INSERT INTO tasks_assignments VALUES (1, 1);
INSERT INTO tasks_assignments VALUES (1, 2);
INSERT INTO tasks_assignments VALUES (2, 4);
INSERT INTO tasks_assignments VALUES (3, 1);
INSERT INTO tasks_assignments VALUES (3, 2);
INSERT INTO tasks_assignments VALUES (3, 3);

COMMIT;
