import { IsString } from 'class-validator';

export default class CreateClassDto {
  @IsString()
    public name: string;
  }

}