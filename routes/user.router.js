// // signUpUser

import { Router } from "express";
import * as usercontrol from '../controllers/user.controller.js'


const router = Router()
// //*sign up
app.post('/signUp',usercontrol.signUp)