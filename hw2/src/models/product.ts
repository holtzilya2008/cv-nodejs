export interface ProductDTOBase {
    categoryId: string;
    name: string;
    itemsInStock: number;
}

export interface ProductDTO extends ProductDTOBase {
    id: string;
}

// tslint:disable-next-line: no-empty-interface
export interface UpdateProductDTO extends ProductDTOBase {

}
