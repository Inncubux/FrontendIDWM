export interface CreateProduct {
    id:          number;
    name:        string;
    description: string;
    price:       number;
    category:    string;
    urls:        any[];
    stock:       number;
    brand:       string;
    publicId:    null;
    isActive:    boolean;
    condition:   number;
}