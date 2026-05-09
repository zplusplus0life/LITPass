export type book = {
id: number;
judul: string;
penulis: string;
harga: number;
deskripsi? : string;
harga_member?: number;
tampilan_harga?: number;
is_premium: boolean;
cover_url: string;
}

export type PropsBuku = book[];
