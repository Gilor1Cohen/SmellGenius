export interface likesList {
  data: string[];
}

export interface PerfumeForm {
  PerfumeName: string;
}

export interface Perfume {
  id?: string;
  url: string;
  Perfume: string;
  Brand: string;
  Country: string;
  Gender: string;
  "Rating Value": string;
  "Rating Count": string;
  Year: string;
  Top: string;
  Middle: string;
  Base: string;
  Perfumer1: string;
  Perfumer2: string | null;
  mainaccord1: string;
  mainaccord2: string;
  mainaccord3: string;
  mainaccord4: string;
  mainaccord5: string;
}

export interface ShortPerfume {
  Perfume: string;
  Brand: string;
  Year: string | null;
}

export interface PerfumeFormRes {
  data: Perfume[];
}

export interface PerfumeInformationResData {
  PerfumeData: Perfume[];
  Like: boolean;
  SameBrand: ShortPerfume[];
  SimilarPerfumes: ShortPerfume[];
}

export interface PerfumeInformationRes {
  data: PerfumeInformationResData;
}

export interface BuyingRecommendationsData {
  Arr1Name: string;
  Arr1: ShortPerfume[];

  Arr2Name: string;
  Arr2: ShortPerfume[];

  Arr3Name: string;
  Arr3: ShortPerfume[];
}

export interface SmellsGroup {
  smellsData: ShortPerfume[];
}

export type DataGroup = BuyingRecommendationsData | SmellsGroup;

export interface BuyingRecommendationsDataRes {
  data: DataGroup[];
}
