<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithPagination;

class DataTable extends Component
{
    use WithPagination;

    public array  $columns;      // ['Nombre', 'Email', 'Fecha']
    public array  $fields;       // ['name', 'email', 'created_at']
    public string $model;        // \\App\\Models\\User::class
    public string $search = '';  // término de búsqueda
    public int    $perPage = 10; // items por página

    protected $updatesQueryString = ['search', 'page'];

    public function mount(array $columns, array $fields, string $model, int $perPage = 10)
    {
        $this->columns = $columns;
        $this->fields  = $fields;
        $this->model   = $model;
        $this->perPage = $perPage;
    }

    public function updatingSearch()
    {
        $this->resetPage();
    }


    public function render()
    {
        $query = ($this->model)::query();

        if ($this->search) {

            $query->where(function ($q) {
                foreach ($this->fields as $field) {
                    $q->orWhere($field, 'like', "%$this->search%");
                }
            });
        }
        $rows = $query->paginate($this->perPage);
        return view('livewire.data-table', [
            'rows' => $rows,
        ]);
    }
}
