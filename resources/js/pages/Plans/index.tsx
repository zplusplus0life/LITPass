import {PropsPlans} from '@/types';
import {Head, Link} from '@inertiajs/react';
import {subscribe as PlansSubs} from '@/routes/plans';
import AuthLayout from '@/layouts/authLayout';

export default function PlanIndex({plans}: {plans: PropsPlans}){

    return (
       <AuthLayout
       header={<h2 className="font-semibold text-xl text-gray-800">Subscription Plans</h2>}
       >
        <Head title="Subscription plans"/>

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h3 className="text-lg font-medium">Choose your plan</h3>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
                            {plans.map(plan => (
                                <div key={plan.id} className="border border-gray-200 rounded-lg shadow-sm divide-y flex flex-col divide-gray-200">
                                    <div className="p-6 flex-1">
                                        <h2 className="text-lg font-medium text-gray-900">{plan.nama}</h2>
                                        <p className="mt-4">
                                            <span className="text-4xl font-extrabold text-gray-900">Rp. {plan.harga}</span>
                                            <span className="ml-1 font-medium text-gray-500">/month</span>
                                        </p>
                                        <p className="mt-3 text-gray-500">{plan.deskripsi}</p>
                                    </div>
                                    <div className="px-6 py-8">
                                        <Link
                                        method="post"
                                        href={PlansSubs(plan.slug).url} className="block w-full bg-indigo-600 border border-indigo-600 rounded-md py-2  text-sm font-semibold text-white text-center hover:bg-indigo-700"
                                        >
                                            Select Plan
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

       </AuthLayout>
    )
}