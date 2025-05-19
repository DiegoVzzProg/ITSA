<div class="space-y-4">
    {{-- Buscador --}}
    <div class="flex justify-between items-center">
        <input wire:model.debounce.300ms="search" type="text" placeholder="Buscar..."
            class="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring" />

        <select wire:model="perPage" class="border rounded-lg px-3 py-2">
            <option value="5">5 por página</option>
            <option value="10">10 por página</option>
            <option value="25">25 por página</option>
            <option value="50">50 por página</option>
        </select>
    </div>

    {{-- Tabla --}}
    <div class="overflow-x-auto shadow rounded-lg">
        <table class="table-auto w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    @foreach ($columns as $col)
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                            {{ $col }}
                        </th>
                    @endforeach
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @forelse($rows as $row)
                    <tr class="hover:bg-gray-100">
                        @foreach ($fields as $field)
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {{ data_get($row, $field) }}
                            </td>
                        @endforeach
                    </tr>
                @empty
                    <tr>
                        <td colspan="{{ count($columns) }}" class="px-6 py-4 text-center text-gray-500">
                            No se encontraron registros.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{-- Paginación --}}
    <div>
        {{ $rows->links() }}
    </div>
</div>
