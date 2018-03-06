# Week5_project_database
Subject: database + node.js + dynamic front-end
Author: TiC-1 team

## General purpose
Create a Todo App using a database.
Tasks will be assigned to one or several users.
Coding will be assign to 2 different teams: front-end and back-end.
Development will be TDD on both client and server side.

## User stories
As a user I want to:
- see all current tasks.
- add a new task and assign it to one or more users.
- remove task.
- edit a user (name).

## Stretch goals
- see tasks filtered by user(s).
- edit tasks (title and assignment).
- add/remove users (what to do with orphan tasks?).

## Repository structure
_See 'code-along' branch in_ https://github.com/turnintocoders/pg-workshop/tree/code-along

- server.js
- _public_
  - index.html
  - style.css
  - assets
   - _images_
- _src_
  - router.js
  - handler.js _(could several files)_
  - _database_
    - db_connection.js
    - db_populate.js
    - db_schema.sql
    - db_data.sql
  - _queries_
- _test_

## Database schema
3 tables:
- users
  - user_id _(auto incremental)_
  - user_name
- tasks
  - task_id _(auto incremental)_
  - task_title
- tasks_assignment
  - task_id _(from task table)_
  - user_id _(from task table)_
