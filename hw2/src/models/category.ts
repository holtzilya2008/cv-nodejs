interface CategoryBase {
    name: string;
}

export interface CategoryDTO extends CategoryBase {
    id: string;
}

// tslint:disable-next-line:no-empty-interface
export interface UpdateCategoryDTO extends CategoryBase {

}
