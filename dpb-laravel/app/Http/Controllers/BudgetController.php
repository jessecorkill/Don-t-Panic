<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Budget;
use Illuminate\Support\Facades\Auth;

class BudgetController extends Controller
{
    public function __construct(){
        $this->middleware('auth')->only(['create', 'edit', 'update', 'destroy']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('budget.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('budget.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Budget::create([
            'name' => $request->name,
            'description' => $request->description,
            'amount' => $request->amount,
            'frequency' => $request->frequency,
            'day' => $request->day,
            'is_expense' => $request->is_expense,
            'userID' => Auth::id(),
        ]);

        return redirect(route('budget.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function storeImage($request){
        $newImageName = uniqid() . '-' . $request->title . '.' . $request->image-extension();

        return $request->image->move(public_path('images'), $newImageName);
    }
}
