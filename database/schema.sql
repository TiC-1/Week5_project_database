BEGIN;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255)
);

DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  task_title VARCHAR(255)
);

DROP TABLE IF EXISTS tasks_assignments;

CREATE TABLE tasks_assignments (
  task_assign_id INT UNSIGNED,
  user_assign_id INT UNSIGNED,
  FOREIGN KEY (task_assign_id) REFERENCES tasks (task_id);
  FOREIGN KEY (user_assign_id) REFERENCES users (user_id);
  PRIMARY KEY (task_assign_id, user_assign_id);
);

COMMIT;
