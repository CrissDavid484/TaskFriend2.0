import { CanActivateFn } from '@angular/router';

export const sinAutenticacionGuard: CanActivateFn = (route, state) => {
  return true;
};
