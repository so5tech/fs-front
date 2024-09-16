export type ShopItem = {
    
    _id: string;
    image_link: string;
    item_name: string;
    discription: string;
    quantity: number;
    quantity_left: number;
    expiery_date: string;
    group: string;
    status: string;
    current_stock: number;
};


export type CartItem = {
    
    item_id: string;
    item_name: string;
    quantity: number;
};

export type Item = {
    
    _id: string;
    item_name: string;
    quantity: number;
};

