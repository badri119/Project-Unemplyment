package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq" // Import PostgreSQL driver
)

var DB *sql.DB

func init() {
	// Initialize database connection
	var err error
	// Ajish your DB name is unemp-proj and password is root <-------
	DB, err = sql.Open("postgres", "user=postgres dbname=unemployment sslmode=disable password=admin host=localhost")
	if err != nil {
		fmt.Println("Error connecting to the database:", err)
		os.Exit(1)
	}

	// Check if the connection is successful
	err = DB.Ping()
	if err != nil {
		fmt.Println("Error pinging the database:", err)
		os.Exit(1)
	}
}
