@extends('layouts.app')

@section('content')
    <div class="flex flex-col w-full gap-2">
        <h1 class="text-3xl font-semibold select-none">
            Catalogo de Usuarios
        </h1>
        @livewire('data-table', [
            'columns' => ['Nombre', 'Email', 'Fecha de creación'],
            'fields' => ['name', 'email', 'created_at'],
            'model' => ,
            'perPage' => 15,
        ])
    </div>
@endsection
