<?php
// Database configuration for Regis Innovation Center Website
class Database {
    private $host = 'localhost';
    private $database = 'regis_innovation_center';
    private $username = 'root';
    private $password = '';
    private $charset = 'utf8mb4';
    private $pdo;
    
    public function __construct() {
        $this->connect();
    }
    
    private function connect() {
        $dsn = "mysql:host={$this->host};dbname={$this->database};charset={$this->charset}";
        
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        try {
            $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
        } catch (PDOException $e) {
            // In production, log the error instead of displaying it
            error_log("Database connection failed: " . $e->getMessage());
            throw new PDOException("Database connection failed");
        }
    }
    
    public function query($sql, $params = []) {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            error_log("Database query failed: " . $e->getMessage());
            throw new PDOException("Database query failed");
        }
    }
    
    public function fetch($sql, $params = []) {
        return $this->query($sql, $params)->fetch();
    }
    
    public function fetchAll($sql, $params = []) {
        return $this->query($sql, $params)->fetchAll();
    }
    
    public function lastInsertId() {
        return $this->pdo->lastInsertId();
    }
    
    public function beginTransaction() {
        return $this->pdo->beginTransaction();
    }
    
    public function commit() {
        return $this->pdo->commit();
    }
    
    public function rollback() {
        return $this->pdo->rollback();
    }
}

// Database initialization script (run once to create tables)
function initializeDatabase() {
    $db = new Database();
    
    // Create events table
    $eventsTable = "
        CREATE TABLE IF NOT EXISTS events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            date DATE NOT NULL,
            time VARCHAR(50),
            location VARCHAR(255),
            category VARCHAR(50),
            featured BOOLEAN DEFAULT FALSE,
            registration_url VARCHAR(500),
            image VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ";
    
    // Create contact_submissions table
    $contactTable = "
        CREATE TABLE IF NOT EXISTS contact_submissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            ip_address VARCHAR(45),
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ";
    
    // Create programs table
    $programsTable = "
        CREATE TABLE IF NOT EXISTS programs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            icon VARCHAR(255),
            duration VARCHAR(100),
            capacity INT,
            status ENUM('active', 'inactive', 'coming_soon') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ";
    
    // Create news/blog table
    $newsTable = "
        CREATE TABLE IF NOT EXISTS news (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            excerpt TEXT,
            author VARCHAR(255),
            featured_image VARCHAR(255),
            published BOOLEAN DEFAULT FALSE,
            published_at TIMESTAMP NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ";
    
    try {
        $db->query($eventsTable);
        $db->query($contactTable);
        $db->query($programsTable);
        $db->query($newsTable);
        
        echo "Database tables created successfully!";
        
        // Insert sample data
        insertSampleData($db);
        
    } catch (Exception $e) {
        echo "Error creating database tables: " . $e->getMessage();
    }
}

function insertSampleData($db) {
    // Sample events
    $sampleEvents = [
        [
            'title' => 'Innovation Showcase',
            'description' => 'Annual showcase of student and startup innovations with investor presentations.',
            'date' => date('Y-m-d', strtotime('+1 week')),
            'time' => '6:00 PM - 9:00 PM',
            'location' => 'Innovation Center Main Hall',
            'category' => 'showcase',
            'featured' => 1
        ],
        [
            'title' => 'Entrepreneurship Workshop: Business Model Canvas',
            'description' => 'Learn how to create and validate your business model with industry experts.',
            'date' => date('Y-m-d', strtotime('+2 weeks')),
            'time' => '2:00 PM - 5:00 PM',
            'location' => 'Workshop Room A',
            'category' => 'workshop',
            'featured' => 0
        ]
    ];
    
    foreach ($sampleEvents as $event) {
        $sql = "INSERT INTO events (title, description, date, time, location, category, featured) 
                VALUES (:title, :description, :date, :time, :location, :category, :featured)";
        $db->query($sql, $event);
    }
    
    // Sample programs
    $samplePrograms = [
        [
            'title' => 'Innovation Incubator',
            'description' => '12-week intensive program for early-stage startups with mentorship, funding, and workspace access.',
            'icon' => 'assets/images/icon-incubator.svg',
            'duration' => '12 weeks',
            'capacity' => 20
        ],
        [
            'title' => 'Skills Workshops',
            'description' => 'Regular workshops on entrepreneurship, design thinking, technology, and business development.',
            'icon' => 'assets/images/icon-workshops.svg',
            'duration' => 'Ongoing',
            'capacity' => 50
        ]
    ];
    
    foreach ($samplePrograms as $program) {
        $sql = "INSERT INTO programs (title, description, icon, duration, capacity) 
                VALUES (:title, :description, :icon, :duration, :capacity)";
        $db->query($sql, $program);
    }
}

// Uncomment the line below to initialize the database (run once)
// initializeDatabase();
?>