<?php
declare(strict_types=1);

function validate_required(string $field, string $value, array &$errors): void
{
    if ($value === '') {
        $errors[] = $field . ' is required.';
    }
}

function validate_max_length(string $field, string $value, int $max, array &$errors): void
{
    if (mb_strlen($value) > $max) {
        $errors[] = $field . ' exceeds maximum length of ' . $max . '.';
    }
}

function validate_email_format(string $field, string $value, array &$errors): void
{
    if ($value !== '' && filter_var($value, FILTER_VALIDATE_EMAIL) === false) {
        $errors[] = $field . ' is not a valid email address.';
    }
}

function validate_integer_id(string $field, mixed $value, array &$errors): ?int
{
    $validated = filter_var($value, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    if ($validated === false) {
        $errors[] = $field . ' must be a positive integer.';
        return null;
    }
    return (int) $validated;
}

