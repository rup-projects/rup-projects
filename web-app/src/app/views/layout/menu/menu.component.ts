import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() {
  }

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  ngOnInit(): void {
  }

  toggleBackground(): void {
    this.background = this.background ? undefined : 'primary';
  }

  addLink(): void {
    this.links.push(`Link ${this.links.length + 1}`);
  }

}
