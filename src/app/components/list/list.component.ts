import { Component, OnInit, OnDestroy } from '@angular/core'
import { FilterService } from '../../services/filter.service';


@Component({
  selector: 'app-list',
  styleUrls: ['list.component.css'],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

  countriesToBeRendered;
  countryChanged;
  constructor(private service: FilterService) {
    this.countriesToBeRendered = this.service.countries;
  }
  ngOnInit() { }
  ngOnDestroy() {
  }
}
