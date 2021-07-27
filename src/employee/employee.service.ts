import { Injectable } from '@nestjs/common';
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
}
