<div class="space-y-4">
    <div class="overflow-x-auto bg-[#141414] p-5 rounded flex flex-col gap-3">
        <div class="flex justify-between items-center">
            <input wire:model.debounce.300ms="search" type="text" placeholder="Search..."
                class="rounded px-3 py-2 bg-[#141414] shadow-sm border border-[#2e2e2e]" />

            <select wire:model="perPage" class="border border-[#2e2e2e] rounded px-3 py-2">
                <option class="bg-[#141414] border border-[#2e2e2e]" value="5">5</option>
                <option class="bg-[#141414] border border-[#2e2e2e]" value="10">10</option>
                <option class="bg-[#141414] border border-[#2e2e2e]" value="25">25</option>
                <option class="bg-[#141414] border border-[#2e2e2e]" value="50">50</option>
            </select>
        </div>
        <table class="table-auto w-full divide-y divide-[#2e2e2e]">
            <thead class="bg-[#141414]">
                <t>
                    @foreach ($columns as $column)
                        <th class="px-6 py-3 text-left text-xs font-semibold uppercase select-none">
                            {{ $column['label'] }}
                        </th>
                    @endforeach
                </t>
            </thead>
            <tbody class="bg-[#141414] divide-y divide-[#2e2e2e]">
                @forelse($rows as $row)
                    <tr class="hover:bg-[#2b2b2b46]">
                        @foreach ($columns as $column)
                            @php
                                $value = data_get($row, $column['field']);
                                $type = $column['type'] ?? 'text';
                                $classes = match ($type) {
                                    'decimal' => 'text-right font-mono',
                                    'boolean' => 'text-center',
                                    default => 'text-left',
                                };
                            @endphp
                            <td class="px-6 py-4 whitespace-nowrap text-sm {{ $classes }}">
                                @switch($type)
                                    @case('boolean')
                                        <label for="spiral"
                                            class="relative flex cursor-pointer items-center justify-center w-full gap-[1em] text-[#EC5800]">
                                            <input type="checkbox" disabled {{ $value ? 'checked' : '' }} name="spiral"
                                                id="spiral" class="peer appearance-none" />
                                            <span
                                                class="absolute left-0 top-1/2 h-[2em] w-[2em] -translate-x-full -translate-y-1/2 rounded-[0.25em] border-[2px] border-[#EC5800]">
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="86" fill="none"
                                                viewBox="0 0 76 86"
                                                class="absolute left-0 top-1/2 h-[2em] w-[2em] -translate-x-full -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]">
                                                <path stroke="#EC5800" pathLength="100" stroke-width="4px"
                                                    d="M65.988 12.645c-4.136-3.922-9.554-6.9-15.047-8.398C45.855 2.86 38.462-.12 33.096 1.797 26.002 4.331 20.525 11.961 15.6 17.193 2.02 31.623-6.386 59.79 12.101 74.58c8.711 6.97 18.19 9.184 29.043 9.798 24.117 1.365 28.693-3.588 32.542-27.643.772-4.83 3.15-16.094.7-20.995-4.678-9.354-22.35-11.08-31.143-7.698-9.911 3.812-18.558 14.775-20.295 25.193-1.45 8.707 5.447 10.548 12.947 10.848 6.772.27 10.148 1.421 10.148-5.949 0-5.412.09-7.166-2.1-11.547">
                                                </path>
                                            </svg>
                                        </label>
                                    @break

                                    @case('decimal')
                                        {{ number_format($value, 2) }}
                                    @break

                                    @default
                                        {{ $value }}
                                @endswitch
                            </td>
                        @endforeach
                    </tr>
                    @empty
                        <tr>
                            <td colspan="{{ count($columns) }}" class="px-6 py-4 text-center">
                                No se encontraron registros.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
            <div>
                {{ $rows->links() }}
            </div>
        </div>
    </div>
