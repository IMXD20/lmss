package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

func CreateCourse(c *gin.Context) {
	// title := c.PostForm("title")
	// description := c.PostForm("description")
	// thumbnailId := c.PostForm("thumbnail_id")
	title := getJSON(c, "title")
	description := getJSON(c, "description")
	thumbnailId := getJSON(c, "thumbnail_id")

	if title == "" {
		c.JSON(400, gin.H{"message": "TITLE_REQUIRED"})
		return
	}
	stmt, _ := db.Prepare("INSERT INTO courses (title, description, thumbnail_id, created_at) VALUES (?, ?, ?, datetime('now'))")
	res, _ := stmt.Exec(title, description, thumbnailId)
	id, _ := res.LastInsertId()
	c.JSON(200, gin.H{"message": "SUCCESS", "id": id})
}

func GetCourses(c *gin.Context) {
	rows, _ := db.Query("SELECT id, title, description, thumbnail_id, created_at FROM courses")
	var courses []gin.H
	for rows.Next() {
		var id int
		var title, description, createdAt string
		var thumbnailId sql.NullInt64
		rows.Scan(&id, &title, &description, &thumbnailId, &createdAt)
		courses = append(courses, gin.H{"id": id, "title": title, "description": description, "thumbnail_id": thumbnailId, "created_at": createdAt})
	}
	c.JSON(200, gin.H{"message": "SUCCESS", "courses": courses})
}

func UpdateCourse(c *gin.Context) {
	id := c.Param("id")
	// title := c.PostForm("title")
	// description := c.PostForm("description")
	// thumbnailId := c.PostForm("thumbnail_id")
	title := getJSON(c, "title")
	description := getJSON(c, "description")
	thumbnailId := getJSON(c, "thumbnail_id")
	
	if title == "" {
		c.JSON(400, gin.H{"message": "TITLE_REQUIRED"})
		return
	}

	stmt, _ := db.Prepare("UPDATE courses SET title = ?, description = ?, thumbnail_id = ? WHERE id = ?")
	stmt.Exec(title, description, thumbnailId, id)

	c.JSON(200, gin.H{"message": "SUCCESS"})
}

func DeleteCourse(c *gin.Context) {
	id := c.Param("id")
	stmt, _ := db.Prepare("DELETE FROM courses WHERE id = ?")
	stmt.Exec(id)
	c.JSON(200, gin.H{"message": "SUCCESS"})
}

func GetCourseFull(c *gin.Context) {
	id := c.Param("id")
	var title, description, createdAt string
	var thumbnailId sql.NullInt64
	db.QueryRow("SELECT title, description, thumbnail_id, created_at FROM courses WHERE id = ?", id).Scan(&title, &description, &thumbnailId, &createdAt)

	rows, _ := db.Query("SELECT id, text, description, file_id, created_at FROM contents WHERE course_id = ?", id)
	var contents []gin.H
	for rows.Next() {
		var id int
		var text, description, createdAt string
		var fileId sql.NullInt64
		rows.Scan(&id, &text, &description, &fileId, &createdAt)
		contents = append(contents, gin.H{"id": id, "text": text, "description": description, "file_id": fileId, "created_at": createdAt})
	}

	c.JSON(200, gin.H{"message": "SUCCESS", "id": id, "title": title, "description": description, "thumbnail_id": thumbnailId, "created_at": createdAt, "contents": contents})
}