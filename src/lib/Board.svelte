<script lang="ts">
  // IMPORTS
  import { onMount, onDestroy, afterUpdate } from "svelte";

  // CONSTANTS
  const BOX_MIN_SIZE = 20;
  const BOX_MAX_SIZE = 80;
  const GRID_MIN_GAP = 0;

  // VARIABLES
  let board: HTMLElement = null;
  let boardWidth: number = 0;
  let boardHeight: number = 0;
  let boxSize: number = BOX_MIN_SIZE;
  let GRID_GAP: number = 5;

  // GRID VARIABLES
  let rows: number = 0;
  let columns: number = 0;

  // REACTIVITY
  $: {
    if (board) {
      rows = Math.round(boardWidth / boxSize);
      columns = Math.floor(boardHeight / boxSize);

      console.log(rows, columns);

      board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      board.style.gap = `${GRID_GAP}px`;
    }
  }

  // FUNCTIONS
  function setBoardSize() {
    boardWidth = board.clientWidth;
    boardHeight = board.clientHeight;
  }

  function resizeBox(e: WheelEvent) {
    const { deltaY } = e;

    if (deltaY > 0) {
      if (boxSize >= BOX_MIN_SIZE) boxSize--;
    } else {
      if (boxSize <= BOX_MAX_SIZE) boxSize++;
    }
  }

  function initialzeBoard() {
    board = document.getElementById("board");
    setBoardSize(); // set initial board size

    window.addEventListener("resize", setBoardSize);
    board.addEventListener("wheel", resizeBox);
  }

  function destryBoard() {
    window.removeEventListener("resize", setBoardSize);
    board.removeEventListener("wheel", resizeBox);
  }

  // LIFECYCLE FUNCTIONS
  onMount(() => {
    initialzeBoard();
  });

  onDestroy(() => {
    destryBoard();
  });

  afterUpdate(() => {});
</script>

<div id="board" class="grid w-full h-full border-2 border-neutral-700 p-1">
  {#each Array(rows) as i}
    {#each Array(columns) as j}
      <span class="box w-full h-full bg-neutral-600 rounded" />
    {/each}
  {/each}
</div>

<style>
  .box {
    content: "";
  }
</style>
