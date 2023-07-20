import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { ToasterService } from '../services/toaster.service'




export const authguardGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const toaster = inject(ToasterService);
  const router = inject(Router);
  if (auth.isLoggined()){
    return true;
  }
  else{
    toaster.showWarning("Operation denied please login","Warning");
    router.navigateByUrl("");
    return false;
  }
    


  return true;
};
