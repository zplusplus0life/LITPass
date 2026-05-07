import AuthLayout from '@/layouts/authLayout';
import {Head, Link, router} from '@inertiajs/react';
import {destroy as adminDel} from '@/routes/admin/users';
import {create as adminCreate} from '@/routes/admin/users';
import {edit as adminEdit} from '@/routes/admin/users';
import {propsManageUsers} from '@/types';

export default function AdminUsersIndex({users}: {users: propsManageUsers}){
    const deleteUser = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')){
        router.delete(adminDel(id).url);
        }
    }

    return ( 
        <AuthLayout
        header={<h2 className="font-semitbold text-xl text-gray-800">Manage Users</h2>}
        >
        <Head title="Manage Users" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <h3 className="text-lg font-medium text-gray-900">Total Users ({users.length})</h3>
                <Link
                href={adminCreate().url}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-indigo-700 transition"
                >
                   + Add New User 
                </Link>
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase track-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subscription
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.nama}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.active_subscription?.plan?.nama || 'None'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.created_at}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                            href={adminEdit(user.id).url}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-2">
                                            Edit
                                            </Link>
                                            <button
                                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                            onClick={() => deleteUser(user.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        </AuthLayout>
    )
}