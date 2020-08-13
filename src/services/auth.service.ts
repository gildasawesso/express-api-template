import { Service, Inject } from "typedi";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { genSalt, hash, compare } from 'bcrypt';
import { JwtService } from "./jwt.service";
import { SigninData } from "../models/signin";

@Service()
export class AuthService {

  @Inject() jwtService: JwtService;

  async isUserEmailOrUsernameExist(email: string, username: string): Promise<boolean> {
    const userRepository = getRepository(User);

    const userFetched = await userRepository.findOne({ where: { email } });
    if (userFetched != null) { return true; }
  
    const userFetchedByUsername = await userRepository.findOne({ where: { username } });
    if (userFetchedByUsername != null) { return true; }

    return false;
  }
  
  async registerUser(newUser: User) {
    if (await this.isUserEmailOrUsernameExist(newUser.email, newUser.username)) {
      throw new Error('User email existe already');
    } else {
      const salt = await genSalt(10);
      const hashedPassword = await hash(newUser.password, salt);

      const userRepository = getRepository(User);
      newUser.password = hashedPassword;
      const user = userRepository.create(newUser);
      const { id } = await userRepository.save(user);
  
      return this.jwtService.generateToken({ id }, { id });
    }
  }
  
  async authenticateUser(emailSubmitted: string, passwordSubmitted: string) {
    if (await this.isUserEmailOrUsernameExist(emailSubmitted, passwordSubmitted)) {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { email: emailSubmitted }});
      const isSamePassword = await compare(passwordSubmitted, user.password);
  
      if (isSamePassword) {
        const tokenData = this.jwtService.generateToken({ id: user.id }, { id: user.id });

        const signinData = new SigninData();
        signinData.id = user.id;
        signinData.email = user.email;
        signinData.username = user.username;
        signinData.firstname = user.firstname;
        signinData.lastname = user.lastname;
        signinData.accessToken = tokenData.accessToken;
        signinData.refreshToken = tokenData.refreshToken;
        signinData.expiresIn = tokenData.expiresIn;
  
        return signinData;
      }
      throw new Error('Email or password is incorrect');
    } else {
      throw new Error("User email doesn't exsit");
    }
  }
  
  async renewToken(refresToken: string) {
    const { id } = this.jwtService.decodeToken(refresToken);
    const userRepository = getRepository(User);
    const { email } = await userRepository.findOne(id);
  
    return this.jwtService.generateToken({ id }, { id });
  }
}