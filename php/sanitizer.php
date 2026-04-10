<?php
declare(strict_types=1);

function sanitize_text(?string $value): string
{
    $value = $value ?? '';
    $value = trim($value);
    $value = strip_tags($value);
    return preg_replace('/\s+/', ' ', $value) ?? '';
}

function sanitize_email(?string $value): string
{
    $value = sanitize_text($value);
    return filter_var($value, FILTER_SANITIZE_EMAIL) ?: '';
}

function sanitize_phone(?string $value): string
{
    $value = sanitize_text($value);
    return preg_replace('/[^\d\+\-\(\)\s]/', '', $value) ?? '';
}

