package server

import (
	"context"
	"net/url"

	"github.com/jinzhu/gorm"
	abclientstate "github.com/volatiletech/authboss-clientstate"
	"github.com/volatiletech/authboss/v3"
)

/////////////////////////////////////////////////////////////////
// ServerStorer

type SQLiteStorer struct {
	authboss.CreatingServerStorer
	DB *gorm.DB
}

func (s SQLiteStorer) Load(ctx context.Context, key string) (authboss.User, error) {
	user := User{
		ID: url.QueryEscape(key), // Encode the email to userID
	}
	if err := s.DB.First(&user).Error; err != nil {
		return &user, authboss.ErrUserNotFound
	}
	return &user, nil
}

func (s SQLiteStorer) Save(ctx context.Context, user authboss.User) error {
	user = user.(*User)
	err := s.DB.Save(&user).Error
	return err
}

func (s SQLiteStorer) New(ctx context.Context) authboss.User {
	return &User{
		ListMode: false,
		DarkMode: false,
	}
}

func (s SQLiteStorer) Create(ctx context.Context, user authboss.User) error {
	existingUser := user.(*User)
	existingUser.ID = url.QueryEscape(existingUser.ID)
	if err := s.DB.First(&existingUser).Error; err == nil {
		return authboss.ErrUserFound
	}
	err := s.DB.Create(&existingUser).Error
	return err
}

////////////////////////////////////////////////////////////
// Factory Methods

func NewSQLiteStorer(db *gorm.DB) *SQLiteStorer {
	return &SQLiteStorer{
		DB: db,
	}
}

func NewCookieStorer(cookieStoreKey []byte, isSecure bool) abclientstate.CookieStorer {
	newCookieStore := abclientstate.NewCookieStorer(cookieStoreKey, nil)
	newCookieStore.HTTPOnly = isSecure
	newCookieStore.Secure = isSecure
	return newCookieStore
}

func NewSessionStorer(cookieName string, sessionStoreKey []byte) abclientstate.SessionStorer {
	return abclientstate.NewSessionStorer(cookieName, sessionStoreKey, nil)
}
