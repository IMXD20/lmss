package routes

import "github.com/gin-gonic/gin"

func MarkContentCompleted(c *gin.Context) {
	// contentId := c.PostForm("content_id")
	contentId := getJSON(c, "content_id")
	userId, _ := c.Get("id")
	stmt, _ := db.Prepare("INSERT INTO progress (user_id, content_id, completed, created_at) VALUES (?, ?, ?, datetime('now'))")
	stmt.Exec(userId, contentId, true)
	c.JSON(200, gin.H{"message": "SUCCESS"})
}

func MarkContentIncomplete(c *gin.Context) {
	// contentId := c.PostForm("content_id")
	contentId := getJSON(c, "content_id")
	userId, _ := c.Get("id")
	stmt, _ := db.Prepare("DELETE FROM progress WHERE user_id = ? AND content_id = ?")
	stmt.Exec(userId, contentId)
	c.JSON(200, gin.H{"message": "SUCCESS"})
}

func GetCourseProgress(c *gin.Context) {
	courseId := c.Param("course_id")
	userId, _ := c.Get("id")
	rows, _ := db.Query("SELECT p.content_id, p.completed FROM progress p JOIN contents c ON p.content_id = c.id WHERE p.user_id = ? AND c.course_id = ?", userId, courseId)
	var progress []gin.H
	for rows.Next() {
		var contentId int
		var completed bool
		rows.Scan(&contentId, &completed)
		progress = append(progress, gin.H{"content_id": contentId, "completed": completed})
	}
	c.JSON(200, gin.H{"message": "SUCCESS", "progress": progress})
}
