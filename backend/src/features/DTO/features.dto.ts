import { IsNotEmpty, IsEnum, IsString } from 'class-validator';

export enum PaymentType {
  TRANSFERENCIA = 'transferencia',
  EFECTIVO = 'efectivo',
}

export enum InvoiceStatus {
  PENDIENTE = 'pendiente',
  PAGADO = 'pagado',
}

export class FeatureDto {
  @IsNotEmpty()
  @IsString()
  readonly clientName: string;

  @IsNotEmpty()
  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;

  @IsNotEmpty()
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  key: string;
  url: string;
}
