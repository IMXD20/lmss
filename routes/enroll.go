package routes

import "github.com/gin-gonic/gin"

func EnrollCourse(c *gin.Context) {
	// courseId := c.PostForm("course_id")
	courseId := getJSON(c, "course_id")
	userId, _ := c.Get("id")
	stmt, _ := db.Prepare("INSERT INTO enrollments (user_id, course_id, created_at) VALUES (?, ?, datetime('now'))")
	stmt.Exec(userId, courseId)
	c.JSON(200, gin.H{"message": "SUCCESS"})
}

func GetEnrollments(c *gin.Context) {
	userId, _ := c.Get("id")
	rows, _ := db.Query("SELECT course_id FROM enrollments WHERE user_id = ?", userId)
	var courseIds []int
	for rows.Next() {
		var courseId int
		rows.Scan(&courseId)
		courseIds = append(courseIds, courseId)
	}
	c.JSON(200, gin.H{"message": "SUCCESS", "course_ids": courseIds})
}

func DerollCourse(c *gin.Context) {
	courseId := c.Param("course_id")
	userId, _ := c.Get("id")
	stmt, _ := db.Prepare("DELETE FROM enrollments WHERE user_id = ? AND course_id = ?")
	stmt.Exec(userId, courseId)
	c.JSON(200, gin.H{"message": "SUCCESS"})
}
