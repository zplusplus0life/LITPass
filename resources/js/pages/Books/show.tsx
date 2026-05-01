import {book} from '@/types';
import {Head} from '@inertiajs/react';
import AuthLayout from '@/layouts/authLayout';

export function BookShow({books, langganan}: {books:book, langganan:boolean}){
    return(
        <AuthLayout
        header={<h2 className="font-semibold text-xl text-gray-800">{books.judul}</h2>}
        >
            <Head title={books.judul}/>

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <div className="md:flex gap-8">
                            <img src={books.cover_url} alt={books.judul} className="w-full rounded-lg shadow-md" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}