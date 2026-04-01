import {book, PropsBuku} from '@/types';

export default function index({buku } :  {buku : PropsBuku}) {

    return (
        <>
        {buku.map((buku: book) =>  (
<li key= {buku.id}>
{buku.harga}
{buku.judul}
</li>
        ))}
        </>
    )
}