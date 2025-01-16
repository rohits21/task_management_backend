CREATE DATABASE `tasksmanagementdb`;

use `tasksmanagementdb`;

CREATE TABLE `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,                 
  `title` VARCHAR(255) NOT NULL,                       
  `description` TEXT NOT NULL,                         
  `status` ENUM('Pending', 'In Progress', 'Completed') 
    NOT NULL DEFAULT 'Pending',
  `priority` ENUM('Low', 'Medium', 'High')             
    NOT NULL,
  `creationDate` DATETIME DEFAULT CURRENT_TIMESTAMP,   
  `updatedOn` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
) 