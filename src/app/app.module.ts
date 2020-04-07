import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { FilterService } from './services/filter.service';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
