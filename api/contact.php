<?php
// Contact form handler for Regis Innovation Center Website
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Validate and sanitize input
function validateInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Get form data
$name = validateInput($_POST['name'] ?? '');
$email = validateInput($_POST['email'] ?? '');
$subject = validateInput($_POST['subject'] ?? '');
$message = validateInput($_POST['message'] ?? '');

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

if (empty($subject)) {
    $errors[] = 'Subject is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// Return validation errors
if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Email configuration
$to_email = 'innovation@regis.edu';
$from_email = 'noreply@regis.edu';

// Email subject and body
$email_subject = 'Contact Form Submission: ' . $subject;
$email_body = "
New contact form submission from the Regis Innovation Center website:

Name: $name
Email: $email
Subject: $subject

Message:
$message

---
Submitted on: " . date('Y-m-d H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = [
    'From: ' . $from_email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Try to send email
$mail_sent = mail($to_email, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Log successful submission (optional)
    error_log("Contact form submission from: $email");
    
    // Send auto-reply to user
    $auto_reply_subject = 'Thank you for contacting Regis Innovation Center';
    $auto_reply_body = "
Dear $name,

Thank you for reaching out to the Regis Innovation Center. We have received your message and will get back to you within 24-48 hours.

Here's a copy of your message:
Subject: $subject
Message: $message

Best regards,
The Regis Innovation Center Team

---
Regis Innovation Center
3333 Regis Blvd
Denver, CO 80221
Phone: (303) 458-4000
Email: innovation@regis.edu
";
    
    $auto_reply_headers = [
        'From: ' . $from_email,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    mail($email, $auto_reply_subject, $auto_reply_body, implode("\r\n", $auto_reply_headers));
    
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    error_log("Failed to send contact form email from: $email");
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again.']);
}
?>