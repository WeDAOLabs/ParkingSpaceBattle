import { BaseDTO } from "./BaseDTO";
import { CarDTO } from "./CarDTO";
import { ParkingDTO } from "./ParkingDTO";

export class PlayerDTO extends BaseDTO {
  address: string = "";

  parkings: ParkingDTO[] = [];
  cars: CarDTO[] = [];

  public get hasParkings(): boolean {
    return this.parkings.length > 0;
  }

  public get hasCars(): boolean {
    return this.cars.length > 0;
  }
}
