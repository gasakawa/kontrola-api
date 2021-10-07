import { ICompanyPlanUsersRepository, IUserRepository } from 'data/protocols/db';
import { CompanyPlanUser } from 'domain/models';
import { inject, injectable } from 'tsyringe';

@injectable()
export class HandleCompanyPlanUserService {
  constructor(
    @inject('CompanyPlanUsersRepository')
    private readonly companyPlaUsersRepository: ICompanyPlanUsersRepository,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async create(companyPlanUser: CompanyPlanUser): Promise<boolean> {
    const created = await this.companyPlaUsersRepository.create(companyPlanUser);
    return created;
  }

  public async activate(id: number): Promise<boolean> {
    const active = await this.companyPlaUsersRepository.activate(id);
    return active;
  }

  public async inactivate(id: number): Promise<boolean> {
    const inactive = await this.companyPlaUsersRepository.inactivate(id);
    return inactive;
  }
}
