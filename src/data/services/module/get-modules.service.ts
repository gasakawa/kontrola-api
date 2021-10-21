import { IModuleRepository } from 'data/protocols/db';
import { Module } from 'domain/models';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetModuleService {
  constructor(
    @inject('ModuleRepository')
    private readonly moduleRepository: IModuleRepository,
  ) {}

  public async list(userId: string): Promise<Module[]> {
    const modules = await this.moduleRepository.list(userId);
    return modules;
  }
}
