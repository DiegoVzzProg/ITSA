<?php

namespace App\Http\Controllers;

use App\Models\StUserOptionsModel;
use Illuminate\Http\Request;

class CatalogUserOptions extends Controller
{
    public static function view()
    {
        $columns = [
            ['label' => 'Description',  'field' => 'description',      'type' => 'text'],
            ['label' => 'Route',   'field' => 'route',     'type' => 'text'],
            ['label' => 'Erased',  'field' => 'erased', 'type' => 'boolean']
        ];

        $data = StUserOptionsModel::where('erased', false)->get()->toArray();
        return view('pages.user.user_options.catalog_user_options', [
            "data" => $data,
            "columns" => $columns
        ]);
    }
}
