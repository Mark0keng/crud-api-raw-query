-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2024 at 09:38 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dummy_college_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lecturer_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `lecturer_id`, `created_at`, `updated_at`) VALUES
(2, 'database-2', NULL, '2024-01-31 06:43:50', '2024-01-31 06:43:50'),
(3, 'web programming', 0, '2024-01-31 06:58:57', '2024-01-31 06:58:57'),
(4, 'web programming-2', 0, '2024-01-31 07:00:57', '2024-01-31 07:00:57'),
(5, 'web programming-3', 0, '2024-01-31 07:03:28', '2024-01-31 07:03:28'),
(6, 'web programming-4', NULL, '2024-01-31 07:06:42', '2024-01-31 07:06:42'),
(7, 'Web Programming', 4, '2024-01-31 09:13:18', '2024-01-31 09:13:18'),
(8, 'Mobile Dev', 4, '2024-01-31 09:13:42', '2024-01-31 09:13:42'),
(9, 'Cloud Computing', 4, '2024-01-31 09:13:50', '2024-01-31 09:13:50'),
(10, 'Kimia', NULL, '2024-01-31 16:00:20', '2024-01-31 16:00:20'),
(11, 'Bahasa', NULL, '2024-01-31 16:05:25', '2024-01-31 16:05:25'),
(12, 'English 101', 3, '2024-01-31 16:06:15', '2024-01-31 16:06:15');

-- --------------------------------------------------------

--
-- Table structure for table `lecturer`
--

CREATE TABLE `lecturer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lecturer`
--

INSERT INTO `lecturer` (`id`, `name`, `created_at`, `updated_at`) VALUES
(3, 'eko show', '2024-01-31 09:12:23', '2024-01-31 15:57:07'),
(4, 'Setio', '2024-01-31 09:12:34', '2024-01-31 09:12:34'),
(5, 'Esti', '2024-01-31 15:56:11', '2024-01-31 15:56:11');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `major` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `major`, `created_at`, `updated_at`) VALUES
(2, 'Joko', 'Biologi', '2024-01-31 06:23:05', '2024-01-31 15:41:20'),
(3, 'arkan', 'Informatika', '2024-01-31 06:23:13', '2024-01-31 06:23:13'),
(4, 'hilman', 'informatika', '2024-01-31 14:04:08', '2024-01-31 14:04:08'),
(5, 'lutfi', 'informatika', '2024-01-31 14:04:17', '2024-01-31 14:04:17'),
(6, 'arden', 'informatika', '2024-01-31 14:04:24', '2024-01-31 14:04:24'),
(7, 'seno', 'informatika', '2024-01-31 14:04:30', '2024-01-31 14:04:30'),
(8, 'Jerome', 'Sejarah', '2024-01-31 15:33:25', '2024-01-31 15:33:25'),
(9, 'Denis', 'Fisika', '2024-01-31 15:35:29', '2024-01-31 15:35:29');

-- --------------------------------------------------------

--
-- Table structure for table `student_course`
--

CREATE TABLE `student_course` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_course`
--

INSERT INTO `student_course` (`id`, `student_id`, `course_id`) VALUES
(2, 2, 7),
(3, 3, 7),
(4, 4, 7),
(5, 5, 8),
(6, 6, 8),
(7, 7, 8),
(9, 2, 8),
(10, 2, 9),
(11, 3, 9),
(12, 7, 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lecturer`
--
ALTER TABLE `lecturer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_course`
--
ALTER TABLE `student_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `course_id` (`course_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `lecturer`
--
ALTER TABLE `lecturer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `student_course`
--
ALTER TABLE `student_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `student_course`
--
ALTER TABLE `student_course`
  ADD CONSTRAINT `student_course_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `student_course_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
