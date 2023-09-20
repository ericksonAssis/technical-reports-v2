import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InspectionFilter } from '../model/inspection-filter.model';
import { DataService } from '../shared/data.service';
import { Inspection } from '../model/inspection.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
})
export class FilterFormComponent {
  @ViewChild('f', { static: false }) filterForm: NgForm;
  submitted = false;

  filter: InspectionFilter;
  constructor(private dataService: DataService) {
    this.filter = new InspectionFilter();
  }

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

  onSubmit() {
    this.aplicarFiltros();
    console.log('filterForm' + this.filterForm);
    this.submitted = true;
    this.filter.idRelatorio = this.filterForm.value.userData.idRelatorio;
    this.filter.cpfCnpj = this.filterForm.value.userData.cpfCnpj;
    this.filter.postalCode = this.filterForm.value.postalCode;
    this.filter.dataInicio = this.filterForm.value.dataInicio;
    this.filter.dataFim = this.filterForm.value.dataFim;

    this.filterForm.reset();
  }

  validarDataSelecionada = (d: Date | null): boolean => {
    var currentDate = new Date();
    const maxDate = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (d && d >= maxDate && d <= currentDate) {
      return true; // Aceita a data se estiver dentro de 1 ano a partir da data atual
    }

    return false; // Rejeita a data se estiver mais de 1 ano no futuro
  };
}
