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
	DB, err = sql.Open("postgres", "user=postgres dbname=unemp-proj sslmode=disable password=root host=localhost")
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
