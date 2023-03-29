import { compare } from 'bcryptjs';
import { AuthUserDTO } from '../dtos/AuthUserDTO';
import UsersRepository from '../repositories/UsersRepository';
import { sign } from 'jsonwebtoken';

class AuthUserUseCase {
  async execute({ email, password }: AuthUserDTO) {
    if (!email)
      throw new Error('E-mail is requred');

    if (!password)
      throw new Error('Password is requred');

    const user = await UsersRepository.findByEmail({ email });
    if (!user)
      throw new Error('Incorrect e-mail or password ');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch)
      throw new Error('Incorrect e-mail or password ');

    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    );

    return ({
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    });
  }
}

export default new AuthUserUseCase();
