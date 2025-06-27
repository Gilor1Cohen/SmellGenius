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

export interface PerfumeFormRes {
  data: Perfume[];
}

export interface PerfumeInformationResData {
  PerfumeData: Perfume[];
  Like: boolean;
  SameBrand: Perfume[];
  SimilarPerfumes: Perfume[];
}

export interface PerfumeInformationRes {
  data: PerfumeInformationResData;
}
