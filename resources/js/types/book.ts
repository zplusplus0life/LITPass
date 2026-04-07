export type book = {
id: number;
judul: string;
penulis: string;
harga: number;
deskripsi?: string;
cover_url?: string;
is_premium: boolean;
created_at: string;
updated_at: string;
}

export type PropsBuku = book[];
