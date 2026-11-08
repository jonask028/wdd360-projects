<script lang="ts">
  import type {
    INaturalistPlace,
    PlaceAutocompleteResponse,
    IdentificationsResponse,
  } from "./js/types.mjs";
  import PlaceList from "./lib/PlaceList.svelte";

  let searchString = $state("");
  let places: INaturalistPlace[] = $state([] satisfies INaturalistPlace[]);
  let searchResults: INaturalistPlace[] = $state(
    [] satisfies INaturalistPlace[],
  );

  async function getPlaces(searchString: string) {
    console.log("get places called with " + $state.snapshot(searchString));
    const response = await fetch(
      `https://api.inaturalist.org/v1/places/autocomplete?q=${searchString}`,
    );
    const data: PlaceAutocompleteResponse = await response.json();
    searchResults = data.results;
    const placesIdentifications = await Promise.all(
      searchResults.map(async (place) => ({
        ...place,
        identifications: await getIdentifications(place.id),
      })),
    );
    places = placesIdentifications;
    console.log(places);
  }

  async function getIdentifications(
    placeID: number,
  ): Promise<IdentificationsResponse> {
    const response = await fetch(
      `https://api.inaturalist.org/v1/identifications?place_id=${placeID}`,
    );
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    const data: IdentificationsResponse = await response.json();

    return {
      ...data,
      results: data.results.filter((identification) => {
        const photo = identification.observation?.taxon?.default_photo;
        return Boolean(
          photo?.large_url || photo?.medium_url || photo?.url || photo?.square_url,
        );
      }),
    };
  }

  async function handleKeyDown(event: KeyboardEvent) {
    if (event.key == "Enter") {
      event.preventDefault();
      await getPlaces(searchString);
    }
  }
</script>

<label class="input">
  <svg
    class="h-[1em] opacity-50"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <g
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input
    type="search"
    class="grow"
    placeholder="Search"
    bind:value={searchString}
    onkeydown={handleKeyDown}
  />
</label>
<main>
  <PlaceList {places} />
</main>
