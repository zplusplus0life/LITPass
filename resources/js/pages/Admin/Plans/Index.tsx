import AuthLayout from '@/layouts/authLayout';
import { Head, Link, router } from '@inertiajs/react';
import {create as AdminCreatePlans} from '@/routes/admin/plans';
import {destroy as AdminDelPlans} from '@/routes/admin/plans';
import {edit as AdminEditPlans} from '@/routes/admin/plans';
import {PropsPlans} from '@/types';


export default function AdminPlansIndex({ plans }: {plans: PropsPlans}) {
    
    function formatCurrency(price: number) {return new Intl.NumberFormat('id-ID',{style: 'currency', currency: 'IDR'}).format(price)}

    const deletePlan = (id: string) => {
        if (confirm('Are you sure you want to delete this plan?')) {
            router.delete(AdminDelPlans(id).url);
        }
    };

    return(
        <AuthLayout
        header={<h2 className="font-semibold text-xl text-gray-800">Manage Plans</h2>}
        >

        <Head title="Manage Plans" />

           <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Subscription Plans ({plans.length})</h3>
                        <Link
                            href={AdminCreatePlans().url}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-indigo-700 transition"
                        >
                            + Add New Plan
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Slug
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                      {plans.map((plan) => (
                                        <tr key={plan.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.nama}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.slug}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(plan.harga)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link 
                                                    href={AdminEditPlans(plan.slug).url} 
                                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button 
                                                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                    onClick={() => deletePlan(plan.slug)}
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