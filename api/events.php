<?php
// Events API for Regis Innovation Center Website
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Sample events data (in production, this would come from a database)
$events = [
    [
        'id' => 1,
        'title' => 'Innovation Showcase',
        'description' => 'Annual showcase of student and startup innovations with investor presentations.',
        'date' => date('Y-m-d', strtotime('+1 week')),
        'time' => '6:00 PM - 9:00 PM',
        'location' => 'Innovation Center Main Hall',
        'category' => 'showcase',
        'featured' => true,
        'registration_url' => '#',
        'image' => 'assets/images/event-showcase.jpg'
    ],
    [
        'id' => 2,
        'title' => 'Entrepreneurship Workshop: Business Model Canvas',
        'description' => 'Learn how to create and validate your business model with industry experts.',
        'date' => date('Y-m-d', strtotime('+2 weeks')),
        'time' => '2:00 PM - 5:00 PM',
        'location' => 'Workshop Room A',
        'category' => 'workshop',
        'featured' => false,
        'registration_url' => '#',
        'image' => 'assets/images/event-workshop.jpg'
    ],
    [
        'id' => 3,
        'title' => 'Startup Pitch Competition',
        'description' => 'Compete for $10,000 in seed funding and mentorship opportunities.',
        'date' => date('Y-m-d', strtotime('+3 weeks')),
        'time' => '1:00 PM - 6:00 PM',
        'location' => 'Innovation Center Auditorium',
        'category' => 'competition',
        'featured' => true,
        'registration_url' => '#',
        'image' => 'assets/images/event-pitch.jpg'
    ],
    [
        'id' => 4,
        'title' => 'Tech Talk: AI and Machine Learning Trends',
        'description' => 'Explore the latest trends in AI and ML with leading researchers.',
        'date' => date('Y-m-d', strtotime('+1 month')),
        'time' => '7:00 PM - 8:30 PM',
        'location' => 'Conference Room B',
        'category' => 'tech-talk',
        'featured' => false,
        'registration_url' => '#',
        'image' => 'assets/images/event-tech-talk.jpg'
    ],
    [
        'id' => 5,
        'title' => 'Networking Night: Alumni Connect',
        'description' => 'Connect with successful alumni entrepreneurs and build your professional network.',
        'date' => date('Y-m-d', strtotime('+5 weeks')),
        'time' => '6:30 PM - 9:00 PM',
        'location' => 'Innovation Center Lounge',
        'category' => 'networking',
        'featured' => false,
        'registration_url' => '#',
        'image' => 'assets/images/event-networking.jpg'
    ],
    [
        'id' => 6,
        'title' => 'Design Thinking Bootcamp',
        'description' => 'Intensive 2-day bootcamp on human-centered design principles.',
        'date' => date('Y-m-d', strtotime('+6 weeks')),
        'time' => '9:00 AM - 5:00 PM',
        'location' => 'Innovation Center Workshop Space',
        'category' => 'bootcamp',
        'featured' => true,
        'registration_url' => '#',
        'image' => 'assets/images/event-bootcamp.jpg'
    ]
];

// Handle different request types
$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    case 'GET':
        $category = $_GET['category'] ?? null;
        $featured_only = isset($_GET['featured']) && $_GET['featured'] === 'true';
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : null;
        
        $filtered_events = $events;
        
        // Filter by category
        if ($category) {
            $filtered_events = array_filter($filtered_events, function($event) use ($category) {
                return $event['category'] === $category;
            });
        }
        
        // Filter by featured
        if ($featured_only) {
            $filtered_events = array_filter($filtered_events, function($event) {
                return $event['featured'];
            });
        }
        
        // Sort by date
        usort($filtered_events, function($a, $b) {
            return strtotime($a['date']) - strtotime($b['date']);
        });
        
        // Apply limit
        if ($limit) {
            $filtered_events = array_slice($filtered_events, 0, $limit);
        }
        
        // Reindex array
        $filtered_events = array_values($filtered_events);
        
        echo json_encode($filtered_events);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

// Function to get event by ID (for future use)
function getEventById($id) {
    global $events;
    foreach ($events as $event) {
        if ($event['id'] == $id) {
            return $event;
        }
    }
    return null;
}

// Function to add new event (for future admin functionality)
function addEvent($eventData) {
    global $events;
    $newId = max(array_column($events, 'id')) + 1;
    $eventData['id'] = $newId;
    $events[] = $eventData;
    return $eventData;
}
?>