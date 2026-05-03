import {book} from '@/types';
import {Head, useForm} from '@inertiajs/react';
import AuthLayout from '@/layouts/authLayout';
import {store as  OrderStore} from '@/routes/orders';

export default function BookShow({books, langganan}: {books:book, langganan:boolean}){

    const {post, processing} = useForm({
        book_id : books.id,
    });

    const submit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(OrderStore().url);
    };

    return(
        <AuthLayout
        header={<h2 className="font-semibold text-xl text-gray-800">{books.judul}</h2>}
        >
            <Head title={books.judul}/>

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <div className="md:flex gap-8">
                            <div className="md:w-1/3"> 
                            <img src={books.cover_url} alt={books.judul} className="w-full rounded-lg shadow-md" />
                            </div>
                            <div className="md:w-2/3 mt-6 md:mt-0 flex flex-col">
                                <div className="flex justify-between">
                                    <div>
                                        <h1 className="text-3xl font-extrabold text-gray-900">{books.judul}</h1>
                                        <p className="text-xl text-gray-500">by {books.penulis}</p>
                                    </div>
                                    {books.is_premium && (
                                        <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full">
                                            PREMIUM COLLECTION
                                        </span>
                                    )}
                                </div>

                                <div className="mt-6 text-gray-700 leading-relaxed">
                                    <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider">Synopsis</h4>
                                    <p className="mt-2">{books.deskripsi}</p>
                                </div>

                                <div className="mt-auto pt-8">
                                    <div className="flex gap-3 mb-6">
                                        <span className="text-3xl font-bold text-gray-900">
                                            ${books.tampilan_harga.toFixed(2)}
                                        </span>
                                        {langganan && (
                                            <span className="textsm text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                                                Member Discount Applied (20%)
                                            </span>
                                        )}
                                    </div>

                                    <form onSubmit={submit}>
                                        <button
                                        disabled={processing}
                                        className="w-full md:w-auto bg-indigo-600 text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-indigo-700 transition disabled:opacity-50"
                                        >
                                            Buy this Book
                                        </button>
                                    </form>

                                    <p className="mt-4 text-sm text-gray-500 italic">
                                        * Books will be available in your dashboard immediately after purchase.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}