import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InspectionContainerComponent } from './inspection-container/inspection-container.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { DateFormatPipe } from './shared/date-format.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import localePt from '@angular/common/locales/pt'; // Importe a localização brasileira
import { registerLocaleData } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    InspectionContainerComponent,
    FilterFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    DateFormatPipe,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [
    // Configure o MAT_DATE_LOCALE para 'pt-BR'
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
