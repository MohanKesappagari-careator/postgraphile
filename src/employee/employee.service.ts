import { UpdateEmployeeInput } from './dto/update-employee.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from 'src/project/project.service';
import { Repository } from 'typeorm';
import { EmployeeCreateDto } from './dto/create-employee.input';
import { Employee } from './entity/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private projectService: ProjectService,
  ) {}
  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }
  async create(employee: EmployeeCreateDto) {
    let emp = this.employeeRepository.create(employee);
    return this.employeeRepository.save(emp);
  }
  findOne(id: number) {
    return this.employeeRepository.findOne(id);
  }
  getProject(id: number) {
    return this.projectService.findOne(id);
  }
  async update(id: number, updateEmployee: UpdateEmployeeInput) {
    let employee = this.employeeRepository.create(updateEmployee);
    let up = await this.employeeRepository.update(
      { id: updateEmployee.id },
      employee,
    );
    if (up.affected === 1) {
      return employee;
    }
  }
  async delete(id: number) {
    let employee = this.employeeRepository.findOne(id);
    if (!employee) {
      throw new NotFoundException(`Record Not Found`);
    }
    let del = await this.employeeRepository.delete(id);
    if (del.affected === 1) {
      return del;
    }
  }
}
