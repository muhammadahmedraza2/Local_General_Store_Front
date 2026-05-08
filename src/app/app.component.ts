import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

constructor(private authService: AuthService,private themeService: ThemeService) {}

ngOnInit(): void {
      this.themeService.loadTheme();

}


  title = 'local-store-app';
  get isLoggedIn(): boolean {
  return this.authService.isLoggedIn(); // true/false return kare
}
}
