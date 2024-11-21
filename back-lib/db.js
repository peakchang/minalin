import mysql, {} from "mysql2"
import dotenv from "dotenv"
dotenv.config();


export const sql_con = mysql.createConnection({
    host: process.env.HOST || '127.0.0.1',
    user: 'root',
    password: process.env.DBPWD,
    database: process.env.SHEMA
})


/*

CREATE DATABASE minalin default CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS base_data(
    config VARCHAR(10),
    main_image_list TEXT,
    detail_image_list TEXT
);

CREATE TABLE IF NOT EXISTS reserve_manage(
    rm_id INT AUTO_INCREMENT PRIMARY KEY,
    rm_month VARCHAR(10) NOT NULL,
    rm_json_data TEXT
);

CREATE TABLE IF NOT EXISTS board(
    rm_id INT AUTO_INCREMENT PRIMARY KEY,
    rm_month VARCHAR(10) NOT NULL,
    rm_json_data TEXT
);
*/