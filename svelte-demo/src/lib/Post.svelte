<script lang="ts">
  import TagList from "./TagList.svelte";
  let { post = {} } = $props();
</script>

<section>
  <h2>
    {post.title}
  </h2>
  <TagList tags={post.tags} />
  <p>
    {post.body}
  </p>
</section>

<style>
  section {
    margin: 1em 0;
  }
</style>
