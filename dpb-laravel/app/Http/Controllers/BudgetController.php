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

    public function simulateBudget($request, $balance = 0){ // Return an array of balances for each simulated day. Today's simulated balance will just be $balance. 
        //Pull in all db items that are related to the currently logged in user's ID. 
        $budgets = Budget::where('userID', 1)->get();;
        
        //Figure the date to start from
        $today = date("m/d/Y");

        //offset for the day of the week.
        $offset = self::getDayOfWeek();

        //Loop through 42 times and for each simulated day, check each budget item to see if it applies to the current simulated day.
        $i = 1;
        $simulatedBalance = $balance;
        $balanceArray = [];
        while($i < 42){
            if($i < $offset){
                array_push($balanceArray, "");
            }
            elseif($i == $offset){
                array_push($balanceArray, $balance);
            }
            //Loop through each budget item
            foreach($budgets as $budget){
                //Check if the budget is relevant to the simulated day
                if($budget->day == (date("d") + $i)){ //
                    
                }
            }
            $i++;
        }

        dd($budgetsArray);

                
    }
    public function renderCalendar(){
        $dayofweek = date('w', strtotime($date));
    }
    private function getDayOfWeek(){
        // Get the current day of the week (1 for Monday, 7 for Sunday)
        $dayOfWeek = date("N");
        
        // Map the numeric representation to the desired output
        switch ($dayOfWeek) {
            case 1:
                return 1; // Sunday
            case 2:
                return 2; // Monday
            case 3:
                return 3; // Tuesday
            case 4:
                return 4; // Wednesday
            case 5:
                return 5; // Thursday
            case 6:
                return 6; // Friday
            case 7:
                return 7; // Saturday
            default:
                return "Invalid day";
        }
    }

}
