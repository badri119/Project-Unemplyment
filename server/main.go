package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type login_info struct {
	ID        string `json:"id"`
	username  string `json:"username"`
	firstname string `json:"firstname"`
	lastname  string `json:"lastname"`
	password  string `json:"password"`
}

var info = []login_info{
	{ID: "1", username: "ajishkalia123@gmail.com", firstname: "John", lastname: " Coltrane", password: "12345"},
	{ID: "2", username: "ajishkalia124@gmail.com", firstname: "John", lastname: " Coltrane", password: "12345"},
	{ID: "3", username: "ajishkalia125@gmail.com", firstname: "John", lastname: " Coltrane", password: "12345"},
}

func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, info)
}

func main() {
	router := gin.Default()
	router.GET("/Login", getAlbums)
	router.Run("localhost:8080")
}
