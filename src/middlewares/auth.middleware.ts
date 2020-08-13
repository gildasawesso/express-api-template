import { Action } from "routing-controllers";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Container } from 'typedi';
import { JwtService } from "../services/jwt.service";
import { AuthorizationChecker } from "routing-controllers/AuthorizationChecker";

export function isAuthorize(action: Action, roles: string[]): boolean {
  const token = getToken(action);
    return token != null;
}

export async function currentUser(action: Action): Promise<User> {
  const token = getToken(action);
  const jwtService = Container.get(JwtService);
  const { id } = jwtService.decodeToken(token);

  const userRepository = getRepository(User);
  return userRepository.findOne(id);
}

function getToken(action: Action) {
  const { headers, query } = action.request;
  if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
    return headers.authorization.split(' ')[1];
  }

  if (query && query.token) {
    return query.token;
  }

  return null;
}