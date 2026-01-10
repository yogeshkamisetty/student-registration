Below is a **professional, industry-style README.md** for your GitHub repository.This is written so recruiters, teachers, and evaluators immediately understand what you built.

You can copy-paste this directly as README.md.

**Student Registration System (Full-Stack Web App)**
====================================================

A full-stack Student Registration System built using **HTML, JavaScript, Node.js, Express, and MySQL**, featuring a real-time **Admin Dashboard** to monitor, search, delete, and export student records.

This project demonstrates a complete **Client → Server → Database** architecture used in real-world web applications.

**Features**
------------

### Student Panel

*   Student registration form
    
*   Data validation on the client
    
*   Data sent using REST APIs
    
*   Records stored permanently in MySQL
    

### Admin Panel

*   Live student list from database
    
*   Auto-refresh (real-time view)
    
*   Search by name, email, or roll number
    
*   Delete student records
    
*   Export database to Excel (CSV)
    
*   Total student counter
    

**Tech Stack**
--------------

LayerTechnologyFrontendHTML, CSS, JavaScriptBackendNode.js, ExpressDatabaseMySQLData FormatJSONAPI TypeREST API

**System Architecture**
-----------------------
   Student Page (HTML)        
   ↓
   JavaScript (fetch API)   
   ↓
   Node.js + Express Server    
   ↓
   MySQL Database    
   ↑
   Admin Panel (HTML + JS)

**Project Structure**
---------------------
student/
│
├── server.js  
├── package.json  
├── node_modules/  
    └── public/       
        ├── index.html   (Student Registration Page)       
        └── admin.html   (Admin Dashboard)

**Database Structure**
----------------------
students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    roll VARCHAR(50),
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    father_name VARCHAR(100),
    dob VARCHAR(20),
    mobile VARCHAR(20),
    email VARCHAR(100),
    gender VARCHAR(10),
    department VARCHAR(100),
    course VARCHAR(100),
    city VARCHAR(50),
    address TEXT
)

**API Endpoints**
-----------------

MethodEndpointDescriptionPOST/registerAdd new studentGET/usersGet all studentsDELETE/delete/:idDelete student by ID

**How to Run Locally**
----------------------

### 1\. Install Dependencies
 npm install 

### 2\. Start MySQL and create database

 CREATE DATABASE studentdb;  USE studentdb;  -- Create students table (see above)

### 3\. Start Server
  node server.js 

### 4\. Open in Browser
 http://localhost:3000        → Student Page  http://localhost:3000/admin.html  → Admin Panel 

**What This Project Demonstrates**
----------------------------------

*   REST API design
    
*   Database integration with Node.js
    
*   Client-server communication using fetch
    
*   Live admin dashboard
    
*   CRUD operations (Create, Read, Delete)
    
*   Real-world full-stack architecture
    

**Future Enhancements**
-----------------------

*   Login system for Admin
    
*   Update student records
    
*   Pagination for large datasets
    
*   Cloud deployment
    

**Author**
----------

Built by **Yogesh Kamisetty,**B.Tech (CSE).
