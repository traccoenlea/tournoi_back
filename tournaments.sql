-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 08 juin 2023 à 09:01
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tournaments`
--

-- --------------------------------------------------------

--
-- Structure de la table `eliminations`
--

CREATE TABLE `eliminations` (
  `id_elim` int(11) NOT NULL,
  `place_elim` int(11) NOT NULL,
  `id_tour` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `elim_part`
--

CREATE TABLE `elim_part` (
  `id_elim` int(11) NOT NULL,
  `id_part` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `participants`
--

CREATE TABLE `participants` (
  `id_part` int(11) NOT NULL,
  `name_part` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `poules`
--

CREATE TABLE `poules` (
  `id_poule` int(11) NOT NULL,
  `id_tour` int(11) NOT NULL,
  `place` int(11) NOT NULL,
  `id_part` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tournaments`
--

CREATE TABLE `tournaments` (
  `id_tour` int(11) NOT NULL,
  `name_tour` varchar(255) NOT NULL,
  `number_tour` int(11) DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tour_part`
--

CREATE TABLE `tour_part` (
  `id_part` int(11) NOT NULL,
  `id_tour` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `types`
--

CREATE TABLE `types` (
  `id_type` int(11) NOT NULL,
  `name_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `types`
--

INSERT INTO `types` (`id_type`, `name_type`) VALUES
(1, 'Eliminations Directes'),
(2, 'Poules');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(255) NOT NULL,
  `email_user` varchar(255) NOT NULL,
  `password_user` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `eliminations`
--
ALTER TABLE `eliminations`
  ADD PRIMARY KEY (`id_elim`),
  ADD KEY `eliminations_tournaments_FK` (`id_tour`);

--
-- Index pour la table `elim_part`
--
ALTER TABLE `elim_part`
  ADD PRIMARY KEY (`id_elim`,`id_part`),
  ADD KEY `elim_part_participants0_FK` (`id_part`);

--
-- Index pour la table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id_part`);

--
-- Index pour la table `poules`
--
ALTER TABLE `poules`
  ADD PRIMARY KEY (`id_poule`),
  ADD KEY `poules_tournaments_FK` (`id_tour`),
  ADD KEY `id_poule` (`id_poule`);

--
-- Index pour la table `tournaments`
--
ALTER TABLE `tournaments`
  ADD PRIMARY KEY (`id_tour`),
  ADD KEY `tournaments_users_FK` (`id_user`),
  ADD KEY `tournaments_types0_FK` (`id_type`);

--
-- Index pour la table `tour_part`
--
ALTER TABLE `tour_part`
  ADD PRIMARY KEY (`id_part`,`id_tour`),
  ADD KEY `tour_part_tournaments0_FK` (`id_tour`);

--
-- Index pour la table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id_type`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `eliminations`
--
ALTER TABLE `eliminations`
  MODIFY `id_elim` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `participants`
--
ALTER TABLE `participants`
  MODIFY `id_part` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT pour la table `poules`
--
ALTER TABLE `poules`
  MODIFY `id_poule` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `id_tour` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `types`
--
ALTER TABLE `types`
  MODIFY `id_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `eliminations`
--
ALTER TABLE `eliminations`
  ADD CONSTRAINT `eliminations_tournaments_FK` FOREIGN KEY (`id_tour`) REFERENCES `tournaments` (`id_tour`);

--
-- Contraintes pour la table `elim_part`
--
ALTER TABLE `elim_part`
  ADD CONSTRAINT `elim_part_eliminations_FK` FOREIGN KEY (`id_elim`) REFERENCES `eliminations` (`id_elim`),
  ADD CONSTRAINT `elim_part_participants0_FK` FOREIGN KEY (`id_part`) REFERENCES `participants` (`id_part`);

--
-- Contraintes pour la table `poules`
--
ALTER TABLE `poules`
  ADD CONSTRAINT `poules_tournaments_FK` FOREIGN KEY (`id_tour`) REFERENCES `tournaments` (`id_tour`);

--
-- Contraintes pour la table `tournaments`
--
ALTER TABLE `tournaments`
  ADD CONSTRAINT `tournaments_types0_FK` FOREIGN KEY (`id_type`) REFERENCES `types` (`id_type`),
  ADD CONSTRAINT `tournaments_users_FK` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Contraintes pour la table `tour_part`
--
ALTER TABLE `tour_part`
  ADD CONSTRAINT `tour_part_participants_FK` FOREIGN KEY (`id_part`) REFERENCES `participants` (`id_part`),
  ADD CONSTRAINT `tour_part_tournaments0_FK` FOREIGN KEY (`id_tour`) REFERENCES `tournaments` (`id_tour`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
