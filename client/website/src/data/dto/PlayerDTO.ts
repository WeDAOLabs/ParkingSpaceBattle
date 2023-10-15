import { BaseDTO } from "./BaseDTO";

export class PlayerDTO extends BaseDTO {
  cardTokenIds: number[] = [];
  parkingTokenIds: number[] = [];

  public get hasParkings(): boolean {
    return this.parkingTokenIds.length > 0;
  }

  public get hasCars(): boolean {
    return this.cardTokenIds.length > 0;
  }
}
