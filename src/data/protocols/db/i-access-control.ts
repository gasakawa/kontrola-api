export interface IAccessControlRepository {
  create(userId: string, headquarterId: number): Promise<boolean>;
}
