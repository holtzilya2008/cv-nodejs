import { CategoryDTO } from '../models';
import { CATEGORIES_MOCK } from '../constants/categories-mock';
import { BaseRouterFactory } from '../infrastructure/base-router-factory';

const staticItems: CategoryDTO[] = CATEGORIES_MOCK;

const router = BaseRouterFactory.createBaseRouter(staticItems);

export { router };
