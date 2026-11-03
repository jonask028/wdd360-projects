<script lang="ts">
  let { tags = [], className = "", handleClick = () => {} } = $props();
</script>

<div>
  {#each tags as tag}
    <button onclick={() => handleClick(tag)}>{tag}</button>
  {/each}
</div>

<style>
  div {
    display: flex;
    list-style-type: none;
    flex-wrap: wrap;
    font-size: 0.8em;
    padding-left: 0;
  }
  button {
    padding: 0.5em 0.5em;
    border: 1px solid;
    background: transparent;
  }
</style>
