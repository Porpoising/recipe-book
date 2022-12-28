import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent {
  constructor() {}

  onClick(link: string) {
    if (link === 'github') {
      window.open('https://github.com/Porpoising')

    } else if (link === 'gmail') {
      window.open('https://mail.google.com/mail/u/0/#spam?compose=GTvVlcRwRdnkcMDgLNcPkQgKbbFmppHZHkTzMMvRgMgnnxLzkgTSfXkQMxbHwCxxFpzCwFlkGCZlX')
    
    } else {
      window.open('https://www.linkedin.com/in/roman-novichkov-4b6209201/')
    }
  }
}
