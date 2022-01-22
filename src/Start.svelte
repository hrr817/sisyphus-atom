<script lang="ts">
  import Board from "./lib/Board.svelte";
  import Controller from "./lib/Controller.svelte";
</script>

<main class="flex flex-col w-full h-full p-2">
  <Controller />
  <Board />
</main>

<style lang="postcss" global>
  @tailwind utilities;
  @tailwind components;
  @tailwind base;

  :root {
    font-size: 16px;
    font-family: monospace;
    box-sizing: border-box;
    color: white;
    background-color: #1b1a1a;
  }

  body {
    overflow: hidden;
  }

  #__pspspsps__ {
    width: 100%;
    height: 100%;
  }
</style>
