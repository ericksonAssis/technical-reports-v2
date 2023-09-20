import { Component } from '@angular/core';
import { InspectionFilter } from '../model/inspection-filter.model';
import { DataService } from '../shared/data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inspection } from '../model/inspection.model';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
})
export class FilterFormComponent {
  filter: InspectionFilter = new InspectionFilter();

  constructor(private dataService: DataService) {}

  aplicarFiltros() {
    this.filter.initial = false;
    console.log(this.filter);
    const filteredData: Observable<Inspection[]> =
      this.dataService.getDadosFiltrados(this.filter);
    console.log('ElementsFiltered: ' + filteredData);
    filteredData.subscribe((elements: Inspection[]) => {
      console.log('ElementsFiltered: ' + elements);

      // Atualize o dataSource do mat-accordion com os dados filtrados
      this.dataService.setInspections(elements);
    });
  }

  limpaFiltros() {
    this.filter.initial = true;
    this.filter.cpfCnpj = '';
    this.filter.idRelatorio = '';
    this.filter.postalCode = '';
    console.log(this.filter);
    const filteredData: Observable<Inspection[]> =
      this.dataService.getDadosFiltrados(this.filter);
    console.log('ElementsFiltered: ' + filteredData);
    filteredData.subscribe((elements: Inspection[]) => {
      console.log('ElementsFiltered: ' + elements);

      // Atualize o dataSource do mat-accordion com os dados filtrados
      this.dataService.setInspections(elements);
    });
  }
}
