<script lang="ts">
  import InlineField from "./InlineField.svelte";
  import { useInlineEdit } from "./useInlineEdit.svelte";

  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    username: "janedoe64",
    bio: "Frontend developer who loves Svelte.",
  };

  const edit = useInlineEdit(user, saveProfile);
  async function saveProfile(user: {
    name: string;
    email: string;
    username: string;
    bio: string;
  }) {
    console.log(JSON.stringify(user));
  }
</script>

<section class="profile" aria-labelledby="profile-heading">
  <header>
    <h2 id="profile-heading">User Profile</h2>
    <h3>
      <InlineField
        label="Full Name"
        bind:value={edit.draft.name}
        type="text"
        showLabel={false}
      />
    </h3>
  </header>
  <div class="profile-details">
    <InlineField label="Email:" bind:value={edit.draft.email} type="email" />
    <InlineField
      label="Username:"
      bind:value={edit.draft.username}
      type="text"
    />
  </div>
  <div class="profile-bio">
    <InlineField label="Bio:" bind:value={edit.draft.bio} type="textarea" />
  </div>
</section>

{#if edit.isDirty()}
  <button onclick={edit.save}>Save</button>
  <button onclick={edit.cancel}>Cancel</button>
{/if}

<style>
  .profile {
    box-sizing: border-box;
    width: min(100%, 42rem);
    margin: 1rem 0 2rem;
    padding: clamp(1rem, 4vw, 2rem);
    text-align: left;
    border: 1px solid var(--border);
    border-radius: 1rem;
    display: grid;
    gap: 1.5rem;
  }

  h2 {
    margin: 0;
    font-size: 1rem;
    color: var(--text);
  }

  h3 {
    margin: 0.5rem 0 0;
    color: var(--text-h);
    font-size: 1.5rem;
    font-weight: 500;
    overflow-wrap: anywhere;
  }

  .profile-details {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .profile-bio {
    border-top: 1px solid var(--border);
    padding-top: 1.25rem;
  }

  @media (max-width: 600px) {
    .profile-details {
      grid-template-columns: minmax(0, 1fr);
      gap: 1rem;
    }
  }
</style>
