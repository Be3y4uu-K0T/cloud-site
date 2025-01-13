<script lang="ts">
  import type { CartProduct } from '$lib/types';
  import Minus from 'phosphor-svelte/lib/Minus';
  import X from 'phosphor-svelte/lib/X';
  import Plus from 'phosphor-svelte/lib/Plus';
  import Trash from 'phosphor-svelte/lib/Trash';

  type Props = {
    cartProducts: CartProduct[];
  };

  const { cartProducts: products }: Props = $props();

  const count = $derived(
    products.reduce((accumulator, product) => accumulator + product.quantity, 0)
  );
  const total = $derived(
    products.reduce((accumulator, product) => accumulator + product.price, 0).toFixed(2)
  );

  const removeItem = (index: number) => {
    // TODO: add delete state and timeout to return back
    products.splice(index, 1);
  };
</script>

<svelte:window
  onclick={(event) => {
    const element = (event!.target as HTMLElement).closest('#cart');
    const cart = document.querySelector('#cart')!;
    if (element !== cart) {
      cart.classList.remove('dropdown-open');
    }
  }}
/>

{#snippet cartIcon(count: number)}
  <div class="indicator">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>

    <span class="badge indicator-item badge-sm">{count}</span>
  </div>
{/snippet}

{#snippet cartProduct(index: number, product: CartProduct)}
  <div class="flex items-center justify-between border-b border-gray-200 py-2">
    <div class="flex items-center overflow-hidden">
      <img
        src={product.thumbnail}
        alt="Product {product.title}"
        class="mr-4 size-12 rounded object-cover"
      />
      <div class="overflow-hidden">
        <p class="overflow-hidden text-ellipsis whitespace-nowrap font-medium">
          {product.title}
        </p>
        <p class="text-sm">{product.price} ₽ за 1 шт.</p>
      </div>
    </div>
    <div class="flex content-center items-center">
      <button
        class="group rounded p-1 hover:bg-gray-200 disabled:hover:bg-gray-100"
        disabled={product.quantity === 1}
        aria-label="Уменьшить товар на 1 шт."
        onclick={() => product.quantity--}
      >
        <Minus class="size-4 group-disabled:fill-gray-200" />
      </button>
      <span class="mx-2 w-2">
        {product.quantity}
      </span>
      <button
        class="rounded p-1 hover:bg-gray-200"
        aria-label="Увеличить товар на 1 шт."
        onclick={() => product.quantity++}
      >
        <Plus class="size-4" />
      </button>
      <button
        class="ml-4 rounded p-1 text-red-500 hover:bg-red-100"
        aria-label="Удалить товар"
        onclick={() => removeItem(index)}
      >
        <Trash class="size-4" />
      </button>
    </div>
  </div>
{/snippet}

<div id="cart" class="dropdown dropdown-end">
  <button
    class="btn btn-circle btn-ghost m-1"
    aria-label="Открыть/закрыть корзину"
    onclick={(event) => {
      const cart = (event.target as HTMLButtonElement).closest('#cart') as HTMLDivElement;
      cart.classList.toggle('dropdown-open');
    }}
  >
    {@render cartIcon(count)}
  </button>
  <div class="card dropdown-content card-compact z-[1] mt-3 w-80 bg-base-100 shadow">
    <div class="card-body">
      <h2 class="mb-2 text-lg font-semibold">Корзина</h2>
      <button
        class="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
        aria-label="Закрыть коризну"
        onclick={(event) => {
          const cart = (event.target as HTMLButtonElement).closest('#cart') as HTMLDivElement;
          cart.classList.remove('dropdown-open');
        }}
      >
        <X class="size-4" />
      </button>
      {#each products as product, index (product.id)}
        {@render cartProduct(index, product)}
      {:else}
        <p class="text-neutral-content mx-auto">Ничего нет :(</p>
      {/each}
      <div class="border-gray-200 pt-2">
        <span class="font-semibold text-info">Сумма: {total} ₽</span>
        <span class="text-info">Количество: {count} шт.</span>
      </div>
    </div>
  </div>
</div>
