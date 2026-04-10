<?php
declare(strict_types=1);

function env_load(string $envPath): array
{
	if (!file_exists($envPath)) {
		return [];
	}

	$vars = [];
	$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
	if ($lines === false) {
		return [];
	}

	foreach ($lines as $line) {
		$trimmed = trim($line);
		if ($trimmed === '' || str_starts_with($trimmed, '#')) {
			continue;
		}

		$parts = explode('=', $trimmed, 2);
		if (count($parts) !== 2) {
			continue;
		}

		$key = trim($parts[0]);
		$value = trim($parts[1]);

		if (strlen($value) >= 2) {
			$first = $value[0];
			$last = $value[strlen($value) - 1];
			if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
				$value = substr($value, 1, -1);
			}
		}

		$vars[$key] = $value;
		$_ENV[$key] = $value;
		$_SERVER[$key] = $value;
	}

	return $vars;
}

function env_value(string $key, mixed $default = null): mixed
{
	if (array_key_exists($key, $_ENV)) {
		return $_ENV[$key];
	}
	if (array_key_exists($key, $_SERVER)) {
		return $_SERVER[$key];
	}
	return $default;
}

