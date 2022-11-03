import { AuthService } from "src/app/auth/auth.service";

export function appInitializer(authenticationService: AuthService) {
  return () => new Promise((resolve:any) => {
      // attempt to refresh token on app start up to auto authenticate
      // authenticationService.refreshToken()
      //     .subscribe()
      //     .add(resolve);
      resolve(true)
  });
}
