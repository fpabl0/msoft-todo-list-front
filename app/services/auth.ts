import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthService extends Service {
  @tracked token: string | null = null;
  userName: string | null = null;

  get isLoggedIn() {
    return this.token !== null;
  }

  async login(email: string, password: string): Promise<void> {
    console.log(`TODO login `, { email, password });
    this.token = 'some-token';
    this.userName = email; // TODO set this just as an example
  }

  async register(name: string, email: string, password: string): Promise<void> {
    console.log('TODO register ', { name, email, password });
  }

  async logout(): Promise<void> {
    console.log('TODO logout');
    this.token = null;
    this.userName = null;
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:auth')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('auth') declare altName: AuthService;`.
declare module '@ember/service' {
  interface Registry {
    auth: AuthService;
  }
}
