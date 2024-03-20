export class CreateNewCar {
  public carSign: string;
  public vinCode?: string;
  public mileage?: number;
  public year?: number;
  public model?: string;
  public volume?: string;
  public brand?: string;

  public constructor(
    carSign: string,
    vinCode?: string,
    mileage?: number,
    year?: number,
    model?: string,
    volume?: string,
    brand?: string,
  ) {
    this.carSign = carSign;
    this.vinCode = vinCode;
    this.mileage = mileage;
    this.year = year;
    this.model = model;
    this.volume = volume;
    this.brand = brand;
  }
}

export class UpdateMileageCommand {
  public carId: number;
  public mileage: number;

  public constructor(carId: number, mileage: number) {
    this.carId = carId;
    this.mileage = mileage;
  }
}
