import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-search',
  styleUrls: ['search.component.css'],
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    country = '';

  constructor(private service: FilterService) {
  }

  ngOnInit() {}
  onCountryChangeClicked() {
  }
}
