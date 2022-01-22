<script lang="ts">
  let count: number = 0;
  const increment = () => {
    count += 1;
  };
</script>

<div class="flex flex-row w-full px-5 py-2 justify-end align-middle">
  <button class="btn mr-3 hover:bg-orange-100 active:bg-red-500">Clear</button>
  <button class="btn hover:bg-orange-100 active:bg-indigo-500">Start</button>
</div>

<style lang="postcss">
  .btn {
    @apply bg-blue-200 text-slate-900 py-1 px-4 rounded transition-all ease-in-out;
  }
</style>
