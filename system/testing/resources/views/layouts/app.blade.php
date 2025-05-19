<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>System - Testing - ITSA Studio</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/2.3.1/css/dataTables.tailwindcss.css">
    @vite(['resources/css/app.css', 'resources/ts/app.ts'])

    <style>
        :root {
            --height-header: clamp(100px, 30vw, 200px);
        }
    </style>

</head>

<body>
    <header class="flex w-full h-(--height-header) min-h-(--height-header) justify-center sticky top-0 bg-[#59A5D8]">
        <nav class="container flex flex-row items-center justify-between h-full px-[clamp(.9rem,3vw,1.2rem)]">
            <a href="{{ route('home') }}">
                <x-itsa-studio-icon />
            </a>
        </nav>
    </header>
    <main class="flex flex-row gap-2 w-full container h-full overflow-auto p-[clamp(.9rem,3vw,1.2rem)]">
        <x-user-options-navigation />
        <section class="flex flex-col w-full h-full">
            @yield('content')
        </section>
    </main>
</body>

</html>
