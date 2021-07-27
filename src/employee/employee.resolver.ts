import { UpdateEmployeeInput } from './dto/update-employee.dto';
import { EmployeeCreateDto } from './dto/create-employee.input';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';
import { Project } from 'src/project/entities/project.entity';

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
  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.employeeService.findOne(id);
  }

  @ResolveField(() => Project)
  project(@Parent() employee: Employee) {
    return this.employeeService.getProject(employee.projectId);
  }
  @Mutation(() => Employee)
  updateEmployee(@Args('updateEmployee') updateEmployee: UpdateEmployeeInput) {
    return this.employeeService.update(updateEmployee.id, updateEmployee);
  }

  @Mutation(() => Employee)
  deleteEmployee(@Args('id') id: number) {
    return this.employeeService.delete(id);
  }
}
