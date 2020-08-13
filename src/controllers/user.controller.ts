import { JsonController, Authorized, getMetadataArgsStorage, Get, CurrentUser } from "routing-controllers";
import { BaseController } from "./base.controller";
import { User } from "../entity/User";

@Authorized()
@JsonController('/users')
export class UserController extends BaseController {

  constructor() {
    super(User); 
  }

  @Get('/me')
  async getMe(@CurrentUser() user: User) {
    return user;
  }
}