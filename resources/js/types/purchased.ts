type Book  ={ 
id: number;
judul: string;
penulis: string;
harga: number;
deskripsi? : string;
harga_member?: number;
tampilan_harga: number;
is_premium: boolean;
cover_url: string;
}

type purchased = {
id : number;
book: Book;
created_at : string;
}

export type propsPurchased = purchased[];