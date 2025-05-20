@extends('layouts.app')

@section('content')
    <div class="flex flex-col w-full gap-2">
        <h1 class="text-3xl font-semibold select-none">
            User Options Catalog
        </h1>
        @livewire('data-table', [
            'columns' => $columns,
            'data' => $data,
            'perPage' => 15,
        ])
    </div>
@endsection
