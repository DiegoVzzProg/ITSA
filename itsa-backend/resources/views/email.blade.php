<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>ITSA Studio</title>

    <!-- Fonts -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style>
        body {
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Recover your password</h1>
        <p>We have received a request to reset your password.</p>
        <p>
            <a class="button" href="{{ $url }}">Reset password</a>
        </p>
        <p>If you did not request this change, ignore this message.</p>
        <p>Best regards,<br>{{ config('app.name') }}</p>
    </div>
</body>

</html>