package routes

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func UploadFile(c *gin.Context) {
	file, _ := c.FormFile("file")
	if file == nil {
		c.JSON(400, gin.H{"message": "FILE_REQUIRED"})
		return
	}
	filePath := "uploads/" + file.Filename
	c.SaveUploadedFile(file, filePath)

	stmt, _ := db.Prepare("INSERT INTO files (file_path, created_at) VALUES (?, datetime('now'))")
	res, _ := stmt.Exec(filePath)
	id, _ := res.LastInsertId()
	c.JSON(200, gin.H{"message": "SUCCESS", "id": id})
}

func GetFile(c *gin.Context) {
	c.Header("Accept-Ranges", "bytes")
	id := c.Param("id")
	var filePath string
	db.QueryRow("SELECT file_path FROM files WHERE id = ?", id).Scan(&filePath)
	// check for range header
	if c.GetHeader("Range") != "" {
		var reader io.Reader
		file, _ := os.Open(filePath)
		defer file.Close()
		fileInfo, _ := file.Stat()
		fileSize := fileInfo.Size()
		rangeHeader := c.GetHeader("Range")
		ranges := strings.Split(rangeHeader, "=")[1]
		rangeParts := strings.Split(ranges, "-")
		start, _ := strconv.ParseInt(rangeParts[0], 10, 64)
		var end int64
		if rangeParts[1] == "" {
			end = fileSize - 1
		} else {
			end, _ = strconv.ParseInt(rangeParts[1], 10, 64)
		}
		c.Header("Content-Range", fmt.Sprintf("bytes %d-%d/%d", start, end, fileSize))
		reader = io.NewSectionReader(file, start, end-start+1)
		c.DataFromReader(206, fileSize, "application/octet-stream", reader, map[string]string{})
	} else {
		c.File(filePath)
	}
}

func DeleteFile(c *gin.Context) {
	id := c.Param("id")
	stmt, _ := db.Prepare("DELETE FROM files WHERE id = ?")
	stmt.Exec(id)
	c.JSON(200, gin.H{"message": "SUCCESS"})
}

func FindUnusedFiles(c *gin.Context) {
	rows, _ := db.Query("SELECT id, file_path, created_at FROM files WHERE id NOT IN (SELECT thumbnail_id FROM courses)")
	var files []gin.H
	for rows.Next() {
		var id int
		var filePath, createdAt string
		rows.Scan(&id, &filePath, &createdAt)
		files = append(files, gin.H{"id": id, "file_path": filePath, "created_at": createdAt})
	}
	c.JSON(200, gin.H{"message": "SUCCESS", "files": files})
}
