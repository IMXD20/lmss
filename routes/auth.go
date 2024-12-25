package routes

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(c *gin.Context) {
	// fullName := c.PostForm("full_name")
	// email := c.PostForm("email")
	// passwd := c.PostForm("passwd")
	fullName := getJSON(c, "full_name")
	email := getJSON(c, "email")
	passwd := getJSON(c, "passwd")

	if fullName == "" || email == "" || passwd == "" {
		c.JSON(400, gin.H{"message": "FIELDS_REQUIRED"})
		return
	}
	var count int
	db.QueryRow("SELECT COUNT(*) FROM users WHERE email = ?", email).Scan(&count)
	if count > 0 {
		c.JSON(400, gin.H{"message": "EMAIL_ALREADY_EXISTS"})
		return
	}
	pwBytes, _ := bcrypt.GenerateFromPassword([]byte(passwd), bcrypt.DefaultCost)
	stmt, _ := db.Prepare("INSERT INTO users (full_name, role, email, passwd, created_at) VALUES (?, ?, ?, ?, datetime('now'))")
	stmt.Exec(fullName, "admin", email, string(pwBytes))
	c.JSON(200, gin.H{"message": "SUCCESS"})
}

func LoginUser(c *gin.Context) {
	// email := c.PostForm("email")
	// passwd := c.PostForm("passwd")
	email := getJSON(c, "email")
	passwd := getJSON(c, "passwd")

	if email == "" || passwd == "" {
		c.JSON(400, gin.H{"message": "FIELDS_REQUIRED"})
		return
	}
	var id int
	var role string
	var hashedPasswd string
	db.QueryRow("SELECT id, role, passwd FROM users WHERE email = ?", email).Scan(&id, &role, &hashedPasswd)
	if id == 0 {
		c.JSON(400, gin.H{"message": "EMAIL_NOT_FOUND"})
		return
	}
	err := bcrypt.CompareHashAndPassword([]byte(hashedPasswd), []byte(passwd))
	if err != nil {
		c.JSON(400, gin.H{"message": "INVALID_PASSWORD"})
		return
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    id,
		"role":  role,
		"email": email,
		"exp":   time.Now().Add(time.Hour * 72).Unix(),
	})
	tokenString, _ := token.SignedString([]byte("secret"))
	c.JSON(200, gin.H{"message": "SUCCESS", "token": tokenString})
}

func GetUsers(c *gin.Context) {
	rows, _ := db.Query("SELECT id, full_name, role, email, created_at FROM users")
	var users []gin.H
	for rows.Next() {
		var id int
		var fullName, role, email, createdAt string
		rows.Scan(&id, &fullName, &role, &email, &createdAt)
		users = append(users, gin.H{"id": id, "full_name": fullName, "role": role, "email": email, "created_at": createdAt})
	}
	c.JSON(200, gin.H{"message": "SUCCESS", "users": users})
}
