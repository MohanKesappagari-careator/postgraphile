import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}
  create(createProjectInput: CreateProjectInput) {
    let pro = this.projectRepository.create(createProjectInput);
    return this.projectRepository.save(pro);
  }

  findAll() {
    return this.projectRepository.find({ relations: ['employee'] });
  }

  findOne(id: number) {
    return this.projectRepository.findOne(id, { relations: ['employee'] });
  }

  async update(id: number, updateProjectInput: UpdateProjectInput) {
    let project = this.projectRepository.create(updateProjectInput);
    let up = await this.projectRepository.update({ id: project.id }, project);
    if (up.affected === 1) {
      return project;
    }
  }

  async remove(id: number) {
    let project = this.projectRepository.findOne(id);
    if (!project) {
      throw new NotFoundException(`Record Not Found`);
    }
    let remove = await this.projectRepository.delete(id);
    if (remove.affected === 1) {
      return project;
    }
  }
}
