import {PropsBuku} from '@/types';
import { index as planIndex} from '@/routes/plans';
import {show as BookShow} from '@/routes/books';
import { Head, Link } from '@inertiajs/react';
import AuthLayout from '@/layouts/authLayout';
export default function index({buku, langganan}  : {buku: PropsBuku, langganan: boolean}) {

    return (
      <AuthLayout
      header={<h2 className="font-semibold text-xl text-gray-800">LITPass Catalog</h2>}
      >
        <Head title="Books Catalog" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {!langganan && (
                  <div className="bg-indigo-600 rounded-lg shadow-lg p-6 mb-8 text-white flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">Join Book Club Today!</h3>
                      <p className="opacity-90">Get 20% OFF on all books and access to Premium collections.</p>
                    </div>
                    <Link href={planIndex().url} className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition">
                    Join Now
                    </Link>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {buku.map(book => (
                    <div key={book.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 flex flex-col">
                      <div className="relative">
                        <img src={book.cover_url} alt={book.judul} className="w-full h-64 object-cover"/>
                        {book.is_premium && (
                          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                            PREMIUM
                          </span>
                        )}
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="font-bold text-gray-900 line-clamp-1">{book.judul}</h3>
                        <p className="text-sm text-gray-500 mb-4">by {book.penulis}</p>

                        <div className="mt-auto">
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-bold ${langganan ? 'text-green-600' : 'text-gray-900'}`}>
                              ${book.tampilan_harga.toFixed(2)}
                            </span>
                            {langganan && (
                              <span className="text-xs line-through text-gray-400">
                                ${book.harga.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {!langganan && (
                            <p className="text-xs text-indigo-600 font-medium mb-4">
                              ${book.harga_member?.toFixed(2)} for members
                            </p>
                          )}

                          <Link
                          href={BookShow(book.id).url}
                          className="block w-full text-center bg-gray-800 text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-700 transition mt-2"
                          >
                          View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
        </div>
      </AuthLayout>
    )
}