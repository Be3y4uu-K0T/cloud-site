<script lang="ts">
  import Navbar from '$lib/components/navbar.svelte';
  import Cart from '$lib/components/cart.svelte';
  import type { CartProduct, Product } from '$lib/types';

  const { data } = $props();

  let cartProducts = $state<CartProduct[]>([]);

  const addToCart = ({ id, title, thumbnail, price }: Product) => {
    const cartProduct = cartProducts.find((product) => product.id === id);
    if (cartProduct) {
      cartProduct.quantity += 1;
    } else {
      cartProducts.push({
        id,
        title,
        thumbnail,
        price,
        quantity: 1
      });
    }
  };
</script>

<Navbar>
  <Cart {cartProducts} />
</Navbar>

{#snippet productItem(product: Product)}
  <div class="overflow-hidden rounded-xl bg-white shadow-lg">
    <img src={product.thumbnail} alt={product.title} class="h-48 w-full object-cover" />
    <div class="p-4">
      <p class="mb-2 overflow-hidden truncate text-lg font-medium text-gray-800">
        {product.title}
      </p>
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">{product.price} ₽</p>
        <button
          class="rounded-full bg-sky-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-sky-700"
          onclick={() => {
            addToCart(product);
          }}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
{/snippet}

<div
  class="m-4 grid gap-6 rounded-box bg-base-100 p-8 shadow-xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
>
  {#each data.products as product (product.id)}
    {@render productItem(product)}
  {/each}
</div>
