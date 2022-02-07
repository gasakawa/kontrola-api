import { HeadquarterDTO } from 'data/dtos/headquarter-dto';
import { HeadquarterModel } from 'domain/models';

export const buildFakeHeadquarters = (): HeadquarterDTO[] => [
  { id: 1, name: 'Headquarter 1' },
  { id: 2, name: 'Headquarter 2' },
  { id: 3, name: 'Headquarter 3' },
];

export const buildFakeAllHeadquarters = (): HeadquarterModel[] => [
  { id: 1, name: 'Headquarter 1', phoneNumber: 'phone_number_1', address: 'address_1', company: 'company_1' },
  { id: 1, name: 'Headquarter 2', phoneNumber: 'phone_number_1', address: 'address_1', company: 'company_1' },
  { id: 1, name: 'Headquarter 3', phoneNumber: 'phone_number_1', address: 'address_1', company: 'company_1' },
];
