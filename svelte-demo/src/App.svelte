<script lang="ts">
  import { onMount } from "svelte";
  import Post from "./lib/Post.svelte";
  import TagList from "./lib/TagList.svelte";
  let name = $state("world");
  let posts: Post[] = [];
  let filteredPosts: Post[] = $state([]);
  let searchString = "";
  let tags = $state([]);
  const url = "https://dummyjson.com/posts/";

  function getTagList(posts: Post[]) {
    const allTags = posts.map((post: Post) => post.tags).flat();
    const uniqueTags = new Set(allTags);
    return [...uniqueTags];
  }

  async function getPosts(url: string) {
    const response = await fetch(url);
    return response.json();
  }
  async function init() {
    const data = await getPosts(url);
    posts = data.posts;
    filteredPosts = posts;
    console.log(data);
    tags = getTagList(posts);
  }

  function search(term) {
    searchString = term;
    console.log("searchHandler", term, searchString);
    filteredPosts = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchString.toLowerCase()) ||
        post.body.toLowerCase().includes(searchString.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchString.toLowerCase()),
        )
      );
    });
  }

  function handleSearchKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      search(searchString);
    }
  }

  onMount(() => init());
</script>

<main>
  <h1>Hello!</h1>
  <section>
    <label for="search"> Search Posts </label>
    <input
      type="text"
      bind:value={searchString}
      onkeydown={handleSearchKeydown}
    /><button onclick={() => search(searchString)}>Search</button>
    <TagList {tags} handleClick={search} />
  </section>
  {#each filteredPosts as post}
    <Post {post} />
  {/each}
</main>

<style>
  main {
    font-family: courier;
  }
</style>
