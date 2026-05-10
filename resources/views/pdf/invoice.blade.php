<!DOCTYPE html>
<html>
<head>
    <title>Invoice - {{ $invoice->invoice_number }}</title>
    <style>
        body { font-family: sans-serif; }
        .container { width: 80%; margin: auto; }
        .header { text-align: center; margin-bottom: 50px; }
        .details { margin-bottom: 30px; }
        .item { margin-bottom: 10px; }
        .total { text-align: right; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Invoice</h1>
            <p><strong>Invoice Number:</strong> {{ $invoice->invoice_number }}</p>
            <p><strong>Issued Date:</strong> {{ $invoice->issued_at->format('d M Y') }}</p>
        </div>

        <div class="details">
            <p><strong>Billed To:</strong> {{ $subscription->user->nama }}</p>
            <p><strong>Email:</strong> {{ $subscription->user->email }}</p>
        </div>

        <div class="item">
            <h3>Subscription Details:</h3>
            <p><strong>Plan:</strong> {{ $subscription->plan->nama }}</p>
            <p><strong>Description:</strong> {{ $subscription->plan->deskripsi }}</p>
            <p><strong>Subscription Period:</strong> {{ $subscription->starts_at->format('d M Y') }} - {{ $subscription->ends_at->format('d M Y') }}</p>
        </div>

        <hr>

        <div class="total">
            <h2>Total Amount: ${{ number_format($invoice->amount, 2) }}</h2>
        </div>

        <p style="text-align: center; margin-top: 50px;">Thank you for your business!</p>
    </div>
</body>
</html>