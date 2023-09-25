export class CreateNewCar {
    carSign: string;
    vinCode?: string;
    mileage?: number;
    year?: number;
    model?: string;
    volume?: string;
    brand?: string;
    
    constructor(
        carSign: string,
        vinCode?: string,
        mileage?: number,
        year?: number,
        model?: string,
        volume?: string,
        brand?: string
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
    carId: number;
    mileage: number;

    constructor(
        carId: number,
        mileage: number
    ) {
        this.carId = carId;
        this.mileage = mileage;
    }
}