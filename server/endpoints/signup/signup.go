package signup

import (
	_ "github.com/lib/pq"
)

type signup_info struct {
	ID         string `json:"id"`
	Auth_token string `json:"auth_token"`
}
