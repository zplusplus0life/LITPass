import {subs, PropsBuku} from '@/types';
import {Head} from '@inertiajs/react';
import AuthLayout from '@/layouts/authLayout';
export default function index({buku, isSubscribed}  : {buku: PropsBuku, isSubscribed: subs}) {

    return (
      <AuthLayout>
        <Head title="Books Catalog" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                
            </div>
        </div>
      </AuthLayout>
    )
}