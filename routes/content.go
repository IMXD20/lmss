package routes

import "github.com/gin-gonic/gin"

func CreateContent(c *gin.Context) {
	// courseId := c.PostForm("course_id")
	// text := c.PostForm("text")
	// description := c.PostForm("description")
	// fileId := c.PostForm("file_id")
	courseId := getJSON(c, "course_id")
	text := getJSON(c, "text")
	description := getJSON(c, "description")
	fileId := getJSON(c, "file_id")

	if courseId == "" {
		c.JSON(400, gin.H{"message": "COURSE_ID_REQUIRED"})
		return
	}
	stmt, _ := db.Prepare("INSERT INTO contents (course_id, text, description, file_id, created_at) VALUES (?, ?, ?, ?, datetime('now'))")
	res, _ := stmt.Exec(courseId, text, description, fileId)
	id, _ := res.LastInsertId()
	c.JSON(200, gin.H{"message": "SUCCESS", "id": id})
}

func UpdateContent(c *gin.Context) {
	id := c.Param("id")
	// text := c.PostForm("text")
	// description := c.PostForm("description")
	// fileId := c.PostForm("file_id")
	text := getJSON(c, "text")
	description := getJSON(c, "description")
	fileId := getJSON(c, "file_id")

	stmt, _ := db.Prepare("UPDATE contents SET text = ?, description = ?, file_id = ? WHERE id = ?")
	stmt.Exec(text, description, fileId, id)

	c.JSON(200, gin.H{"message": "SUCCESS"})
}

func DeleteContent(c *gin.Context) {
	id := c.Param("id")

	stmt, _ := db.Prepare("DELETE FROM contents WHERE id = ?")
	stmt.Exec(id)

	c.JSON(200, gin.H{"message": "SUCCESS"})
}
