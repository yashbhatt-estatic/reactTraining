-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2022 at 05:48 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `training`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `company` varchar(255) NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `username`, `password`, `phone_number`, `company`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'vishal', 'dolera', 'vishal.dolera@estatic-infotech.com', 'vishal.dolera', '$2a$10$C/LIzJk.VJTw0yMhKHm8ou2XHFYnu4EGNXLVZk1XqUsdGVx8SS1Fq', 1231325, 'theOne', 0, '2022-02-18 13:13:27', '2022-02-18 13:13:27'),
(2, 'yash', 'bhatt', 'yash.bhatt@estatic-infotech.com', 'yash.bhatt', '$2a$10$TpkkQhXYomZHyN847nDz/ep/ZglGC4.qKUW2Yv/oOhUPbrgQAEQrK', 987654321, 'theOne', 0, '2022-02-18 13:13:43', '2022-02-18 13:13:43'),
(3, 'akshar', 'contractor', 'akshar.contractor@estatic-infotech.com', 'akshar.contractor', '$2a$10$05aBs4H7I50Azp3.wfD3Y.cTP4L8qL8qBrRbZNWiWCS8WoIvYHUkO', 76454321, 'theOne', 0, '2022-02-18 13:16:41', '2022-02-18 13:16:41'),
(4, 'tejas', 'tajpara', 'tejas.tajpara@estatic-infotech.com', 'tejas.tajpara', '$2a$10$D4xOqyIX0x56ex9ltzQPGOk7SI8.uWzarR1ey5xK.G1jBAawqU6Na', 92454321, 'theOne', 0, '2022-02-18 13:17:23', '2022-02-18 13:17:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
