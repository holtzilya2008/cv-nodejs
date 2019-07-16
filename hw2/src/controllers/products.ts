import { PRODUCTS_MOCK } from '../constants/products-mock';
import { ProductDTO } from '../models';
import { BaseRouterFactory } from '../infrastructure/base-router-factory';

const staticItems: ProductDTO[] = PRODUCTS_MOCK;

const router = BaseRouterFactory.createBaseRouter(staticItems);

export { router };
