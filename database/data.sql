-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: artexplorer
-- ------------------------------------------------------
-- Server version	5.5.5-10.10.2-MariaDB-1:10.10.2+maria~ubu2204

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
-- Table structure for table `art`
--

DROP TABLE IF EXISTS `art`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `art` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `art`
--

LOCK TABLES `art` WRITE;
/*!40000 ALTER TABLE `art` DISABLE KEYS */;
INSERT INTO `art` VALUES (1,'Prajnaparamita'),(2,'Poignard à tête de lion'),(3,'Pieds de trône'),(4,'Tambour de pluie'),(5,'Paire de daims affrontés'),(6,'Homme habillé');
/*!40000 ALTER TABLE `art` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `default_answer`
--

DROP TABLE IF EXISTS `default_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `default_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `default_answer`
--

LOCK TABLES `default_answer` WRITE;
/*!40000 ALTER TABLE `default_answer` DISABLE KEYS */;
INSERT INTO `default_answer` VALUES (1,'Bonjour, je suis [NOM] et je vais vous accompagner dans votre visite du Musée des Arts Asiatiques de Nice, enchanté'),(2,'Bienvenue dans cet espace interactif, vous allez pouvoir visiter le musée tout en vous amusant amusant !'),(3,'Je vais vous posez une série de question qui vous mènera à une oeuvre.'),(4,'Pour me montrer que vous avez bien trouvé la bonne oeuvre vous devrez prendre une photo afin que je puisse vérifier');
/*!40000 ALTER TABLE `default_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enigma`
--

DROP TABLE IF EXISTS `enigma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enigma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` longtext DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `art_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `enigma_art_id_fk` (`art_id`),
  CONSTRAINT `enigma_art_id_fk` FOREIGN KEY (`art_id`) REFERENCES `art` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enigma`
--

LOCK TABLES `enigma` WRITE;
/*!40000 ALTER TABLE `enigma` DISABLE KEYS */;
INSERT INTO `enigma` VALUES (1,'Prajnaparamita',1,1),(2,'Poignard à tête de lion',2,2),(3,'Pieds de trône',3,3),(4,'Tambour de pluie',4,4),(5,'Paire de daims affrontés',5,5),(6,'Homme habillé',6,6);
/*!40000 ALTER TABLE `enigma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` longtext DEFAULT NULL,
  `id_enigma` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `question_enigma_id_fk` (`id_enigma`),
  CONSTRAINT `question_enigma_id_fk` FOREIGN KEY (`id_enigma`) REFERENCES `enigma` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'Suis-je une divinité, un humain, un animal ou un objet?',1),(2,'De quel vêtement suis-je vêtu?',1),(3,'Combien de bras ai-je?',1),(4,'De quel matériau suis-je composé?',2),(5,'Que puis-je représenter ?',2),(6,'Quelle est ma fonction principale?',2),(7,'Je représente une partie du corps d’un oiseau, de quel oiseau s’agit-il?',3),(8,'Combien sommes-nous?',3),(9,'Qui soutenons-nous?',3),(10,'Quels animaux sont disposés sur moi?',4),(11,'Lors de quels événements suis-je utilisé?',4),(12,'Qu’est-ce que je représente dans mon village?',4),(13,'De qui suis-je le disciple?',5),(14,'Dans quel pays ai-je vécu?',5),(15,'Qu’est-ce que j’encadrais?',5),(16,'De quoi suis-je vêtu?',6),(17,'De quelle période est-ce que je date?',6),(18,'Quelles parties de mon corps je ne possède plus?',6);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_question` int(11) NOT NULL,
  `text` longtext DEFAULT NULL,
  `valid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `answer_question_id_fk` (`id_question`),
  CONSTRAINT `answer_question_id_fk` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` VALUES (1,1,'Animal',0),(2,1,'Divinité',1),(3,1,'Humain',0),(4,1,'Objet',0),(5,2,'jupe',1),(6,2,'Pantalon',0),(7,2,'Robe',0),(8,2,'Tunique',0),(9,3,'Onze',0),(10,3,'Vingt-deux',1),(11,3,'Quarante-deux',0),(12,3,'Mille',0),(13,4,'Bois',0),(14,4,'Fer',0),(15,4,'Fonte',0),(16,4,'Pierres précieuses',1),(17,5,'Une distinction royal',0),(18,5,'Une marque de richesse',1),(19,5,'Un objet de forgeron',0),(20,5,'Un objet de paysan',0),(21,6,'Combat à distance',0),(22,6,'Combat rapproché',1),(23,6,'Défense',0),(24,6,'Immortalité',0),(25,7,'Aigle impériale',0),(26,7,'Corbeau',0),(27,7,'Faucon pélerin',0),(28,7,'Oiseau de proie',1),(33,8,'Un',0),(34,8,'Deux',0),(35,8,'Quatre',1),(36,8,'Six',0),(37,9,'Le roi',1),(38,9,'Le monde',0),(39,9,'Le pays',0),(40,9,'Le village',0),(41,10,'Chiens et Chats',0),(42,10,'Chevaux et Souris',0),(43,10,'Grenouilles et Éléphants',1),(44,10,'Lions et Tigres',0),(45,11,'Banquet royal',0),(46,11,'Cérémonie religieuse',0),(47,11,'Fêtes au village',0),(48,11,'Rites agricoles',1),(49,12,'Un signe d’abondance et de prospérité',0),(50,12,'Un signe de pauvreté et de mort',0),(51,12,'Un signe de richesse et de puissance',1),(52,12,'Un signe religieux et de puissance',0),(53,13,'Bouddha',1),(54,13,'Kannon',0),(55,13,'Shiva',0),(56,13,'Zôchôten',0),(57,14,'Corée',0),(58,14,'Japon',0),(59,14,'Thaïlande',0),(60,14,'Tibet',1),(61,15,'Une divinité',0),(62,15,'Un palais',0),(63,15,'Une porte',0),(64,15,'Une roue de la Loi',1),(65,16,'jupe',0),(66,16,'Pantalon',0),(67,16,'Robe',0),(68,16,'Tunique',1),(69,17,'Dynastie des Han de l’Ouest',1),(70,17,'Dynastie des Zhou de l’Ouest',0),(71,17,'Époque d’Edo',0),(72,17,'Époque de Muromachi',0),(73,18,'Mes bras',1),(74,18,'Mes jambes',0),(75,18,'Mes mains',0),(76,18,'Mes oreilles',0);
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `pin` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `step` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tips`
--

DROP TABLE IF EXISTS `tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` longtext DEFAULT NULL,
  `enigma_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tips_enigma_id_fk` (`enigma_id`),
  CONSTRAINT `tips_enigma_id_fk` FOREIGN KEY (`enigma_id`) REFERENCES `enigma` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tips`
--

LOCK TABLES `tips` WRITE;
/*!40000 ALTER TABLE `tips` DISABLE KEYS */;
INSERT INTO `tips` VALUES (1,'Je suis une personnification de la Sagesse',1),(2,'Je vient du Cambodge',1),(3,'Je possède une tête d\'animal',2),(4,'Je vient d\'Inde',2),(5,'Je suis fais d\'ivoire',3),(6,'Je viens d\'Inde',3),(7,'Je suis un instrument de musique',4),(8,'Je vient du Laos',4),(9,'Je me trouvais autrefois sur des montagnes',5),(10,'Je suis une status en cuivre',5),(11,'Je suis un objet funéraire',6),(12,'Je fut découvert en Chine',6);
/*!40000 ALTER TABLE `tips` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-12 15:02:37
