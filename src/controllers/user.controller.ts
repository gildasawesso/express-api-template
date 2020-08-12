import { JsonController } from "routing-controllers";
import { BaseController } from "./base.controller";
import { User } from "../entity/User";

@JsonController('/users')
export class UserController extends BaseController {

  constructor() {
    super(User); 
  }
  
}