import AuthLayout from '@/layouts/authLayout';
import {destroy as AdminDelBooks} from '@/routes/admin/books';
import {create as AdminCreateBooks} from '@/routes/admin/books';
import { Head, Link, router } from '@inertiajs/react';
import {edit as AdminEditBooks} from '@/routes/admin/books';
import {PropsBuku} from '@/types';


export default function AdminBookIndex({ books } : {books: PropsBuku}) {
    const deleteBook = (id: number) => {
        if (confirm('Are you sure you want to delete this book?')) {
            router.delete(AdminDelBooks(id).url);
        }
    };

    return (
        <AuthLayout
        header={<h2 className="font-semibold text-xl text-gray-800">Manage Books Catalog</h2>}
        >

        <Head title="Admin - Manage Books" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">All Books ({books.length})</h3>
                        <Link
                            href={AdminCreateBooks().url}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-indigo-700 transition"
                            >
                            + Add New Book
                        </Link>
                    </div>

                    <div className="bg-white  shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {books.map( book => (
                                        <tr key={book.id}>
                                               <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-8 flex-shrink-0">
                                                        <img className="h-10 w-8 object-cover rounded shadow" src={book.cover_url} alt="" />
                                                    </div>
                                                    <div className="ml-4 text-sm font-medium text-gray-900">
                                                        {book.judul}
                                                    </div>
                                                </div>
                                            </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {book.penulis}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${book.harga.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {book.is_premium ? (
                                                    <span className="px-2  text-xs  font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        Premium
                                                    </span>
                                                ) : (
                                                    <span className="px-2  text-xs  font-semibold rounded-full bg-green-100 text-green-800">
                                                        Free
                                                    </span>
                                                )}
                                            </td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link 
                                                    href={AdminEditBooks(book.id).url} 
                                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button 
                                                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                    onClick={() => deleteBook(book.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}