import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { AppComponent } from './app.component';
import { FilterService } from './services/filter.service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, NgZone } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let filterService: FilterService;
  let ngZone;
  let searchInput, noDataDiv;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [FilterService],
      declarations: [AppComponent, ListComponent, SearchComponent]
    })
      .compileComponents();
  }));
  beforeEach(inject([NgZone], (injectedNgZone: NgZone) => {
    ngZone = injectedNgZone;
  }));
  beforeEach(() => {
    filterService = new FilterService();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    searchInput = fixture.nativeElement.querySelectorAll('.search_country input');
    noDataDiv = fixture.nativeElement.querySelectorAll('.no_data_div');

  });

  it('check default/initial state of the application', () => {
    expect(searchInput[0].innerText).toEqual('');
    const names = [];
    const allCountryEmelements = document.querySelectorAll('.card_container .card');
    for (let index = 0; index < allCountryEmelements.length; index++) {
        names.push(allCountryEmelements[index].textContent.trim());
    }
    expect(names).toEqual(filterService.countries);
  });

  it('check if case-sensitive queries give correct results', () => {
    searchInput[0].value = 'Car';
    searchInput[0].dispatchEvent(new Event('input'));
    fixture.detectChanges();
    searchInput[0].dispatchEvent(new KeyboardEvent('change', { key: 'Enter' }));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const searchedCountries = [];
      const allCountryEmelements = document.querySelectorAll('.card_container .card');
      for (let index = 0; index < allCountryEmelements.length; index++) {
          searchedCountries.push(allCountryEmelements[index].textContent.trim());
      }
      expect(searchedCountries).toEqual(['Madagascar', 'Nicaragua']);
    });
  });

  it('check if fuzzy search is supported by the logic and renders correct HTML', async(() => {
    searchInput[0].value = 'or';
    searchInput[0].dispatchEvent(new Event('input'));
    fixture.detectChanges();
    searchInput[0].dispatchEvent(new KeyboardEvent('change', { key: 'Enter' }));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const searchedCountries = [];
      const allCountryEmelements = document.querySelectorAll('.card_container .card');
      for (let index = 0; index < allCountryEmelements.length; index++) {
          searchedCountries.push(allCountryEmelements[index].textContent.trim());
      }
      const shouldPresentCountryList = ['Andorra', 'Ecuador', 'El Salvador', 'Equatorial Guinea',
      'Georgia', 'Jordan', 'Morocco', 'Norway', 'Portugal', 'Singapore', 'South Korea', 'Timor L\'Este'];
      expect(searchedCountries).toEqual(shouldPresentCountryList);
    });
  }));

  it('If no countries found then it should show "No data Available" message', () => {
    searchInput[0].value = 'random name';
    searchInput[0].dispatchEvent(new Event('input'));
    fixture.detectChanges();
    searchInput[0].dispatchEvent(new KeyboardEvent('change', { key: 'Enter' }));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(document.querySelectorAll('.card_container').length).toEqual(0, 'card_container div should not present in no country found.');
    });
  });

});
