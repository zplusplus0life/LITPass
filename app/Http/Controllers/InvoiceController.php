<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Subscription;
use Illuminate\Support\Str;

class InvoiceController extends Controller
{

    public function generateAndStore(Subscription $subscription): Invoice
    {
        $invoiceNumber = 'INV-' . date('Ymd') . '-' . Str::upper(Str::random(8));

         $invoice = Invoice::create([
            'subscription_id' => $subscription->id,
            'invoice_number' => $invoiceNumber,
            'amount' => $subscription->plan->harga,
            'issued_at' => now(),
            'pdf_path' => null,
         ]);

          $pdf = Pdf::loadView('pdf.invoice', compact('invoice', 'subscription'));

          $FileName = 'invoices/' . $invoiceNumber . '.pdf';
          Storage::disk('public')->put($FileName, $pdf->output());

          $invoice->pdf_path = $FileName;
          $invoice->save();

          return $invoice;
    }

    /**
     * Download Invoice
     *
     * Mengunduh invoice dalam bentuk PDF.
     * 
     * @group Billing API
     * @authenticated
     * @urlParam invoice integer required ID invoice.
     */
    public function download(Invoice $invoice){

        if(!Storage::disk('public')->exists($invoice->pdf_path)){
            abort(404, 'Invoice PDF not found.');
        }

        return Storage::disk('public')->download($invoice->pdf_path, $invoice->invoice_number  . '.pdf');
    }
}
