<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="preview">
	{@render children()}
</div>
