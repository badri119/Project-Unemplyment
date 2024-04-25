package main

import (
	"net/http"
	"regexp"

	"server/endpoints/login"
	"server/endpoints/signup"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {

	router := gin.Default()
	router.Use(CORSMiddleware())
	router.GET("/login", func(c *gin.Context) {
		email := c.DefaultQuery("username", "Guest")
		password := c.Query("password")
		if email == "" || password == "" {
			c.JSON(http.StatusOK, gin.H{"error": "Please Enter Username and Password"})
			return
		}
		user_data, err := login.LoginUser(email, password)
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

	router.GET("/logout", func(c *gin.Context) {
		token := c.Query("token")
		if token == "" {
			c.JSON(http.StatusOK, gin.H{"error": "JWT Token is required"})
			return
		}
		err := login.LogoutUser(token)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"success": "Logged out Succesfully"})
	})

	router.GET("/check/email", func(c *gin.Context) {
		email := c.Query("email")
		if email == "" {
			c.JSON(http.StatusOK, gin.H{"error": "Email Address is required"})
			return
		}
		number, error := signup.CheckExistingUser(email)
		if error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": error})
			return
		} else {
			if number > 0 {
				c.JSON(http.StatusAccepted, gin.H{"error": "This email already exists in the system"})
				return
			}
		}
		c.JSON(http.StatusAccepted, gin.H{"success": "This email does not exist in the system"})
	})

	router.POST("/signup", func(c *gin.Context) {
		if err := c.Request.ParseForm(); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to Parse Form Data"})
			return
		}
		email := c.PostForm("email")
		fname := c.PostForm("firstname")
		lname := c.PostForm("lastname")
		password := c.PostForm("pass")
		confirm_password := c.PostForm("cpass")
		number_regexp := regexp.MustCompile("[0-9]")
		email_regexp := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
		hasDigit := regexp.MustCompile(`\d`)
		hasLowerCase := regexp.MustCompile(`[a-z]`)
		hasUpperCase := regexp.MustCompile(`[A-Z]`)
		hasMinimumLength := regexp.MustCompile(`.{8,}`)
		if fname == "" {
			// Check if user entered First name
			c.JSON(http.StatusOK, gin.H{"error": "First Name is Required"})
			return
		} else {
			if number_regexp.MatchString(fname) {
				// Check if First name has any numbers
				c.JSON(http.StatusOK, gin.H{"error": "Please Enter a Valid First Name"})
				return
			}
		}
		if lname == "" {
			// Check if user entered Last name
			c.JSON(http.StatusOK, gin.H{"error": "Last Name is Required"})
			return
		} else {
			if number_regexp.MatchString(lname) {
				// Check if Last name has any numbers
				c.JSON(http.StatusOK, gin.H{"error": "Please Enter a Valid Last Name"})
				return
			}
		}
		if email == "" {
			// Check if user entered Email
			c.JSON(http.StatusOK, gin.H{"error": "Email is Required"})
			return
		} else {
			if !email_regexp.MatchString(email) {
				// Check if user entered a valid Email address
				c.JSON(http.StatusOK, gin.H{"error": "Please Enter a Valid Email Address"})
				return
			}
		}
		if !hasDigit.MatchString(password) || !hasLowerCase.MatchString(password) ||
			!hasUpperCase.MatchString(password) || !hasMinimumLength.MatchString(password) {
			// Check if Password follows a valid policy
			c.JSON(http.StatusOK, gin.H{"error": "Please Enter a Valid Password"})
			return
		}
		if password == "" {
			// Check if user entered Email
			c.JSON(http.StatusOK, gin.H{"error": "Password is Required"})
			return
		} else {
			if password != confirm_password {
				// Check if the entered Password mathces with the Confirmed password
				c.JSON(http.StatusOK, gin.H{"error": "Passwords do not match!"})
				return
			}
		}
		// Check if a user with this email already exists in the system
		number, error := signup.CheckExistingUser(email)
		if error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": error})
			return
		} else {
			if number > 0 {
				c.JSON(http.StatusAccepted, gin.H{"error": "This email already exists in the system"})
				return
			}
		}
		// If everything is valid, go ahead and Sign up the user
		signup_error := signup.Signup_User(email, fname, lname, password)
		if signup_error != nil {
			c.JSON(http.StatusAccepted, gin.H{"error": "Error Adding User to Database"})
			return
		} else {
			c.JSON(http.StatusAccepted, gin.H{"success": "User Added Succesfully"})
			return
		}
	})
	router.Run("localhost:8080")
}
