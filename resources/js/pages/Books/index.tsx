import {PropsBuku} from '@/types';
import { index as planIndex} from '@/routes/plans';
import { Head, Link } from '@inertiajs/react';
import AuthLayout from '@/layouts/authLayout';
export default function index({buku, langganan}  : {buku: PropsBuku, langganan: boolean}) {

    return (
      <AuthLayout>
        <Head title="Books Catalog" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {!langganan && (
                  <div className="bg-indigo-600 rounded-lg shadow-lg p-6 mb-8 text-white flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">Join Book Club Today!</h3>
                      <p className="opacity-90">Get 20% OFF on all books and access to Premium collections.</p>
                    </div>
                    <Link href={planIndex().url} className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition">
                    Join Now
                    </Link>
                  </div>
                )}
            </div>
        </div>
      </AuthLayout>
    )
}