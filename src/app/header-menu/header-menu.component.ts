import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  @Input() transparentMenu: boolean;

  constructor() {
    this.transparentMenu = true;
  }

  ngOnInit(): void {
  }

  onClickContactMe(): void {
    const footerElement = document.getElementById('footer') as HTMLElement;
    footerElement.scrollIntoView();
  }

}
