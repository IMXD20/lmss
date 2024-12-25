package main

import (
	"github.com/gin-gonic/gin"
	"htt/routes"
)

func main() {
	routes.InitDb()
	// Create a new Gin router
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	auth := r.Group("/api")
	auth.Use(routes.AuthMiddleware)

	adminAuth := auth.Group("/admin")
	adminAuth.Use(routes.AdminMiddleware)

	r.POST("/api/register", routes.RegisterUser)
	r.POST("/api/login", routes.LoginUser)
	r.GET("/api/files/:id", routes.GetFile)
	r.GET("/api/courses", routes.GetCourses)
	r.GET("/api/courses/:id", routes.GetCourseFull)


	auth.POST("/enrollments", routes.EnrollCourse)
	auth.GET("/enrollments", routes.GetEnrollments)
	auth.DELETE("/enrollments/:course_id", routes.DerollCourse)
	auth.POST("/progress", routes.MarkContentCompleted)
	auth.DELETE("/progress", routes.MarkContentIncomplete)
	auth.GET("/progress/:course_id", routes.GetCourseProgress)

	adminAuth.GET("/users", routes.GetUsers)
	adminAuth.POST("/files", routes.UploadFile)
	adminAuth.DELETE("/files/:id", routes.DeleteFile)
	adminAuth.GET("/trash-files", routes.FindUnusedFiles)
	adminAuth.POST("/courses", routes.CreateCourse)
	adminAuth.PUT("/courses/:id", routes.UpdateCourse)
	adminAuth.DELETE("/courses/:id", routes.DeleteCourse)
	adminAuth.POST("/contents", routes.CreateContent)
	adminAuth.PUT("/contents/:id", routes.UpdateContent)
	adminAuth.DELETE("/contents/:id", routes.DeleteContent)

	// Start the server
	r.Run(":8080")
}