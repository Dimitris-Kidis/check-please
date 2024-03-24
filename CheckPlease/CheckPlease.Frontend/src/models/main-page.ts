export interface MainPageData {
  todayCarsNumber: number;
  masterIncome: number;
  assistantIncome: number;
  carList: CarListItem[];
}

export interface CarListItem {
  repairId: string;
  carSign: string;
}
