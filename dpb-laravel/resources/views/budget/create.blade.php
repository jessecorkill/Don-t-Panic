<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
<div class="w-4/5 mx-auto">
    <div class="text-center pt-20">
        <h1 class="text-3xl text-gray-700">
            Add new budget
        </h1>
        <hr class="border border-1 border-gray-300 mt-10">
    </div>

<div class="m-auto pt-20">
    <form
        action="{{ route('budget.store') }}"
        method="POST"
        enctype="multipart/form-data">
        @csrf
                <label for="">Expense</label>
        <input
            type="radio"
            name="is_expense"
            value="1"
            id="expense">
        <label for="income">Income</label>
        <input
            type="radio"
            name="is_expense"
            value="0"
            id="income">

        <input 
            type="string"
            name="name"
            placeholder="Loan payment"
            class="">
        <input 
            type="string"
            name="description"
            placeholder="Student loan taken out in 2017"
            class="">
        <input 
            type="number"
            name="amount"
            placeholder="125"
            class="">
        <label for="weekly">Weekly</label>
        <input 
            type="radio"
            name="frequency"
            id="weekly"
            value="Weekly"
            class="">
        <label for="bi-weekly">Bi-Weekly</label>
        <input 
            type="radio"
            name="frequency"
            id="bi-weekly"
            value="Bi-Weekly"
            class="">
        <label for="semi-weekly">Semi-Monthly</label>
        <input 
            type="radio"
            name="frequency"
            id="semi-monthly"
            value="Semi-Monthly"
            class="">
        <input 
            type="number"
            name="day"
            placeholder="15"
            class="">

        <button
            type="submit"
            class="uppercase mt-15 bg-blue-500 text-gray-100 text-lg font-extrabold py-4 px-8 rounded-3xl">
            Submit Post
        </button>
    </form>
</div>
</body>
</html>