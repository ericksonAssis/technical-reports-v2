import { Component } from '@angular/core';
import { Header } from '../model/inspection-header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  headers: Header = new Header();
}
