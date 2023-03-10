import json
import mysql.connector


db_config_fp = open("db_config.json", "r")
db_config = json.load(db_config_fp)

db = mysql.connector.connect(
	host = db_config["HOST"],
	user = db_config["USER"],
	password = db_config["PASSWORD"],
	database = db_config["DB"]
)

db_cursor = db.cursor()



if __name__ == "__main__":
	db_cursor.execute("CREATE TABLE IF NOT EXISTS items (itemId INT AUTO_INCREMENT PRIMARY KEY, brand VARCHAR(20) NOT NULL, model VARCHAR(20) NOT NULL, color VARCHAR(10) NOT NULL, type VARCHAR(10) NOT NULL, category VARCHAR(20) NOT NULL)")
	db_cursor.execute("CREATE TABLE IF NOT EXISTS itemImages (imageId INT AUTO_INCREMENT PRIMARY KEY, itemId INT NOT NULL, imagePath VARCHAR(255) NOT NULL, FOREIGN KEY (itemId) REFERENCES items (itemId) ON DELETE CASCADE )")

