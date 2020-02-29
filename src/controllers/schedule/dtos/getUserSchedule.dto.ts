import { IsString } from 'class-validator';

export default class GetUserScheduleDto {
  @IsString()
    public id: string;
  }

}