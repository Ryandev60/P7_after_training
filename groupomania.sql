-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 16 fév. 2022 à 11:47
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.1




SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--
CREATE DATABASE /*!32312 IF NOT EXISTS*/ `groupomania` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `groupomania`;
-- --------------------------------------------------------
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `likes`;
DROP TABLE IF EXISTS `posts`;
DROP TABLE IF EXISTS `users`;
--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `content` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`content`, `id`, `userId`, `postId`, `createdAt`, `updatedAt`) VALUES
('Merci ! Très bonne idée j\'espère que cela nous permettra d\'avoir une meilleure ambiance !  ', 51, 41, 33, '2022-02-15 20:35:08', '2022-02-15 20:35:08'),
('En effet, merci :)', 52, 34, 33, '2022-02-15 20:37:34', '2022-02-15 20:37:34'),
('En effet oui !', 53, 34, 34, '2022-02-15 20:39:07', '2022-02-15 20:39:07'),
('Pourquoi pas oui, allons au Del Martae !', 60, 28, 42, '2022-02-15 20:53:42', '2022-02-15 20:53:42'),
('Let\'s go !', 62, 28, 38, '2022-02-15 20:56:26', '2022-02-15 20:56:26'),
('dddd', 66, 28, 34, '2022-02-15 21:08:36', '2022-02-15 21:08:36'),
('Pas de soucis, merci de nous prévenir à l\'avance :)', 73, 36, 46, '2022-02-16 10:36:12', '2022-02-16 10:36:12');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `userId`, `postId`, `createdAt`, `updatedAt`) VALUES
(332, 41, 33, '2022-02-15 20:36:37', '2022-02-15 20:36:37'),
(336, 34, 33, '2022-02-15 20:38:55', '2022-02-15 20:38:55'),
(338, 34, 34, '2022-02-15 20:39:09', '2022-02-15 20:39:09'),
(386, 36, 33, '2022-02-15 20:47:04', '2022-02-15 20:47:04'),
(391, 36, 38, '2022-02-15 20:48:03', '2022-02-15 20:48:03'),
(395, 36, 34, '2022-02-15 20:48:07', '2022-02-15 20:48:07'),
(396, 36, 42, '2022-02-15 20:49:42', '2022-02-15 20:49:42'),
(411, 28, 33, '2022-02-15 21:04:46', '2022-02-15 21:04:46'),
(483, 28, 42, '2022-02-16 10:33:15', '2022-02-16 10:33:15'),
(488, 36, 46, '2022-02-16 10:36:51', '2022-02-16 10:36:51');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `postContent` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`postContent`, `id`, `userId`, `attachment`, `createdAt`, `updatedAt`) VALUES
('Bienvenue à tous sur le nouveau réseau social de Groupomania ! Je serai le modérateur du site, profitez bien !', 33, 28, 'http://localhost:5000/images/minion.gif1644957182050.undefined', '2022-02-15 20:33:02', '2022-02-15 20:33:02'),
('Du soleil pour venir nous motivé aujourd\'hui ! Vivement les barbecues entre collègues !', 34, 41, 'http://localhost:5000/images/bonheur.jpg1644957373431.jpg', '2022-02-15 20:36:13', '2022-02-15 20:36:13'),
('Quelle belle année 2021 nous avons passé ! 2022 Sera au moins aussi bien j\'espère ! Les statistiques ne font que monter en tout cas', 38, 34, NULL, '2022-02-15 20:38:51', '2022-02-15 20:38:51'),
('Hey, qui voudrait d\'un restaurant demain midi ? ', 42, 36, NULL, '2022-02-15 20:49:36', '2022-02-15 20:49:36'),
('Bonjour à tous ! Le rendez-vous du vendredi 18 février est décaler au lundi 21 février pour que l\'on puisse avoir le recul de cette semaine est mieux préparer le rendez-vous, merci à tous !', 46, 28, NULL, '2022-02-16 10:35:15', '2022-02-16 10:35:15');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `admin` tinyint(1) DEFAULT 0,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `admin`, `email`, `password`, `firstName`, `lastName`, `avatar`, `createdAt`, `updatedAt`) VALUES
(28, 1, 'admin@mail.com', '$2b$10$CN1xcgUJAoe.YtYfIN3stOcrKu9FVhLIy5OyIYWPd9NNFzRS0X6Du', 'Arnaud', 'Dupont', 'http://localhost:5000/images/h1.jpg1644955794553.jpg', '2022-02-15 12:24:43', '2022-02-15 20:10:21'),
(34, 0, 'jerome@free.com', '$2b$10$vAixSGUFD.oeg5t/H2WlHe1XJLTZMUmi59m/30BTSlDRLflDV57vC', 'Jerome', 'Durand', 'http://localhost:5000/images/h2.jpg1644955960028.jpg', '2022-02-15 20:11:05', '2022-02-15 20:12:40'),
(35, 0, 'xavier60@gmail.com', '$2b$10$ykgppZUU64ITqLxlcBpTieHoZxZKR3dBa/so2.s13s7/fqNIhdoFi', 'Xavier', 'Bady', 'http://localhost:5000/images/h3.jpg1644956195644.jpg', '2022-02-15 20:16:09', '2022-02-15 20:16:35'),
(36, 0, 'chrisbulan77@mail.com', '$2b$10$6T0Qg8K889x5ithcUm3lA.v6Vrl.iGVr3G37bpP3T3Q0DLuZe/pMu', 'Christophe', 'Bulan', 'http://localhost:5000/images/h4.jpg1644956282209.jpg', '2022-02-15 20:17:38', '2022-02-15 20:18:02'),
(38, 0, 'elana@groupomania.com', '$2b$10$k8KFxws61DXTf0bilrhUFurf1xbnxEPxqbTx50niJ.oZ7so16unOy', 'Elana', 'Dumange', 'http://localhost:5000/images/f1.jpg1644956541562.jpg', '2022-02-15 20:21:35', '2022-02-15 20:22:21'),
(40, 0, 'leanamany@mail.com', '$2b$10$fDs1A93B8KIYjaA/Roo.hujM702XowG8Y7HiTmKzJXjF7qrYEIuwm', 'Leana', 'Many', 'http://localhost:5000/images/f3.jpg1644956710595.jpg', '2022-02-15 20:24:35', '2022-02-15 20:25:10'),
(41, 0, 'marydupont@mail.fr', '$2b$10$CrfaQy7Y2zcZ6zub1PdUKOaLsFsuYarm6npv7SLE6AfWtxN9kWMSe', 'Mary', 'Dupont', 'http://localhost:5000/images/f4.jpg1644956812984.jpg', '2022-02-15 20:26:14', '2022-02-15 20:26:52');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `postId` (`postId`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `postId` (`postId`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=496;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;