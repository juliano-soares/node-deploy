import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFinAllProvidersDTO from '../dtos/IFinAllProvidersDTO';

export default interface IUserRepository {
  findAllProviders(data: IFinAllProvidersDTO): Promise<User[]>;
  findByID(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
