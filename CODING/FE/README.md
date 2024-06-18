# Project Management System

## Giới thiệu Đề Tài

Dự án này nhằm tạo ra một hệ thống quản lý dự án để theo dõi các user stories (US) qua các sprint và phân công thành viên nhóm cho từng user story. Hệ thống giúp đảm bảo các sprint được hoàn thành đúng tiến độ và các thành viên nhóm biết được nhiệm vụ của mình.

## Nội Dung và Các Tính Năng Lớn (EPIC)

### 1. Quản Lý User Stories

- **Mô tả:** Theo dõi và quản lý các user stories của dự án.
- **Chức năng chính:**
  - Tạo mới, chỉnh sửa và xóa user stories.
  - Gán trạng thái (To Do, In Progress, Done) cho từng user story.
  - Liệt kê user stories theo từng sprint.

### 2. Phân Công Thành Viên

- **Mô tả:** Phân công thành viên nhóm cho các user stories trong từng sprint.
- **Chức năng chính:**
  - Gán thành viên nhóm cho từng user story.
  - Theo dõi công việc của từng thành viên trong từng sprint.
  - Hiển thị danh sách thành viên và các user stories tương ứng.

### 3. Báo Cáo Tiến Đooj

- **Mô tả:** Cung cấp báo cáo tiến độ dự án theo sprint và theo thành viên.
- **Chức năng chính:**
  - Báo cáo tiến độ hoàn thành của từng user story.
  - Tổng hợp tiến độ công việc của từng thành viên.
  - Báo cáo tổng quan về sprint hiện tại và các sprint trước đó.

## Công Nghệ Sử Dụng

- **Frontend:** React.js
- **Backend:** Node.js với Express
- **Cơ Sở Dữ Liệu:** MySQL
- **Phiên Bản:** Git

## Tác Dụng

Hệ thống này giúp cải thiện quy trình quản lý dự án bằng cách:

- Tăng cường tính minh bạch trong việc phân công và theo dõi công việc.
- Đảm bảo các thành viên nhóm biết rõ nhiệm vụ của mình.
- Cung cấp các báo cáo kịp thời và chi tiết về tiến độ dự án.

## Bảng Phân Công Các Thành Viên

| Thành Viên | Nhiệm Vụ                       | Sprint  |
| ---------- | ------------------------------ | ------- |
| Alice      | Quản lý user stories           | Sprint1 |
| Bob        | Phát triển tính năng phân công | Sprint1 |
| Charlie    | Thiết kế cơ sở dữ liệu         | Sprint2 |
| David      | Báo cáo tiến độ                | Sprint2 |
| Eve        | Kiểm thử hệ thống              | Sprint3 |

## Table 1: User Stories by Sprint

This table stores information about user stories and their associated sprints.

### Table Structure

| Column Name | Data Type | Description                                                        |
| ----------- | --------- | ------------------------------------------------------------------ |
| `id`        | INT       | Unique identifier for the user story.                              |
| `us_name`   | VARCHAR   | Name or description of the user story.                             |
| `sprint`    | VARCHAR   | Sprint identifier (e.g., Sprint1, Sprint2).                        |
| `status`    | VARCHAR   | Current status of the user story (e.g., To Do, In Progress, Done). |

### Example Data

| id  | us_name      | sprint  | status      |
| --- | ------------ | ------- | ----------- |
| 1   | User Story 1 | Sprint1 | To Do       |
| 2   | User Story 2 | Sprint1 | In Progress |
| 3   | User Story 3 | Sprint2 | Done        |

## Table 2: Member Assignments

This table records the assignment of team members to user stories in specific sprints.

### Table Structure

| Column Name   | Data Type | Description                                                    |
| ------------- | --------- | -------------------------------------------------------------- |
| `id`          | INT       | Unique identifier for the assignment.                          |
| `us_id`       | INT       | Foreign key referencing `user_stories(id)`.                    |
| `member_name` | VARCHAR   | Name of the team member assigned to the user story.            |
| `sprint`      | VARCHAR   | Sprint identifier (should match the sprint in `user_stories`). |

### Example Data

| id  | us_id | member_name | sprint  |
| --- | ----- | ----------- | ------- |
| 1   | 1     | Alice       | Sprint1 |
| 2   | 2     | Bob         | Sprint1 |
| 3   | 3     | Charlie     | Sprint2 |

## Usage

1. **Creating Tables:**

   - Refer to your database schema and create the `user_stories` and `member_assignments` tables with the structures described above.

2. **Inserting Data:**

   - Populate the tables with initial data as per your project requirements. Example data is provided for reference.

3. **Querying Data:**
   - To get a list of user stories for a specific sprint:
     ```sql
     SELECT * FROM user_stories WHERE sprint = 'Sprint1';
     ```
   - To get the assignment of members to user stories in a specific sprint:
     ```sql
     SELECT us.us_name, ma.member_name
     FROM user_stories us
     JOIN member_assignments ma ON us.id = ma.us_id
     WHERE us.sprint = 'Sprint1';
     ```
