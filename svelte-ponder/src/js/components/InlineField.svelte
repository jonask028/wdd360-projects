<script lang="ts">
  let {
    label,
    value = $bindable(),
    type,
    showLabel = true,
  }: {
    label: string;
    value: string;
    type: "text" | "email" | "textarea";
    showLabel?: boolean;
  } = $props();

  let isEditing: boolean = $state(false);
  let originalValue: string;
  let buttonRef: any = $state();
  let inputRef: any = $state();

  function startEdit() {
    isEditing = true;
    originalValue = value;
    inputRef.focus();
  }

  function cancelEdit() {
    isEditing = false;
    buttonRef.focus();
    value = originalValue;
  }

  function commitEdit() {
    isEditing = false;
    buttonRef.focus();
    console.log(`Saved: ${value}`);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startEdit();
    }
  }

  function handleInputKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && type !== "textarea") {
      event.preventDefault();
      commitEdit();
    } else if (event.key === "Escape") {
      cancelEdit();
    }
  }
</script>

{#snippet input()}
  {#if isEditing}
    {#if type == "textarea"}
      <textarea
        class="inline-input"
        aria-label="{label} text area"
        bind:this={inputRef}
        bind:value
        onblur={commitEdit}
        onkeydown={handleInputKeydown}></textarea>
    {:else}
      <input
        class="inline-input"
        aria-label="{label} input"
        {type}
        bind:this={inputRef}
        bind:value
        onblur={commitEdit}
        onkeydown={handleInputKeydown}
      />
    {/if}
  {:else}
    <button
      class="inline-field"
      class:full-width={type === "textarea"}
      aria-label="Edit {label}"
      bind:this={buttonRef}
      onclick={startEdit}
      tabindex="0"
      onkeydown={handleKeydown}
      >{value}
    </button>
  {/if}
{/snippet}

{#if showLabel}
  <label class="field"
    >{label}
    <span class="field-content">
      {@render input()}
    </span>
  </label>
{:else}
  {@render input()}
{/if}

<style>
  .field {
    display: block;
    min-width: 0;
    text-align: left;
  }
  .field-content {
    display: block;
    margin-top: 0.25rem;
    overflow-wrap: anywhere;
  }
  .inline-field,
  .inline-input {
    display: inline-block;
    box-sizing: border-box;
    min-width: 0;
    max-width: 100%;
    font: inherit;
    color: inherit;
    vertical-align: baseline;
    padding: 0.25em 0.35em;
    border: 0;
    border-bottom: 1px dashed color-mix(in srgb, var(--text) 55%, transparent);
    border-radius: 0.2em 0.2em 0 0;
    background: transparent;
    cursor: text;
    transition:
      border-color 150ms ease,
      background-color 150ms ease;
  }

  .inline-field:hover,
  .inline-field:focus-visible,
  .inline-input:hover,
  .inline-input:focus {
    border-bottom-color: var(--accent);
    background-color: var(--accent-bg);
  }

  .inline-field:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  .inline-input {
    border-bottom-style: solid;
    outline: none;
    box-shadow: none;
  }

  .inline-input:focus {
    box-shadow: 0 1px 0 var(--accent);
  }

  textarea.inline-input,
  .inline-field.full-width {
    display: block;
    width: 100%;
  }

  textarea.inline-input {
    min-height: 5em;
    resize: vertical;
  }

  @media (prefers-reduced-motion: reduce) {
    .inline-field,
    .inline-input {
      transition: none;
    }
  }
</style>
