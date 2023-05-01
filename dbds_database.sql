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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (5,'No BuyMe supports US only operations as of now.\n','maachuda@buyme.com',5),(6,'Click on the \"Set Auto-Bid\" button inside the auction.','gaandmara@buyme.com',6);
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
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auction`
--

LOCK TABLES `auction` WRITE;
/*!40000 ALTER TABLE `auction` DISABLE KEYS */;
INSERT INTO `auction` VALUES (191,162,'ysk33@gmail.com',75,'2023-04-19',5,50,70,'arj96@gmail.com'),(193,164,'ysk33@gmail.com',0,'2023-04-20',50,500,650,'NW'),(195,166,'jill@gmail.com',75,'2023-04-19',100,1000,3000,'NW'),(196,167,'jill@gmail.com',75,'2023-04-19',10,25,85,'NW'),(197,168,'ysk33@gmail.com',0,'2023-04-20',3,25,35,'NW'),(198,169,'arj96@gmail.com',0,'2023-05-18',10,120,140,'NA'),(201,172,'test@gmail.com',0,'2023-05-26',20,120,100,'NA'),(202,173,'jill@gmail.com',0,'2023-04-18',5,80,100,'NW'),(206,178,'dv390@gmail.com',0,'2023-05-10',100,250,500,'NA'),(211,183,'dv390@gmail.com',145,'2023-04-28',15,70,110,'ysk33@gmail.com'),(212,184,'ysk33@gmail.com',100,'2023-04-28',10,30,50,'arj96@gmail.com'),(213,185,'dv390@gmail.com',100,'2023-04-28',20,100,180,'NW'),(214,186,'ysk33@gmail.com',225,'2023-04-28',15,75,100,'arj96@gmail.com'),(217,189,'dv390@gmail.com',70,'2023-04-29',10,30,60,'ysk33@gmail.com'),(219,191,'arj96@gmail.com',40,'2023-04-30',5,20,40,'ysk33@gmail.com'),(221,193,'dv390@gmail.com',250,'2023-04-30',20,150,250,'ysk33@gmail.com'),(222,194,'arj96@gmail.com',30,'2023-04-30',5,10,20,'ysk33@gmail.com'),(223,195,'ysk33@gmail.com',0,'2023-05-01',15,50,100,'NW'),(224,196,'dv390@gmail.com',0,'2023-05-01',10,10,40,'NW'),(226,199,'dc1513@gmail.com',0,'2023-05-01',10,50,100,'NW');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auto_bid`
--

LOCK TABLES `auto_bid` WRITE;
/*!40000 ALTER TABLE `auto_bid` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=435 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid`
--

LOCK TABLES `bid` WRITE;
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
INSERT INTO `bid` VALUES (74,191,'ysk33@gmail.com','2023-04-18 21:21:13',50),(77,193,'ysk33@gmail.com','2023-04-18 21:26:25',500),(80,195,'jill@gmail.com','2023-04-18 21:34:46',1000),(81,196,'jill@gmail.com','2023-04-18 21:37:13',25),(82,197,'ysk33@gmail.com','2023-04-18 21:38:36',25),(83,198,'arj96@gmail.com','2023-04-18 21:45:59',120),(85,196,'arj96@gmail.com','2023-04-18 21:47:51',35),(86,191,'arj96@gmail.com','2023-04-18 21:48:15',60),(87,191,'jill@gmail.com','2023-04-18 21:48:25',65),(88,193,'jill@gmail.com','2023-04-18 21:48:30',600),(89,197,'jill@gmail.com','2023-04-18 21:48:35',28),(94,198,'ysk33@gmail.com','2023-04-18 21:49:11',130),(95,196,'ysk33@gmail.com','2023-04-18 21:49:17',55),(99,195,'ysk33@gmail.com','2023-04-18 21:49:34',1200),(101,197,'arj96@gmail.com','2023-04-18 21:51:46',34),(103,191,'arj96@gmail.com','2023-04-18 21:52:35',75),(104,195,'arj96@gmail.com','2023-04-18 21:52:59',1300),(108,201,'test@gmail.com','2023-04-18 22:06:28',120),(109,202,'jill@gmail.com','2023-04-18 22:11:12',80),(113,206,'dv390@gmail.com','2023-04-19 18:24:25',250),(118,211,'dv390@gmail.com','2023-04-27 19:39:37',70),(119,212,'ysk33@gmail.com','2023-04-27 19:40:52',30),(120,213,'dv390@gmail.com','2023-04-27 19:41:11',100),(121,212,'dv390@gmail.com','2023-04-27 19:41:32',40),(123,214,'ysk33@gmail.com','2023-04-27 19:43:47',75),(125,211,'ysk33@gmail.com','2023-04-27 19:44:11',85),(128,213,'ysk33@gmail.com','2023-04-27 19:44:51',120),(130,201,'dv390@gmail.com','2023-04-27 19:45:56',140),(133,206,'ysk33@gmail.com','2023-04-27 19:46:04',350),(149,214,'ysk33@gmail.com','2023-04-27 19:49:57',105),(154,214,'jill@gmail.com','2023-04-27 19:57:38',120),(155,214,'ysk33@gmail.com','2023-04-27 19:57:44',135),(156,212,'jill@gmail.com','2023-04-27 19:57:50',60),(157,214,'ysk33@gmail.com','2023-04-27 19:57:54',135),(162,201,'dv390@gmail.com','2023-04-27 19:58:24',180),(166,214,'dv390@gmail.com','2023-04-27 19:59:06',150),(179,211,'ysk33@gmail.com','2023-04-27 20:01:12',115),(180,213,'ysk33@gmail.com','2023-04-27 20:01:16',160),(184,214,'ysk33@gmail.com','2023-04-27 20:01:54',165),(185,214,'arj96@gmail.com','2023-04-27 20:02:01',180),(186,214,'dv390@gmail.com','2023-04-27 20:02:03',195),(187,214,'ysk33@gmail.com','2023-04-27 20:02:04',195),(188,212,'arj96@gmail.com','2023-04-27 20:02:08',80),(189,214,'dv390@gmail.com','2023-04-27 20:02:09',210),(192,214,'arj96@gmail.com','2023-04-27 20:02:18',225),(193,206,'arj96@gmail.com','2023-04-27 20:02:24',550),(196,201,'arj96@gmail.com','2023-04-27 20:02:29',220),(200,211,'arj96@gmail.com','2023-04-27 20:02:40',130),(201,212,'dv390@gmail.com','2023-04-27 20:02:51',90),(203,217,'dv390@gmail.com','2023-04-27 20:09:42',30),(205,219,'arj96@gmail.com','2023-04-27 20:12:15',20),(207,221,'dv390@gmail.com','2023-04-27 20:12:57',150),(210,201,'dv390@gmail.com','2023-04-27 20:13:24',240),(213,219,'dv390@gmail.com','2023-04-27 20:13:49',30),(216,222,'arj96@gmail.com','2023-04-27 20:14:28',10),(220,217,'arj96@gmail.com','2023-04-27 20:14:49',50),(221,212,'arj96@gmail.com','2023-04-27 20:14:58',100),(222,221,'arj96@gmail.com','2023-04-27 20:15:02',190),(227,222,'ysk33@gmail.com','2023-04-27 20:15:31',20),(229,221,'ysk33@gmail.com','2023-04-27 20:15:34',210),(230,219,'ysk33@gmail.com','2023-04-27 20:15:39',40),(233,211,'ysk33@gmail.com','2023-04-27 20:16:04',145),(234,217,'ysk33@gmail.com','2023-04-27 20:16:14',70),(235,222,'ysk33@gmail.com','2023-04-27 20:16:28',30),(237,221,'ysk33@gmail.com','2023-04-27 20:17:05',250),(238,201,'ysk33@gmail.com','2023-04-27 20:17:10',260),(402,201,'arj96@gmail.com','2023-04-29 04:00:00',280),(403,201,'dv390@gmail.com','2023-04-29 19:17:08',300),(404,201,'arj96@gmail.com','2023-04-29 20:00:41',320),(405,223,'ysk33@gmail.com','2023-04-30 15:57:10',50),(406,224,'dv390@gmail.com','2023-04-30 15:59:27',10),(408,226,'dc1513@gmail.com','2023-04-30 18:54:03',50),(409,198,'dc1513@gmail.com','2023-04-30 19:00:38',140),(410,224,'dc1513@gmail.com','2023-04-30 04:00:00',20),(411,224,'ysk33@gmail.com','2023-04-30 19:18:31',20),(412,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(413,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(414,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(415,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(416,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(417,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(418,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(419,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(420,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(421,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(422,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(423,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(424,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(425,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(426,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(427,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(428,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(429,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(430,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(431,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(432,224,'dc1513@gmail.com','2023-04-30 04:00:00',30),(433,201,'dc1513@gmail.com','2023-04-30 04:00:00',340),(434,201,'ysk33@gmail.com','2023-04-30 19:31:19',360);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'caps'),(2,'sunglasses'),(3,'watches'),(4,'shoes'),(5,'Dion Laptop'),(6,'Tshirts');
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
INSERT INTO `customer_rep` VALUES ('custrep@buyme.com','$2b$04$g72crsjfkxyKTpwet4KXteFMWtCsprTT6paX1LWtL4MmggtEn/G0S'),('gaandmara@buyme.com','$2b$04$ZyqqxfX4V/ldVvS0pMDO7.ZWZp8C0OnQNq/KN2VaW2ZkbD8fjiIgm'),('maachuda@buyme.com','$2b$04$PaZtvlNrfwBniEbWfRafG.UDWtU8z3AkiklycyTnw2/ggFo38HbT6'),('test@buyme.com','$2b$04$Eq5MJbUjprbLFPLEPzfPP.9YWCtse6zAMZYxfSzWW3O70/SuC0jKK'),('yash@buyme.com','$2b$04$Co6jRuW3VeuNmQr/rgxQIOXJf2NGdSX1PpiDUfavtDOlXH2/T8yja');
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
INSERT INTO `end_user` VALUES ('arj96@gmail.com','$2b$04$QBeihi.Hk50g9eriAnLpXeYhsYM5KfBA3RFStgPxm.lF9YB2INSGC'),('dc1513@gmail.com','$2b$04$J7XuXGMxZORyCqsWx1xATe8WQFPVC0yyQ1o.KlEu/WH3UCQosfpNa'),('dv390@gmail.com','$2b$04$CQOzImLX4p57JJMnVOL.aemfN7W/ZaSFEkhpl48muGptRZ0oiAT.C'),('jill@gmail.com','$2b$04$CFh1PPcUn2cQQ54f6N55W.9kr5DapVAjsmC8sOtjszGeIj1iGK55K'),('test@gmail.com','$2b$04$gc.UeF6z.c5tdcbj8P4RmeWNqktE.LCzmx.PGVJNzwy9leJdp7DS.'),('test2@gmail.com','$2b$04$0tAYoZ1nUQU9cZ/IDtDC6udcJpZEk3Hxmdmd9WRCoy0XyzGdq2PD6'),('ysk33@gmail.com','$2b$04$64nwMtwbEfzTZGRErxAE2udMLYMoMf0NFVn55pOFGzsoA.i6WU4q2');
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
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (162,'caps','red','sports','ferrari','456'),(163,'sunglasses','black','casual','jimmy choo','Cove Square'),(164,'watches','black','smartwatch','apple','series 8'),(165,'sunglasses','blue','basual','ray-ban','4387'),(166,'watches','gold blue','business','rolex','submariner'),(167,'caps','black','sports','Nike','legacy91'),(168,'caps','black','bucket hat','puma','core'),(169,'watches','band','fitband','xiaomi','55'),(170,'watches','blue','casual','tommy-hilfiger','tw001513'),(171,'shoes','blue','sneakers','nike','jordans'),(172,'shoes','black','high-tops','converse','786'),(173,'shoes','blue','casual','nike','76-uy'),(174,'caps','black','regular','ua','blitzing'),(175,'shoes','black','slipons','vans','offthewall'),(176,'sunglasses','green','aviator','rayban','shooter'),(177,'sunglasses','green','aviator','rayban','shooters'),(178,'watches','blue','chrono','rolex','oyster'),(179,'watches','white','steelstrap','seiko','automatic'),(180,'caps','black','regular','puma','stylight'),(181,'watches','white','chrono','fossil','neutra'),(182,'watches','yellow','digital','timex','t80'),(183,'shoes','white','sneakers','nIke','killshot'),(184,'watches','black','calculator watch','casio','2345'),(185,'shoes','white','sneakers','nIke','blazers'),(186,'shoes','red','ugly shoes','Vans','GTX'),(187,'shoes','blue','superstars','adidas','marge'),(188,'sunglasses','blue','lightweight','barton','modular'),(189,'caps','white','sports','puma','black cat'),(190,'caps','black','baseball','moma','yankees'),(191,'caps','red','Kids cap','Marvel','123'),(192,'watches','orange','smart','apple','series8'),(193,'watches','blue','leather','fossil','copeland'),(194,'sunglasses','yellow','funny glasses','Shein','ytr12'),(195,'caps','black','wool','fm','gatsby'),(196,'sunglasses','red','kids','holland','speedcraft'),(197,'watches','black','smartwatch','omron','heartguide'),(199,'caps','blue','regular','vice','golf');
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
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemImages`
--

LOCK TABLES `itemImages` WRITE;
/*!40000 ALTER TABLE `itemImages` DISABLE KEYS */;
INSERT INTO `itemImages` VALUES (74,162,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681852873034.jpg'),(75,163,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681852883968.webp'),(76,164,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681853184835.jfif'),(77,165,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681853186560.jpg'),(78,165,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681853186560.jpg'),(79,165,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681853186560.jpg'),(80,166,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681853686294.webp'),(81,167,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681853833271.webp'),(82,168,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681853916288.webp'),(83,169,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681854358475.jpg'),(84,170,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681854403625.jpeg'),(85,171,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681855179125.webp'),(86,172,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681855588421.jpg'),(87,173,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681855871972.webp'),(88,174,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681927828776.jpg'),(89,175,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681928022363.jpg'),(90,177,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681928545165.jpeg'),(91,178,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681928665178.webp'),(92,179,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681928717562.jpeg'),(93,180,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681928982841.webp'),(94,181,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681929226122.webp'),(95,182,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1681929337465.webp'),(96,183,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682624376677.jpeg'),(97,184,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682624451829.webp'),(98,185,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682624470693.webp'),(99,186,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682624626827.jpeg'),(100,187,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682624646590.jpg'),(101,188,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682624869828.webp'),(102,189,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682626182009.jpeg'),(103,190,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682626192863.webp'),(104,191,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682626335039.jpg'),(105,192,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682626370413.jfif'),(106,193,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682626377181.jpeg'),(107,194,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682626467787.webp'),(108,195,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682870229673.jpg'),(109,196,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682870366676.jpg'),(111,199,'/Users/anirudhjakati/Desktop/Spring_2023/dbds-project/public/uploads/resized-multi-files-1682880843173.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (5,'ysk33@gmail.com','Can I use BuyMe to buy and sell internationally?\n'),(6,'ysk33@gmail.com','How do I set up automatic bidding on an auction listing?\n'),(7,'ysk33@gmail.com','What is eBay\'s policy on intellectual property infringement?\n'),(10,'ysk33@gmail.com','How do I track my order?'),(11,'arj96@gmail.com','How to create an auction'),(19,'dv390@gmail.com','How many items can I add to the watchlist?'),(20,'dv390@gmail.com','Can the watchlist send us personal notifications via email/text?'),(21,'arj96@gmail.com','Can I use the watchlist to automatically bid on a product as soon as it is available?');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
INSERT INTO `watchlist` VALUES (7,'arj96@gmail.com','caps','black','puma'),(15,'ysk33@gmail.com','wristwatch','black','xiaomi');
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

-- Dump completed on 2023-04-30 20:22:15
