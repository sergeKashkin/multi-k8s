import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}

export class OrderOutBoxDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: 'pending' | 'shipped';

  @ApiProperty()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  @IsOptional()
  shippedAt?: Date;
}
