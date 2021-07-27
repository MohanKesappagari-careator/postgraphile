import { EmployeeCreateDto } from './create-employee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput extends PartialType(EmployeeCreateDto) {
  @Field(() => Int)
  id: number;
}
