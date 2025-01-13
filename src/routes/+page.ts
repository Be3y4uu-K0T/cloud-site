import type { Product } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch('https://dummyjson.com/products').then((result) => result.json());

    return {
        products: data.products as Product[]
    };
};
