BEGIN;

DROP TABLE IF EXISTS tasks_assignments, tasks, users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255)
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255)
);

CREATE TABLE tasks_assignments (
  task_id INT,
  user_id INT,
  FOREIGN KEY (task_id) REFERENCES tasks (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  PRIMARY KEY (task_id, user_id)
);

COMMIT;
