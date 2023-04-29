-- MySQL dump 10.13  Distrib 8.0.32, for macos13.0 (arm64)
--
-- Host: localhost    Database: dbds_database
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `dbds_database`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `dbds_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `dbds_database`;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `email` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin@buyme.com','$2b$04$eqf6uIeLYgMPV..d39Zf2ON8koHh.Qx.B.3KE/WJpKDzbU8/NqTce');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
  `answer_id` int NOT NULL AUTO_INCREMENT,
  `answer_text` varchar(200) NOT NULL,
  `email` varchar(40) NOT NULL,
  `question_id` int NOT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `email` (`email`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`email`) REFERENCES `customer_rep` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (2,'click on create auction','custRep1@buyme.com',1),(3,'bhadwe','custRep1@buyme.com',1),(4,'wassup','custRep1@buyme.com',2);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auction`
--

DROP TABLE IF EXISTS `auction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auction` (
  `auction_id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `email` varchar(40) NOT NULL,
  `final_price` int NOT NULL,
  `closing_date` date NOT NULL,
  `bid_increment` int NOT NULL,
  `initial_price` int NOT NULL,
  `minimum_price` int NOT NULL,
  `winner` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`auction_id`),
  KEY `item_id` (`item_id`),
  KEY `email` (`email`),
  CONSTRAINT `auction_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `auction_ibfk_2` FOREIGN KEY (`email`) REFERENCES `end_user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auction`
--

LOCK TABLES `auction` WRITE;
/*!40000 ALTER TABLE `auction` DISABLE KEYS */;
INSERT INTO `auction` VALUES (22,27,'ysk33@gmail.com',0,'2023-04-09',5,25,30,'NW'),(23,28,'ysk33@gmail.com',40,'2023-04-09',10,30,30,'arj96@gmail.com'),(24,29,'ysk33@gmail.com',2000,'2023-04-09',500,1000,1500,'arj96@gmail.com'),(25,30,'arj96@gmail.com',0,'2023-04-12',10,60,65,'NA');
/*!40000 ALTER TABLE `auction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auto_bid`
--

DROP TABLE IF EXISTS `auto_bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auto_bid` (
  `auto_bid_id` int NOT NULL AUTO_INCREMENT,
  `auction_id` int NOT NULL,
  `bid_increment` int NOT NULL,
  `email` varchar(40) NOT NULL,
  `upper_limit` int NOT NULL,
  PRIMARY KEY (`auto_bid_id`),
  KEY `auction_id` (`auction_id`),
  KEY `email` (`email`),
  CONSTRAINT `auto_bid_ibfk_1` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`auction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `auto_bid_ibfk_2` FOREIGN KEY (`email`) REFERENCES `end_user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auto_bid`
--

LOCK TABLES `auto_bid` WRITE;
/*!40000 ALTER TABLE `auto_bid` DISABLE KEYS */;
INSERT INTO `auto_bid` VALUES (3,22,5,'arj96@gmail.com',25),(4,23,10,'arj96@gmail.com',30);
/*!40000 ALTER TABLE `auto_bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bid`
--

DROP TABLE IF EXISTS `bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bid` (
  `bid_id` int NOT NULL AUTO_INCREMENT,
  `auction_id` int NOT NULL,
  `email` varchar(40) NOT NULL,
  `bid_timestamp` timestamp NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`bid_id`),
  KEY `auction_id` (`auction_id`),
  KEY `email` (`email`),
  CONSTRAINT `bid_ibfk_1` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`auction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bid_ibfk_2` FOREIGN KEY (`email`) REFERENCES `end_user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid`
--

LOCK TABLES `bid` WRITE;
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
INSERT INTO `bid` VALUES (23,22,'ysk33@gmail.com','2023-04-09 05:33:01',25),(24,23,'ysk33@gmail.com','2023-04-09 05:35:47',30),(25,24,'ysk33@gmail.com','2023-04-09 05:36:28',1000),(26,23,'arj96@gmail.com','2023-04-09 05:36:58',40),(27,24,'arj96@gmail.com','2023-04-09 05:37:04',1500),(28,24,'arj96@gmail.com','2023-04-09 05:37:08',2000),(29,25,'arj96@gmail.com','2023-04-11 22:37:03',60);
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'caps'),(2,'sunglasses'),(3,'watches');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_rep`
--

DROP TABLE IF EXISTS `customer_rep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_rep` (
  `email` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_rep`
--

LOCK TABLES `customer_rep` WRITE;
/*!40000 ALTER TABLE `customer_rep` DISABLE KEYS */;
INSERT INTO `customer_rep` VALUES ('custrep@buyme.com','$2b$04$g72crsjfkxyKTpwet4KXteFMWtCsprTT6paX1LWtL4MmggtEn/G0S'),('custRep1@buyme.com','1234'),('test@buyme.com','$2b$04$Eq5MJbUjprbLFPLEPzfPP.9YWCtse6zAMZYxfSzWW3O70/SuC0jKK');
/*!40000 ALTER TABLE `customer_rep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `end_user`
--

DROP TABLE IF EXISTS `end_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `end_user` (
  `email` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `end_user`
--

LOCK TABLES `end_user` WRITE;
/*!40000 ALTER TABLE `end_user` DISABLE KEYS */;
INSERT INTO `end_user` VALUES ('arj96@gmail.com','$2b$04$ni/1S7SVf8rjG9a.0ioGdOagrQg8wXtYFvfjYO5w98l6QGjynOW4e'),('ysk33@gmail.com','$2b$04$64nwMtwbEfzTZGRErxAE2udMLYMoMf0NFVn55pOFGzsoA.i6WU4q2');
/*!40000 ALTER TABLE `end_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(20) NOT NULL,
  `color` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `brand` varchar(20) NOT NULL,
  `model` varchar(20) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (27,'cap','red','casual','puma','pm12'),(28,'sunglasses','black','aviator','ray ban','rb12'),(29,'wristwatch','blue','luxury','swiss','sw11'),(30,'caps','red','casual','puma','pm44');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemImages`
--

DROP TABLE IF EXISTS `itemImages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemImages` (
  `imageId` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `imagePath` varchar(255) NOT NULL,
  PRIMARY KEY (`imageId`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `itemimages_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemImages`
--

LOCK TABLES `itemImages` WRITE;
/*!40000 ALTER TABLE `itemImages` DISABLE KEYS */;
INSERT INTO `itemImages` VALUES (40,27,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681018380970.jpg'),(41,27,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681018380976.jpg'),(42,28,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681018546735.jpeg'),(43,28,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681018546739.jpeg'),(44,29,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681018587584.jpg'),(45,29,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681018587586.jpg'),(46,30,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681252622855.jpg');
/*!40000 ALTER TABLE `itemImages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(40) NOT NULL,
  `question_text` varchar(400) NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `email` (`email`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`email`) REFERENCES `end_user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'arj96@gmail.com','How do I create an auction?'),(2,'arj96@gmail.com','Yolo'),(3,'arj96@gmail.com','aa');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `watchlist_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(40) NOT NULL,
  `category` varchar(20) NOT NULL,
  `color` varchar(20) NOT NULL,
  `brand` varchar(20) NOT NULL,
  PRIMARY KEY (`watchlist_id`),
  KEY `email` (`email`),
  CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`email`) REFERENCES `end_user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
INSERT INTO `watchlist` VALUES (5,'ysk33@gmail.com','sunglasses','black','ray ban');
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-11 22:54:55
