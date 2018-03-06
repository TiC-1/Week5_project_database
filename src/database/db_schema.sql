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
