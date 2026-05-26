type image = {
    createdAt: string,
    id: string,
    secure_url: string,
    public_id: string
};

export type room = {
    id: string,
    name: string,
    price: number,
    isBooked: boolean,
    type: string,
    cretedAt: string
    updatedAt: string,
    images: [image],
    capacity?: number | string,
    description?:string

}