import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(private authService: AuthService) {}

  title = 'local-store-app';
  get isLoggedIn(): boolean {
  return this.authService.isLoggedIn(); // true/false return kare
}
}
