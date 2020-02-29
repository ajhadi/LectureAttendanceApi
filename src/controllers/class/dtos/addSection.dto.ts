import { IsString , IsDate, Matches} from 'class-validator';

export default class AddSectionDto {

    @IsString()
    public classId: string;

    @IsString()
    public teacherId: string;
    
    @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,{
      message: "date has an invalid time format. It must be in YYYY-MM-DD"
    })
    public date: Date;

    @Matches(/(^([0-1]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$)|(^([0-5]?\d):([0-5]?\d)$)|(^[0-5]?\d$)/,{
      message: "startTime has an invalid time format. It must be in hh:mm:ss"
    })
    public startTime: string;

    @Matches(/(^([0-1]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$)|(^([0-5]?\d):([0-5]?\d)$)|(^[0-5]?\d$)/,{
      message: "endTime has an invalid time format. It must be in hh:mm:ss"
    })
    public endTime: string
  }

}