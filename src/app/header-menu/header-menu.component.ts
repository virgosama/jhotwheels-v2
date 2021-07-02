import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  private _transparentMenu: boolean;
  colorDarkBlueMenu = 'rgba(29, 60, 69, .75)';
  colorDarkBlue = 'rgba(29, 60, 69)';

  get transparentMenu(): boolean {
    return this._transparentMenu;
  }

  @Input()
  set transparentMenu(value: boolean) {
    this._transparentMenu = value;
    const homeMenuBar = document.querySelector('.header__menu-bar') as HTMLElement;
    if (value === true) {
      homeMenuBar.style.backgroundColor = this.colorDarkBlueMenu;
      homeMenuBar.style.position = 'absolute';
    } else {
      homeMenuBar.style.backgroundColor = this.colorDarkBlue;
      homeMenuBar.style.position = 'relative';
    }
  }

  constructor() {
    this._transparentMenu = true;
  }

  ngOnInit(): void {
  }

  onClickContactMe(): void {
    const footerElement = document.getElementById('footer') as HTMLElement;
    footerElement.scrollIntoView();
  }

}
