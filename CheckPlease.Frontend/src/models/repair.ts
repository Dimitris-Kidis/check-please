import { CarDto } from './car';
import { ClientDto } from './client';

export interface RepairDto {
  id?: string;
  problems?: string;
  mileage?: number;
  clientId?: string;
  client?: ClientDto;
  car?: CarDto;
  carId?: string;
  additionalNotes?: string;
  totalRepairPrice?: number;
  repairDate?: string;
  isSentToBot?: boolean;
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: string;
  lastModifiedAt?: string;
  details?: DetailDto[];
}

export interface DetailDto {
  id?: string;
  detailName?: string;
  pricePerOne?: number;
  quantity?: number;
  detailsPrice?: number;
  repairPrice?: number;
  totalPrice?: number;
  repairId?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: string;
  lastModifiedAt?: string;
}
