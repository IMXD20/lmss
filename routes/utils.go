package routes

import (
	"database/sql"
	"encoding/json"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

var secretKey = []byte("secret")

var db *sql.DB

func InitDb() {
	var err error
	db, err = sql.Open("sqlite3", "example.db")
	if err != nil {
		log.Fatal(err)
	}

	// Create tables
	db.Exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'user')),
    email TEXT UNIQUE NOT NULL,
    passwd TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_path TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (thumbnail_id) REFERENCES files(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS contents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    text TEXT,
    description TEXT,
    file_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS enrollments (
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS progress (
    user_id INTEGER NOT NULL,
    content_id INTEGER NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, content_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES contents(id) ON DELETE CASCADE
);
CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);

CREATE INDEX idx_progress_user_id ON progress(user_id);
CREATE INDEX idx_progress_content_id ON progress(content_id);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_courses_title ON courses(title);
CREATE INDEX idx_contents_course ON contents(course_id);
    `)

	// Create an admin user if not exists
	var count int
	db.QueryRow("SELECT COUNT(*) FROM users WHERE role = 'admin'").Scan(&count)
	if count == 0 {
		pwBytes, _ := bcrypt.GenerateFromPassword([]byte("admin"), bcrypt.DefaultCost)
		stmt, _ := db.Prepare("INSERT INTO users (full_name, role, email, passwd) VALUES (?, ?, ?, ?)")
		stmt.Exec("Admin", "admin", "admin@mail.com", string(pwBytes))
	}
}

func getJSON(c *gin.Context, key string) string {
	var jsonMap map[string]interface{}
	err := json.NewDecoder(c.Request.Body).Decode(&jsonMap)
	if err != nil {
		return ""
	}
if val, ok := jsonMap[key]; ok {
    // check data type
    switch v := val.(type) {
    case int:
        return strconv.Itoa(v)
    case int64:
        return strconv.FormatInt(v, 10)
    case float64:
        return strconv.FormatFloat(v, 'f', -1, 64)
    case string:
        return v
    default:
        return ""
    }
} else {
		return ""
	}
}
