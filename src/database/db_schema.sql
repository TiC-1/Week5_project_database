BEGIN;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255)
);

DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255)
);

DROP TABLE IF EXISTS tasks_assignments;

CREATE TABLE tasks_assignments (
  task_id INT,
  user_id INT,
  FOREIGN KEY (task_id) REFERENCES tasks (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  PRIMARY KEY (task_id, user_id)
);

COMMIT;
