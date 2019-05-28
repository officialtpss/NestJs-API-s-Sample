import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {

  @ApiModelProperty()
  readonly name: string;

  @ApiModelPropertyOptional()
  readonly password?: string;
}
