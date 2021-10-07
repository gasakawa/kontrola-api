import { ICompanyPlanPaymentControlRepository, IUserRepository } from 'data/protocols/db';
import { CompanyPlanPaymentControl } from 'domain/models';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCompanyPlanPaymentControlService {
  constructor(
    @inject('CompanyPlanPaymentControlRepository')
    private readonly companyPlanPaymentControlRepository: ICompanyPlanPaymentControlRepository,
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async create(companyPlanPaymentControl: CompanyPlanPaymentControl): Promise<boolean> {
    const created = await this.companyPlanPaymentControlRepository.create(companyPlanPaymentControl);
    if (created) {
      await this.userRepository.activate(companyPlanPaymentControl.userId);
    }
    return created;
  }
}
