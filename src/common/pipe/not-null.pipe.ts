// not-null.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class NotNullPipe implements PipeTransform<any> {
  transform(value: any) {
    if (value === null || value === undefined) {
      throw new BadRequestException("Request body cannot be null or undefined");
    }
    return value;
  }
}
