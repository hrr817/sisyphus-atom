<script lang="ts">
  // IMPORTS
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { get } from "svelte/store";

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

  // DATA VARIABLES
  let running: boolean = false;
  let boardData: Array<Array<number>> = [];
  let startPoints: Map<string, boolean> = new Map();

  // REACTIVITY
  $: {
    if (board) {
      rows = Math.floor(boardHeight / boxSize);
      columns = Math.round(boardWidth / boxSize);

      boardData = Array(rows).fill(0).map(() => Array(columns).fill(0));

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

  // Events handlers

  // On Cell click
  function handleCellClick(e: MouseEvent, i: number, j: number) {
    if (running) return;

    if (startPoints.get(`${i}-${j}`)) startPoints.set(`${i}-${j}`, false);
    else startPoints.set(`${i}-${j}`, true);

    startPoints = startPoints
  }

  // Handle Reset
  function reset() {
    running = false;
    boardData = Array(rows).fill(0).map(() => Array(columns).fill(0));
    startPoints.clear();
  }
</script>

<div
  id="board"
  class="grid w-full h-full rounded border-2 border-neutral-700 p-1"
>
  {#each Array(rows) as _, i}
    {#each Array(columns) as _, j}
      <span
        class="box{
        running ?
          boardData[i][j] ? ' bg-green-500': '' :
          startPoints.get(`${i}-${j}`) ? ' selected': ''
        }"
        on:click={(e) => handleCellClick(e, i, j)}
      />
    {/each}
  {/each}
</div>

<style lang="postcss">
  .box {
    @apply w-full h-full bg-neutral-600 rounded cursor-pointer hover:bg-blue-300;
  }

  .selected {
    @apply bg-violet-400 !important;
  }
</style>
