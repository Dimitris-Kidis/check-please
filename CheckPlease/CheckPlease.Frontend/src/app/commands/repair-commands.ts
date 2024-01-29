export interface CreateRepairCommand {
  clientId: number;
  carId: number;
  problems: string;
  mileage: number;
  details: CreateDetailCommand[];
}

export interface CreateDetailCommand {
  detailName: string;
  pricePerOne: number;
  quantity: number;
  repairPrice: number;
}

export interface GetRepairsHistoryWithFilterCommand {
  isToday?: boolean;
  isYesterday?: boolean;
  date?: string | null;
  carSign: string;
}
