import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  applyTheme(theme: any) {

    document.documentElement.style
      .setProperty('--theme-primary', theme.primary);

    document.documentElement.style
      .setProperty('--theme-bg', theme.bg);

    // SAVE
    localStorage.setItem(
      'app-theme',
      JSON.stringify(theme)
    );
  }

  applyFont(font: string) {

    document.documentElement.style
      .setProperty('--font-ui', font);

    localStorage.setItem('app-font', font);
  }

  applySize(size: string) {

    document.documentElement.style
      .setProperty('--font-size-base', size);

    localStorage.setItem('app-size', size);
  }

  loadTheme() {

    const theme = localStorage.getItem('app-theme');
    const font  = localStorage.getItem('app-font');
    const size  = localStorage.getItem('app-size');

    if (theme) {

      const parsed = JSON.parse(theme);

      document.documentElement.style
        .setProperty('--theme-primary', parsed.primary);

      document.documentElement.style
        .setProperty('--theme-bg', parsed.bg);
    }

    if (font) {

      document.documentElement.style
        .setProperty('--font-ui', font);
    }

    if (size) {

      document.documentElement.style
        .setProperty('--font-size-base', size);
    }
  }
}