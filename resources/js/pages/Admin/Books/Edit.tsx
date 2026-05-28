import {update as AdminUpdateBooks} from '@/routes/admin/books';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/layouts/authLayout';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import Checkbox from '@/components/Checkbox';
import {book} from '@/types';




export default function Edit({book } : {book: book}) {

       const { data, setData, patch, processing} = useForm({
        judul: book.judul,
        penulis: book.penulis,
        harga: book.harga,
        deskripsi: book.deskripsi,
        cover_url: book.cover_url,
        is_premium: book.is_premium,
    });

    const submit = (e :  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(AdminUpdateBooks(book.id).url);
    };

    return (
        <AuthLayout
        header={<h2 className="font-semibold text-xl text-gray-800">Edit Book: {book.judul}</h2>}
        >
        
        <Head title={`Admin - Edit ${book.judul}`} />

         <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Book Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.judul}
                                        onChange={(e) => setData('judul', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="author" value="Author" />
                                    <TextInput
                                        id="author"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.penulis}
                                        onChange={(e) => setData('penulis', e.target.value)}
                                        required
                                    />
                                </div>

                                 <div>
                                    <InputLabel htmlFor="price" value="Price (IDR)" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.harga}
                                        onChange={(e) => setData('harga', Number(e.target.value))}
                                        required
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                        rows={4}
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <InputLabel htmlFor="cover_url" value="Cover Image URL" />
                                    <TextInput
                                        id="cover_url"
                                        type="url"
                                        className="mt-1 block w-full"
                                        value={data.cover_url}
                                        onChange={(e) => setData('cover_url', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="block">
                                    <label className="flex items-center">
                                        <Checkbox
                                            checked={data.is_premium}
                                            onChange={(e) => setData('is_premium', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-gray-600">Exclusive Premium Book</span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Update Book
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}