<?php
/**
 * Production Contact Form Handler for Thurayilkunnu Temple
 * Hosted on LiteSpeed / Apache (cPanel).
 * Relays devotee enquiries to info@thurayilkunnutemple.com.
 */

// Set response headers
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed'
    ]);
    exit;
}

// Parse request payload (JSON or form-data)
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!is_array($input)) {
    $input = $_POST;
}

// Honeypot check (botcheck)
if (!empty($input['botcheck'])) {
    echo json_encode(['success' => true]);
    exit;
}

// Basic IP rate limiting (max 10 requests per 10 minutes)
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] 
    ?? $_SERVER['HTTP_X_FORWARDED_FOR'] 
    ?? $_SERVER['REMOTE_ADDR'] 
    ?? 'unknown';
$clientIp = explode(',', $clientIp)[0];
$clientIp = trim($clientIp);

$rateLimitDir = sys_get_temp_dir() . '/temple_rate_limit';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0700, true);
}
$rateLimitFile = $rateLimitDir . '/' . md5($clientIp) . '.json';

if (is_dir($rateLimitDir) && is_writable($rateLimitDir)) {
    $now = time();
    $rateData = ['count' => 0, 'first_seen' => $now];
    if (file_exists($rateLimitFile)) {
        $saved = json_decode(@file_get_contents($rateLimitFile), true);
        if (is_array($saved) && isset($saved['count'], $saved['first_seen'])) {
            if ($now - $saved['first_seen'] < 600) {
                $rateData = $saved;
            }
        }
    }

    $rateData['count']++;
    if ($rateData['count'] > 12) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Too many messages sent. Please wait a few minutes or call the temple office.'
        ]);
        exit;
    }
    @file_put_contents($rateLimitFile, json_encode($rateData));
}

// Extract and sanitize inputs
$name    = isset($input['name']) ? trim(strip_tags((string)$input['name'])) : '';
$email   = isset($input['email']) ? trim(strip_tags((string)$input['email'])) : '';
$phone   = isset($input['phone']) ? trim(strip_tags((string)$input['phone'])) : '';
$subject = isset($input['subject']) ? trim(strip_tags((string)$input['subject'])) : 'General Inquiry';
$message = isset($input['message']) ? trim((string)$input['message']) : '';

// Validation
if ($name === '' || $message === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please provide your name and message.'
    ]);
    exit;
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid email address.'
    ]);
    exit;
}

// Mail configuration
$toEmail = getenv('MAIL_TO') ?: 'info@thurayilkunnutemple.com';
$fromEmail = getenv('MAIL_FROM') ?: 'info@thurayilkunnutemple.com';
$fromName = getenv('MAIL_FROM_NAME') ?: 'Thurayilkunnu Temple Website';

$cleanSubject = str_replace(["\r", "\n"], ' ', $subject ?: 'General Inquiry');
$cleanName = str_replace(["\r", "\n"], ' ', $name);
$mailSubject = "[Temple Enquiry] " . $cleanSubject . " — " . $cleanName;

// Prepare HTML body
$safeName    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail   = htmlspecialchars($email ?: 'Not provided', ENT_QUOTES, 'UTF-8');
$safePhone   = htmlspecialchars($phone ?: 'Not provided', ENT_QUOTES, 'UTF-8');
$safeInquiry = htmlspecialchars($subject ?: 'General Inquiry', ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$body = '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Enquiry</title>
</head>
<body style="font-family:Segoe UI,Arial,sans-serif;font-size:15px;color:#1c1917;line-height:1.6;margin:0;padding:20px;background:#f5f5f4;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:10px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    <h2 style="margin:0 0 16px;color:#7c2d12;border-bottom:2px solid #fed7aa;padding-bottom:8px;">New enquiry from the temple website</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;margin-bottom:16px;">
      <tr><td style="color:#78716c;width:120px;"><strong>Name</strong></td><td>' . $safeName . '</td></tr>
      <tr><td style="color:#78716c;"><strong>Email</strong></td><td>' . $safeEmail . '</td></tr>
      <tr><td style="color:#78716c;"><strong>Phone</strong></td><td>' . $safePhone . '</td></tr>
      <tr><td style="color:#78716c;"><strong>Inquiry</strong></td><td>' . $safeInquiry . '</td></tr>
    </table>
    <div style="background:#fafaf9;border:1px solid #e7e5e4;border-radius:8px;padding:14px;line-height:1.6;">' . $safeMessage . '</div>
    <p style="margin-top:20px;color:#78716c;font-size:13px;border-top:1px solid #f5f5f4;padding-top:12px;">Sent via Thurayilkunnu Temple Website &bull; thurayilkunnutemple.com</p>
  </div>
</body>
</html>';

// Headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: ' . $fromName . ' <' . $fromEmail . '>';
if ($email !== '') {
    $cleanReplyTo = str_replace(["\r", "\n"], '', $email);
    $headers[] = 'Reply-To: ' . $cleanReplyTo;
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Send email with envelope sender (-f) for cPanel Exim / Sendmail
$additionalParams = '-f ' . escapeshellarg($fromEmail);
$sent = @mail($toEmail, $mailSubject, $body, implode("\r\n", $headers), $additionalParams);

if (!$sent) {
    // Retry without additional parameter in case PHP restricts extra parameters
    $sent = @mail($toEmail, $mailSubject, $body, implode("\r\n", $headers));
}

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you. Your message has been sent to the temple office.'
    ]);
} else {
    // Note: On some hosts mail() might return false if sendmail is misconfigured
    // Log error for server admin debugging
    error_log("[Temple Contact] mail() failed for inquiry from: " . $name);
    http_response_code(502);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to send your message right now. Please try again or call the temple office.'
    ]);
}
