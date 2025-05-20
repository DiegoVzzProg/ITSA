<?php

namespace App\Livewire;

use Illuminate\Pagination\LengthAwarePaginator;
use Livewire\Component;
use Livewire\WithPagination;

class DataTable extends Component
{
    use WithPagination;

    // Definición de columnas: label, field, type
    public array $columns;

    /**
     * Datos a mostrar: array de arrays u objetos
     * @var array
     */
    public array $data = [];

    public string $search = '';
    public int    $perPage = 10;
    public int    $page = 1;

    protected $updatesQueryString = ['search', 'page'];

    /**
     * Inicializa el componente
     *
     * @param array $columns [
     *     [ 'label' => 'Nombre', 'field' => 'name', 'type' => 'text' ],
     *     ...
     * ]
     * @param array $data
     * @param int   $perPage
     */
    public function mount(array $columns, array $data = [], int $perPage = 10)
    {
        $this->columns = $columns;
        $this->data    = $data;
        $this->perPage = $perPage;
    }

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function render()
    {
        $collection = collect($this->data);

        if ($this->search) {
            $collection = $collection->filter(function ($item) {
                foreach (array_column($this->columns, 'field') as $field) {
                    $value = data_get($item, $field);
                    if (stripos((string) $value, $this->search) !== false) {
                        return true;
                    }
                }
                return false;
            });
        }

        $page    = $this->page ?: 1;
        $total   = $collection->count();
        $results = $collection->forPage($page, $this->perPage)->values()->all();

        $rows = new LengthAwarePaginator(
            $results,
            $total,
            $this->perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return view('livewire.data-table', [
            'rows' => $rows,
        ]);
    }
}
