import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClickContactMe():void {
    const elmnt = document.getElementById("footer");
    if (elmnt) {
      elmnt.scrollIntoView();
    }
  }

}
