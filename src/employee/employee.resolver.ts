import { EmployeeCreateDto } from './dto/create-employee.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}
  @Query(() => [Employee], { name: 'AllEmployees' })
  findAll() {
    return this.employeeService.findAll();
  }
  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employeeInput') employeeInput: EmployeeCreateDto) {
    return this.employeeService.create(employeeInput);
  }
}
