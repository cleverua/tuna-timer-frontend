import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AppError } from "../models/app-error";

@Injectable()
export class AppErrorService {

  constructor(private router: Router) { }

  handleError(error: AppError) {
    console.log("APP_ERROR_SERVICE, code: ", error);
    //TODO clear storage depends on errors type.

    this.router.navigate(['/errors', error.errStatus]);
  }
}
