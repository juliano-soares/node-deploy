import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John tre',
      email: 'johntre@doe.com',
    });

    expect(updateUser.name).toBe('John tre');
    expect(updateUser.email).toBe('johntre@doe.com');
  });

  it('should not be able update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'John tre',
        email: 'johntre@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@doe.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John tre',
        email: 'john@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John tre',
      email: 'johntre@doe.com',
      old_password: '123456',
      password: '123456',
    });

    expect(updateUser.password).toBe('123456');
  });

  it('should not be able update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John tre',
        email: 'johntre@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John tre',
        email: 'johntre@doe.com',
        password: '123456',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
