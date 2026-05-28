import  AuthLayout from '@/layouts/authLayout';
import {Head, Link} from '@inertiajs/react';
import {propsPurchased} from '@/types';
import {indeks as booksIndeks} from '@/routes/books';
import {index as planIndex} from '@/routes/plans';
import {download as pdfDonwload} from '@/routes/invoices';
import {propsActiveSubs} from '@/types';
import {propsInvoices} from '@/types';


export default function dashboard({purchasedBooks, activeSubscription, invoices}: {purchasedBooks: propsPurchased, activeSubscription: propsActiveSubs, invoices: propsInvoices}){
    return(
       <AuthLayout
       header={<h2 className="font-semibold text-xl text-gray-800">User Dashboard</h2>}>
        
        <Head title="Dashboard"/>

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">My Liblary</h3>
                        {purchasedBooks.length === 0 ? (
                            <div className="text-center  py-8 border-2 border-dashed border-gray-200 rounded-lg">
                                <p className="text-gray-500 mb-4">You haven't bought any books yet.</p>
                                <Link 
                                href={booksIndeks().url} className="text-indigo-600 font-bold hover:underline"
                                >
                                Browse Catalog
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {purchasedBooks.map(order => (
                                    <div key={order.id} className="flex gap-4 p-4 border border-gray-100 rounded-lg">
                                        <img src={order.book.cover_url} className="w-16 h-24 object-cover"/>
                                        <div>
                                            <h4 className="font-bold text-gray-900 line-clamp-1">{order.book.judul}</h4>
                                            <p className="text-sm text-gray-500">Purchased: {new Date(order.created_at).toLocaleDateString()}</p>
                                            <button className="mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200">
                                                Read Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h3 className="text-lg font-bold mb-4">Subscription Status</h3>
                        {activeSubscription ? (
                            <div className="border-l-4 border-green-500 bg-green-50 p-4">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm text-green-700 font-bold uppercase tracking-wider">Active Plan</p>
                                        <p className="text-2xl font-black text-green-900">{activeSubscription.plan.nama}</p>
                                    </div>
                                    <div className="text-right">
                                        <p>
                                            {activeSubscription.is_expired ? 'Expired on': 'Expires in' }
                                            </p>
                                        <p className="font-bold">
                                            {activeSubscription.is_expired 
                                                ? activeSubscription.ends_at
                                                : `${activeSubscription.days_remaining} days left`}
                                        </p>
                                    </div>
                                </div>
                                    <Link href={planIndex().url} className="mt-4 inline-block text-sm text-indigo-600 font-bold hover:underline">
                                         Manage Subscription
                                    </Link>
                            </div>
                        ) : (
                         <div className="border-l-4 border-gray-300 bg-gray-50 p-4 flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-700">No active subscription</p>
                                <p className="text-sm text-gray-500">Subscribe to get 20% discount and access premium books/</p>
                            </div>
                            <Link href={planIndex().url} className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700 transition">
                            See Plans
                            </Link>
                         </div>   
                        )}
                    </div>
                </div>

                {activeSubscription && (
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Billing History</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Plan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price of plan</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {invoices.map(invoice => (
                                            <tr key={invoice.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.invoice_number}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.issued_at}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp. {invoice.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a href={pdfDonwload(invoice.id).url} className="text-white px-2 py-2 bg-red-500 rounded-lg shadow-lg">Download PDF</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
       </AuthLayout>
    )
}