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
			c.JSON(http.StatusOK, gin.H{"error": "Please Enter Username and Password"})
			return
		}
		user_data, err := login.LoginUser(firstname, lastname)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{"error": err.Error()})
			return
		}
		if len(user_data) == 0 {
			c.JSON(http.StatusOK, gin.H{"error": "Incorrect Username or Password"})
			return
		}
		c.JSON(http.StatusOK, user_data)
	})
	router.Run("localhost:8080")
}
