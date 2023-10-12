<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'amount', 'frequency', 'day', 'is_expense', 'userID'
    ];

    protected $table = "budgets";

    public $timestamps = false;
}
