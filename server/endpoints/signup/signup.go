package signup

import (
	"log"
	"server/db"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type signup_info struct {
	Email     string `json:"email"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Password  string `json:"password"`
}

func CheckExistingUser(email string) (int, error) {
	var number_of_users int
	sqlStatement := `SELECT COUNT(*) from users where username = $1;`
	rows, error := db.DB.Query(sqlStatement, email)
	if error != nil {
		log.Fatalln("Error querying the database:", error)
		return 0, error
	}
	defer rows.Close()
	for rows.Next() {
		if err := rows.Scan(&number_of_users); err != nil {
			return 0, err
		}
	}
	if err := rows.Err(); err != nil {
		return 0, err
	}
	return number_of_users, nil
}

func Signup_User(email string, firstname string, lastname string, password string) error {
	var user_data signup_info
	user_data.Email = email
	user_data.FirstName = firstname
	user_data.LastName = lastname
	// user_data.Password = password

	// Using Bcrypt to Hash Password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalln("Could not Hash Password!")
		return err
	}
	user_data.Password = string(hashedPassword)
	_, error := db.DB.Exec("INSERT INTO USERS (username, fname, lname, password) VALUES ($1,$2,$3,$4);", user_data.Email, user_data.FirstName, user_data.LastName, user_data.Password)
	if error != nil {
		// log.Fatalln("Error Adding User to Database")
		log.Fatalln(error)
		return error
	} else {
		return nil
	}
}
