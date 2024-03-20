export interface SearchResult {
  carSign: string;
  vinCode: string;
  mileage: number;
  year: number;
  volume: string;
  brand: string;
  model: string;
  fullName: string;
  phoneNumber: string;
  jobTitle: string;
  id: number;
}

export interface CarSearchResult {
  carSign: string;
  vinCode: string;
  mileage: number;
  year: number;
  volume: string;
  brand: string;
  model: string;
}

export interface RepairHistory {
  id: number;
  carSign: string;
  vinCode?: string;
  mileage?: number;
  year?: number;
  volume?: string;
  brand?: string;
  model?: string;
  ownerPhoneNumber: string;
  repairationDate: string;
  problems?: string;
  details?: Details[];
}

export interface Details {
  detailName: string;
  pricePerOne?: number;
  quantity: number;
  detailsPrice: number;
  repairPrice: number;
  totalPrice: number;
}

export interface ClientSearchResult {
  fullName: string;
  phoneNumber: string;
  jobTitle: string;
}

export interface ClientHistory {
  id: number;
  fullName: string;
  phoneNumber: string;
}

export interface CarHistory {
  id: number;
  carSign: string;
  vinCode?: string;
  mileage?: number;
  year?: number;
  volume?: string;
  brand?: string;
  model?: string;
}

export interface RepairHistoryWithFilterResponse {
  id: number;
  carSign: string;
  date: string;
  mileage: number;
  details: Details[];
}
