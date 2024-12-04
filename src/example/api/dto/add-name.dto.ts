import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddNameDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}
