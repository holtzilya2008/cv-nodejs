interface ProductBase {
    categoryId: string;
    name: string;
    itemsInStock: number;
}

export interface ProductDTO extends ProductBase {
    id: string;
}

// tslint:disable-next-line: no-empty-interface
export interface UpdateProductDTO extends ProductBase {

}
