CREATE DATABASE tictactoe CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'tictactoe'@'localhost' identified by 'tictactoe';
GRANT ALL on *.* to 'tictactoe'@'localhost';
