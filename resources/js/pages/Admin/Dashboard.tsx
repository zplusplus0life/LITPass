import AuthLayout from '@/layouts/authLayout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard(){
    return(
        <AuthLayout
        header={<h2 className="font-semibold text-xl text-gray-800">Admin Dashboard</h2>}>

        <Head title="Admin Dashboard"/>

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        Welcome to the Admin Dashboard!
                    </div>
                </div>
            </div>
        </div>
        </AuthLayout>
    )
}