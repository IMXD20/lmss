
# API Documentation

## Public Routes

### Register User
- **URL:** `/api/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Sample Input:**
  ```json
  {
    "full_name": "John Doe",
    "email": "john.doe@example.com",
    "passwd": "password123"
  }
  ```
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS"
  }
  ```

### Login User
- **URL:** `/api/login`
- **Method:** `POST`
- **Description:** Logs in a user.
- **Sample Input:**
  ```json
  {
    "email": "john.doe@example.com",
    "passwd": "password123"
  }
  ```
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS",
    "token": "jwt_token"
  }
  ```

### Get File
- **URL:** `/api/files/:id`
- **Method:** `GET`
- **Description:** Retrieves a file by ID.
- **Sample Output:**
  ```
  *Send the file as attachment (byte stream)*
  ```

### Get Courses
- **URL:** `/api/courses`
- **Method:** `GET`
- **Description:** Retrieves a list of courses.
- **Sample Output:**
  ```json
  {"message": "SUCCESS", "courses":
    [
    {
      "id": "1",
      "title": "Course 1",
      "description": "Description of Course 1",
      "thumbnail_id": "1",
      "created_at": "2021-01-01T00:00:00.000Z"
    },
    {
      "id": "2",
      "title": "Course 2",
      "description": "Description of Course 2",
      "thumbnail_id": "2",
      "created_at": "2021-01-02T00:00:00.000Z"
    }
  ]}
  ```

### Get Course Full
- **URL:** `/api/courses/:id`
- **Method:** `GET`
- **Description:** Retrieves full details of a course by ID.
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS",
    "id": "1",
    "title": "Course 1",
    "description": "Description of Course 1",
    "thumbnail_id": "1",
    "created_at": "2021-01-01T00:00:00.000Z",
    "contents": [
      {
        "id": "1",
        "text": "Content 1",
        "description": "Description of Content 1"
      }
    ]
  }
  ```

## Authenticated Routes

### Enroll Course
- **URL:** `/api/enrollments`
- **Method:** `POST`
- **Description:** Enrolls a user in a course.
- **Sample Input:**
  ```json
  {
    "course_id": "1"
  }
  ```
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS"
  }
  ```

### Get Enrollments
- **URL:** `/api/enrollments`
- **Method:** `GET`
- **Description:** Retrieves a list of enrollments for the authenticated user.
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS",
    "course_ids": ["1", "2"]
  }
  ```

### Deroll Course
- **URL:** `/api/enrollments/:course_id`
- **Method:** `DELETE`
- **Description:** Removes a user from a course.
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS"
  }
  ```

### Mark Content Completed
- **URL:** `/api/progress`
- **Method:** `POST`
- **Description:** Marks content as completed.
- **Sample Input:**
  ```json
  {
    "content_id": "1"
  }
  ```
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS"
  }
  ```

### Mark Content Incomplete
- **URL:** `/api/progress`
- **Method:** `DELETE`
- **Description:** Marks content as incomplete.
- **Sample Input:**
  ```json
  {
    "content_id": "1"
  }
  ```
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS"
  }
  ```

### Get Course Progress
- **URL:** `/api/progress/:course_id`
- **Method:** `GET`
- **Description:** Retrieves progress for a course.
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS",
    "progress": [
      {
        "content_id": "1",
        "completed": true
      },
      {
        "content_id": "2",
        "completed": false
      }
    ]
  }
  ```

## Admin Routes

### Get Users
- **URL:** `/api/admin/users`
- **Method:** `GET`
- **Description:** Retrieves a list of users.
- **Sample Output:**
  ```json
  [
    {
      "id": "1",
      "full_name": "John Doe",
      "role": "user",
      "email": "john.doe@example.com",
      "created_at": "2021-01-01T00:00:00.000Z"
    }
  ]
  ```

### Upload File
- **URL:** `/api/admin/files`
- **Method:** `POST`
- **Description:** Uploads a new file.
- **Sample Input:**
  ```
  *Send the file as form-data*
  ```
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS",
    "file_id": "1"
  }
  ```

### Delete File
- **URL:** `/api/admin/files/:id`
- **Method:** `DELETE`
- **Description:** Deletes a file by ID.
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS"
  }
  ```

### Find Unused Files
- **URL:** `/api/admin/trash-files`
- **Method:** `GET`
- **Description:** Finds unused files.
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS",
    "files": [
      {
        "id": "1",
        "file_path": "path/to/file",  
        "created_at": "2021-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

### Create Course
- **URL:** `/api/admin/courses`
- **Method:** `POST`
- **Description:** Creates a new course.
- **Sample Input:**
  ```json
  {
    "title": "New Course",
    "description": "Description of the new course",
    "thumbnail_id": "1"
  }
  ```
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS",
    "id": "1"
  }
  ```

### Update Course
- **URL:** `/api/admin/courses/:id`
- **Method:** `PUT`
- **Description:** Updates a course by ID.
- **Sample Input:**
  ```json
  {
    "title": "Updated Title or Old Title",
    "description": "Updated description or old description",
    "thumbnail_id": "new_thumbnail_id or old_thumbnail_id"
  }
  ```
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS"
  }
  ```

### Delete Course
- **URL:** `/api/admin/courses/:id`
- **Method:** `DELETE`
- **Description:** Deletes a course by ID.
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS"
  }
  ```

### Create Content
- **URL:** `/api/admin/contents`
- **Method:** `POST`
- **Description:** Creates new content.
- **Sample Input:**
  ```json
  {
    "course_id": "1",
    "text": "Title of the new content",
    "description": "Description of the new content",
    "file_id": "1"
  }
  ```
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS",
    "id": "1"
  }
  ```

### Update Content
- **URL:** `/api/admin/contents/:id`
- **Method:** `PUT`
- **Description:** Updates content by ID.
- **Sample Input:**
  ```json
  {
    "text": "New title or old title",
    "description": "Updated description or old description",
    "file_id": "1"
  }
  ```
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS"
  }
  ```

### Delete Content
- **URL:** `/api/admin/contents/:id`
- **Method:** `DELETE`
- **Description:** Deletes content by ID.
- **Sample Output:**
  ```json
  {
    "message": "SUCCESS"
  }
  ```