package main

import (
	"net/http"

	"server/endpoints/login"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/Login", func(c *gin.Context) {
		firstname := c.DefaultQuery("username", "Guest")
		lastname := c.Query("password")
		if firstname == "" || lastname == "" {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "Please Enter Username and Password"})
			return
		}
		users, err := login.LoginUser(firstname, lastname)
		if len(users) == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Incorrect Username or Password"})
			return
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, users)
	})
	router.Run("localhost:8080")
}
