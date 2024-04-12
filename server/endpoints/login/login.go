package login

import (
	"log"
	"server/db"

	_ "github.com/lib/pq"
)

type login_info struct {
	ID        string `json:"id"`
	username  string `json:"username"`
	firstname string `json:"firstname"`
	lastname  string `json:"lastname"`
}

func LoginUser(username string, password string) ([]login_info, error) {
	rows, err := db.DB.Query("SELECT ID,username,fname,lname FROM users where username='" + username + "' AND password='" + password + "' LIMIT 1")
	if err != nil {
		log.Fatalln("Error querying the database:", err)
		return nil, err
	}
	defer rows.Close()
	var users []login_info
	// Iterate over the rows
	for rows.Next() {
		var user login_info
		if err := rows.Scan(&user.ID, &user.username, &user.firstname, &user.lastname); err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}
