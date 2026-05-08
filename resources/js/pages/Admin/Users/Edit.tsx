import {update as AdminUpdateU} from '@/routes/admin/users';
import AuthLayout from '@/layouts/authLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import {propsUserEdit} from '@/types';


export default function Edit({  user }: {user: propsUserEdit}) {

    const { data, setData, patch, processing } = useForm({
        nama: user.nama,
        email: user.email,
        role: user.role,
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(AdminUpdateU(user.id).url);
    };
    return (
        <AuthLayout
        header={<h2 className="font-semibold text-xl text-gray-800">Edit User: {user.nama}</h2>}>

        <Head title={`Admin - Edit ${user.nama}`} />


           <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                         <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                        <div>
                                            <InputLabel htmlFor="name" value="Nama" />
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
                                            <InputLabel htmlFor="email" value="Email" />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                className="mt-1 block w-full"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="role" value="Role" />
                                            <select
                                                id="role"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data.role}
                                                onChange={(e) => setData('role', e.target.value)}
                                                required
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                        <div className="pt-4 border-t border-gray-100">
                                                    <p className="text-sm text-gray-600 mb-4">Leave password blank to keep current password.</p>
                                                    
                                                    <div className="mb-4">
                                                        <InputLabel htmlFor="password" value="New Password" />
                                                        <TextInput
                                                            id="password"
                                                            type="password"
                                                            className="mt-1 block w-full"
                                                            value={data.password}
                                                            onChange={(e) => setData('password', e.target.value)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor="password_confirmation" value="Confirm New Password" />
                                                        <TextInput
                                                            id="password_confirmation"
                                                            type="password"
                                                            className="mt-1 block w-full"
                                                            value={data.password_confirmation}
                                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                                        />
                                                    </div>
                                        </div>
                                        <div className="flex items-center justify-end">
                                                <PrimaryButton className="ms-4" disabled={processing}>
                                                    Update User
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