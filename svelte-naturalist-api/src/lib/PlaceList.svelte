<script lang="ts">
  import type { INaturalistPhoto, INaturalistPlace } from "../js/types.mts";

  let { places }: { places: INaturalistPlace[] } = $props();

  function getLargePhotoUrl(photo: INaturalistPhoto): string {
    const url =
      photo.large_url ||
      photo.medium_url ||
      photo.url ||
      photo.square_url ||
      "";

    // iNaturalist supports size variants even when only a thumbnail URL is returned.
    // Preserve the photo's host, file extension, and any query string.
    return url.replace(
      /\/(?:square|thumb|small|medium|large|original)(\.[^/?#]+)(?=[?#]|$)/,
      "/large$1",
    );
  }
</script>

{#snippet placeCard(place: INaturalistPlace)}
  {#each place.identifications?.results ?? [] as identification}
    {@const taxon = identification.observation?.taxon}
    {@const photo = taxon?.default_photo}
    {#if photo}
      <div
        class="card card-border min-w-0 w-full overflow-hidden border-base-300 bg-base-100 shadow-sm"
      >
        <figure class="aspect-4/3 border-b border-base-300 bg-base-200 p-4">
          <img
            src={getLargePhotoUrl(photo)}
            alt={taxon?.preferred_common_name ||
              taxon?.name ||
              "Observed organism"}
            class="h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div class="card-body gap-3 p-5 sm:p-6">
          <h2 class="card-title wrap-anywhere">{place.display_name}</h2>
          <p class="font-medium wrap-anywhere">
            {taxon?.preferred_common_name || taxon?.name}
          </p>
          <p class="text-sm text-base-content/70 wrap-anywhere">
            {photo.attribution}
          </p>
        </div>
      </div>
    {/if}
  {/each}
{/snippet}

{#if places.length > 0}
  <div
    class="grid w-full grid-cols-1 items-start gap-6 p-4 sm:p-6 md:grid-cols-2"
  >
    {#each places as place}
      {@render placeCard(place)}
    {/each}
  </div>
{:else}
  <div class="p-4 sm:p-6">
    <div class="card card-border border-base-300 bg-base-100">
      <div class="card-body text-center text-base-content/70">
        No Results Found
      </div>
    </div>
  </div>
{/if}
