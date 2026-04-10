<?php
declare(strict_types=1);

function auth_start_session(array $config): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_name('un_admin_session');
    session_start();

    $timeout = (int) ($config['security']['session_timeout_seconds'] ?? 3600);
    $lastActivity = $_SESSION['last_activity_at'] ?? time();
    if (time() - (int) $lastActivity > $timeout) {
        session_unset();
        session_destroy();
        session_start();
    }
    $_SESSION['last_activity_at'] = time();
}

function auth_attempt_login(string $plainPassword, array $config): bool
{
    $hash = (string) ($config['security']['admin_password_hash'] ?? '');
    if ($hash === '' || !password_verify($plainPassword, $hash)) {
        return false;
    }

    session_regenerate_id(true);
    $_SESSION['is_admin_authenticated'] = true;
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    $_SESSION['authenticated_at'] = time();
    return true;
}

function auth_logout(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', (bool) $params['secure'], (bool) $params['httponly']);
    }
    session_destroy();
}

function auth_require_admin(): bool
{
    return !empty($_SESSION['is_admin_authenticated']);
}

function auth_validate_csrf(?string $token): bool
{
    $sessionToken = $_SESSION['csrf_token'] ?? '';
    return is_string($token) && $sessionToken !== '' && hash_equals($sessionToken, $token);
}

