import { JsonController, Post, Body, Param, Get, getMetadataArgsStorage } from "routing-controllers";
import { Register } from "../models/register";
import { Inject } from "typedi";
import { AuthService } from "../services/auth.service";
import { SigninData } from "../models/signin";
import { User } from "../entity/User";
import { routingControllersToSpec } from "routing-controllers-openapi";

@JsonController("/auth")
export class AuthController {

  @Inject() authService: AuthService;

  @Post('/register')
  async register(@Body() user: User) {
    return this.authService.registerUser(user);
  }
  
  @Post('/signin')
  async signin(@Body() signinData: SigninData) {
    const { email, password } = signinData;
    return this.authService.authenticateUser(email, password);
  } 
  
  @Get('/renew/:token')
  async renew(@Param('token') token: string) {
    return await await this.authService.renewToken(token);
  }
}