import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

export class DeleteRes implements DeleteResult {
  @ApiProperty()
  raw: number | null;

  @ApiPropertyOptional()
  affected?: number;
}
