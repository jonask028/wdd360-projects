/** Shared pagination envelope returned by iNaturalist v1 list endpoints. */
export interface INaturalistResponse {
  total_results: number;
  page: number;
  per_page: number;
  results: any[];
}

export type ISODateString = string;

export type ObservationQualityGrade = "casual" | "needs_id" | "research";
export type IdentificationCategory =
  | "improving"
  | "leading"
  | "maverick"
  | "supporting";
export type ModeratorActionType =
  | "hide"
  | "rename"
  | "unhide"
  | "suspend"
  | "unsuspend";

export interface DateDetails {
  date: string;
  day: number;
  hour: number;
  month: number;
  week: number;
  year: number;
}

export interface INaturalistUser {
  id: number;
  login: string;
  name: string;
  icon: string | null;
  icon_url: string | null;
  created_at: ISODateString;
  identifications_count: number;
  observations_count: number;
  species_count: number;
  journal_posts_count: number;
  orcid: string | null;
  roles: string[];
  site_id: number;
  spam: boolean;
  suspended: boolean;
}

export interface INaturalistPlace {
  id: number;
  name: string;
  display_name: string;
  admin_level?: number;
  ancestor_place_ids?: number[];
  bbox_area?: number;
  location?: string;
  place_type?: number;
  geometry_geojson?: INaturalistPolygonGeoJSON;
  identifications?: IdentificationsResponse;
}

export interface INaturalistPolygonGeoJSON {
  type: "Polygon" | "MultiPolygon" | string;
  coordinates: number[][][][];
}

/** Response from GET /v1/places/autocomplete. */
export interface PlaceAutocompleteResponse extends INaturalistResponse {
  results: INaturalistPlace[];
}

export interface INaturalistTaxon {
  id: number;
  iconic_taxon_id: number | null;
  iconic_taxon_name: string | null;
  is_active: boolean;
  name: string;
  preferred_common_name?: string;
  rank: string;
  rank_level: number;
  ancestor_ids?: number[];
  default_photo?: INaturalistPhoto | null;
  ancestry?: string;
  endemic?: boolean;
  introduced?: boolean;
  native?: boolean;
  threatened?: boolean;
  conservation_status?: INaturalistConservationStatus | null;
  establishment_means?: INaturalistEstablishmentMeans | null;
}

export interface INaturalistConservationStatus {
  source_id?: number;
  authority?: string;
  status?: string;
  status_name?: string;
  iucn?: number;
  geoprivacy?: string | null;
}

export interface INaturalistEstablishmentMeans {
  establishment_means: string;
  place: Pick<INaturalistPlace, "id" | "name" | "display_name">;
}

export interface INaturalistPhoto {
  id: number;
  attribution: string;
  license_code: string | null;
  url: string;
  large_url?: string;
  medium_url?: string;
  square_url?: string;
}

export interface INaturalistSound {
  id: number;
  attribution: string;
  license_code: string | null;
  file_url: string;
  file_content_type: string;
}

export interface INaturalistGeoJSON {
  type: "Point" | string;
  /** GeoJSON order is [longitude, latitude]. */
  coordinates: [number, number];
}

export interface INaturalistObservationPhoto {
  id: number;
  uuid: string;
  photo: INaturalistPhoto;
  position: number;
}

export interface INaturalistAnnotation {
  uuid: string;
  controlled_attribute_id: number;
  controlled_value_id: number;
  concatenated_attr_val: string;
  user: INaturalistUser;
  user_id: number;
  vote_score: number;
  votes: INaturalistVote[];
}

export interface INaturalistComment {
  id: number;
  body: string;
  created_at: ISODateString;
  created_at_details: DateDetails;
  user: INaturalistUser;
  flags: INaturalistFlag[];
  hidden: boolean;
  moderator_actions: INaturalistModeratorAction[];
  uuid: string;
}

/** Taxonomic change associated with an identification, when present. */
export interface INaturalistTaxonChange {
  id: number;
  type: string;
}

/** An identification returned by iNaturalist v1. */
export interface INaturalistIdentification {
  id: number;
  observation_id: number;
  /** Included by the identifications search endpoint. */
  observation?: INaturalistObservation;
  body: string | null;
  category: IdentificationCategory;
  created_at: ISODateString;
  updated_at: ISODateString;
  current: boolean;
  taxon: INaturalistTaxon;
  previous_observation_taxon?: INaturalistTaxon | null;
  user: INaturalistUser;
  uuid: string;
  created_at_details: DateDetails;
  flags: INaturalistFlag[];
  own_observation: boolean;
  taxon_change?: INaturalistTaxonChange | null;
  vision: boolean;
  disagreement: boolean;
  previous_observation_taxon_id?: number | null;
  spam: boolean;
  hidden: boolean;
  moderator_actions: INaturalistModeratorAction[];
}

/** Summary identification included in an observation's non_owner_ids. */
export interface INaturalistNonOwnerIdentification {
  id: number;
  body: string | null;
  created_at: ISODateString;
  created_at_details: DateDetails;
  user: INaturalistUser;
}

export interface INaturalistFieldValue {
  name: string;
  value: string;
}

export interface INaturalistFlag {
  id: number;
  flag: string;
  comment: string;
  resolved: boolean;
  user: INaturalistUser;
  created_at: ISODateString;
}

export interface INaturalistModeratorAction {
  id: number;
  created_at: ISODateString;
  created_at_details: DateDetails;
  user: INaturalistUser;
  action: ModeratorActionType;
  reason: string;
}

export interface INaturalistFave {
  id: number;
  votable_id: number;
  created_at: ISODateString;
  user: INaturalistUser;
}

export interface INaturalistQualityMetric {
  id: number;
  user_id: number;
  metric: string;
  agree: boolean;
}

export interface INaturalistOutlink {
  id: number;
  source: string;
  url: string;
}

export interface INaturalistProjectObservation {
  id: number;
  project_id: number;
  observation_id: number;
  curator_identification_id: number | null;
  tracking_code: string | null;
  prefers_curator_coordinate_access: boolean;
}

export interface INaturalistVote {
  id: number;
  user_id: number;
  vote_flag: boolean;
  vote_scope: string;
  created_at: ISODateString;
}

export interface INaturalistObservation {
  id: number;
  uuid: string;
  uri: string;
  captive: boolean;
  description: string | null;
  species_guess: string | null;
  taxon: INaturalistTaxon | null;
  community_taxon_id: number | null;
  user: INaturalistUser;
  quality_grade: ObservationQualityGrade;
  observed_on: string | null;
  observed_on_string: string | null;
  observed_on_details: DateDetails | null;
  observed_time_zone: string | null;
  time_observed_at: ISODateString | null;
  time_zone_offset: string | null;
  created_at: ISODateString;
  created_at_details: DateDetails;
  created_time_zone: string;
  updated_at: ISODateString;
  place_guess: string | null;
  location: string | null;
  private_location?: string | null;
  geojson: INaturalistGeoJSON | null;
  private_geojson?: INaturalistGeoJSON | null;
  mappable: boolean;
  obscured: boolean;
  geoprivacy: string | null;
  taxon_geoprivacy: string | null;
  positional_accuracy: number | null;
  public_positional_accuracy: number | null;
  place_ids: number[];
  private_place_ids?: number[];
  project_ids: number[];
  project_ids_with_curator_id: number[];
  project_ids_without_curator_id: number[];
  photos: INaturalistPhoto[];
  observation_photos: INaturalistObservationPhoto[];
  sounds: INaturalistSound[];
  annotations: INaturalistAnnotation[];
  comments: INaturalistComment[];
  comments_count: number;
  identifications: INaturalistIdentification[];
  non_owner_ids?: INaturalistNonOwnerIdentification[];
  identifications_count: number;
  num_identification_agreements: number;
  num_identification_disagreements: number;
  identification_disagreements_count: number;
  ofvs: INaturalistFieldValue[];
  quality_metrics: INaturalistQualityMetric[];
  flags: INaturalistFlag[];
  faves: INaturalistFave[];
  outlinks: INaturalistOutlink[];
  project_observations: INaturalistProjectObservation[];
  votes: INaturalistVote[];
  tags: string[];
  faves_count: number;
  cached_votes_total: number;
  id_please: boolean;
  out_of_range: boolean | null;
  verifiable: boolean;
  spam: boolean;
}

/** Response from GET /v1/observations. */
export interface ObservationsResponse extends INaturalistResponse {
  results: INaturalistObservation[];
}

/** Response from GET /v1/identifications or GET /v1/identifications/{id}. */
export interface IdentificationsResponse extends INaturalistResponse {
  results: INaturalistIdentification[];
}

/** Alias matching the endpoint's domain terminology. */
export type ObservationResponse = ObservationsResponse;
