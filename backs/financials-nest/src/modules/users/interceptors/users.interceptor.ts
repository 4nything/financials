import { User } from "@models/user";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: User | User[]) => {
        if (Array.isArray(data)) {
          return data.map((d) => this.mapUser(d));
        }
        return this.mapUser(data);
      }),
    );
  }

  mapUser(data: User) {
    const { password, ...user } = data;
    return user;
  }
}
