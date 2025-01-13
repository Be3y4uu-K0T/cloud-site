import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { CartProduct } from "$lib/types";

const data = browser && localStorage.getItem('cart');
export const cart = writable<CartProduct | null>(data && JSON.parse(data) || null);

cart.subscribe((value) => {
    if (browser)
        localStorage.setItem('cart', JSON.stringify(value));
});
