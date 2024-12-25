package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(c *gin.Context) {
	tokenStr := c.GetHeader("Authorization")
	if tokenStr == "" {
		c.JSON(401, gin.H{"message": "UNAUTHORIZED1"})
		c.Abort()
		return
	}

	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})
	if err != nil {
		c.JSON(401, gin.H{"message": "UNAUTHORIZED2"})
		c.Abort()
		return
	}

	claims, _ := token.Claims.(jwt.MapClaims)
	c.Set("id", claims["id"])
	c.Set("role", claims["role"])
}

func AdminMiddleware(c *gin.Context) {
	role, _ := c.Get("role")
	if role != "admin" {
		c.JSON(403, gin.H{"message": "FORBIDDEN"})
		c.Abort()
		return
	}
}