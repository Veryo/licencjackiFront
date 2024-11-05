import { Component , HostListener,OnInit   } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public getScreenWidth: any;
  public getScreenHeight: any;
 


  
  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
    }

  
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (typeof window !== 'undefined') {
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;
    }
  }

  isScreenSmall(): boolean {
    return this.getScreenWidth < 1050;
  }
}
