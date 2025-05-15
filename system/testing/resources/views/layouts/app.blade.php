<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>System - Testing - ITSA Studio</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <style>
        :root {
            --height-header: clamp(100px, 30vw, 200px);
        }
    </style>

</head>

<body>
    <header class="flex w-full h-(--height-header) min-h-(--height-header) justify-center sticky top-0 bg-[#59A5D8]">
        <nav class="container flex flex-row items-center justify-between h-full px-[clamp(.9rem,3vw,1.2rem)]">
            <x-itsa-studio-icon />
        </nav>
    </header>
    <main class="flex flex-col w-full container h-full overflow-auto p-[clamp(.9rem,3vw,1.2rem)]">
        <nav class="flex flex-col w-full max-w-3xs h-full">
            <p class="italic font-light text-md border-b py-1 select-none">
                Menu
            </p>
            <div class="flex flex-col">
                <button>

                </button>
            </div>
        </nav>
        <section class="flex flex-col w-full h-full">
            @yield('content')
        </section>
    </main>
</body>

</html>
