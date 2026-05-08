import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/layouts/authLayout';
import {plans} from '@/types';
import {update as AdminUpdatePlan} from '@/routes/admin/plans';

export default function Edit({ plan }: {plan: plans}) {

    const { data, setData, patch, processing} = useForm({
        nama: plan.nama,
        slug: plan.slug,
        harga: plan.harga,
        deskripsi: plan.deskripsi,
    });

    const submit = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(AdminUpdatePlan(plan.slug).url);
    };

    return (
        <AuthLayout
        header={<h2 className="font-semibold text-xl text-gray-800">Edit Plan: {plan.nama}</h2>}
        >
        <Head title={`Admin - Edit ${plan.nama}`} />
           <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                              <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Plan Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        required
                                    />
                                </div>

                                 <div>
                                    <InputLabel htmlFor="slug" value="Slug" />
                                    <TextInput
                                        id="slug"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
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
                                    ></textarea>
                                </div>

                                     <div className="flex items-center justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Update Plan
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