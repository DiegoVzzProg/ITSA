<nav class="flex flex-col w-full max-w-3xs h-full">
    <p class="italic font-light text-md border-b py-1 select-none px-2">
        Menu
    </p>
    <div class="flex flex-col items-start gap-2 py-2">
        <a href="{{ route('home.user.options') }}" @class([
            'w-full text-start cursor-pointer transition-all duration-500 py-1 px-2',
            'hover:bg-[#59a5d885] border-e-4 hover:border-e-[#76c8ff]',
            'bg-[#59a5d885] border-e-[#76c8ff] pointer-events-none select-none' =>
                Route::currentRouteName() === 'home.user.options',
            'border-e-transparent' => Route::currentRouteName() !== 'home.user.options',
        ])>
            Opciones de Usuarios
        </a>
    </div>
</nav>
