package login

import (
	"fmt"
	"log"
	"server/db"
	"time"

	"github.com/golang-jwt/jwt/v5"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type login_info struct {
	ID         string `json:"id"`
	Auth_token string `json:"auth_token"`
	Password   string `json:"password"`
}

type WrongPasswordError struct {
	message string
}

// Error returns the error message
func (e *WrongPasswordError) Error() string {
	return e.message
}

var secretKey = []byte("secret-key")

func create_token(id string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  id,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})
	tokenString, error := token.SignedString(secretKey)

	if error != nil {
		return "", error
	}

	return tokenString, nil
}

func updateToken(id string, token string) error {
	sqlStatement := `UPDATE users SET auth_token = $2 WHERE id = $1;`
	_, error := db.DB.Exec(sqlStatement, id, token)
	if error != nil {
		return error
	} else {
		return nil
	}
}

func LoginUser(username string, password string) ([]login_info, error) {
	rows, err := db.DB.Query("SELECT ID,COALESCE(auth_token,''),password FROM users where username=$1 LIMIT 1", username)
	if err != nil {
		log.Fatalln("Error querying the database:", err)
		return nil, err
	}
	defer rows.Close()
	var users []login_info
	// Iterate over the rows
	for rows.Next() {
		var user login_info
		if err := rows.Scan(&user.ID, &user.Auth_token, &user.Password); err != nil {
			return nil, err
		}
		err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
		if err != nil {
			fmt.Println("Password is incorrect")
			err := &WrongPasswordError{"This Password is Incorrect! Please enter a correct Password. "}
			return nil, err
		}
		if user.Auth_token == "" {
			token, token_error := create_token(user.ID)
			if token_error != nil {
				fmt.Println("Token Error", token_error)
				return nil, token_error
			}
			user.Auth_token = token
			// After Token is generated Store it in the Users table
			token_error = updateToken(user.ID, user.Auth_token)
			if token_error != nil {
				fmt.Println("Token Error", token_error)
				return nil, token_error
			}
		}
		users = append(users, login_info{user.ID, user.Auth_token, user.Password})
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}
