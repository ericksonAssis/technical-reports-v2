import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InspectionFilter } from '../model/inspection-filter.model';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { DataService } from '../shared/data.service';
import { Inspection } from '../model/inspection.model';
import { Header } from '../model/inspection-header.model';

@Component({
  selector: 'app-inspection-container',
  templateUrl: './inspection-container.component.html',
  styleUrls: ['./inspection-container.component.css'],
})
export class InspectionContainerComponent {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  items: Observable<any>;
  step: number;
  response: any;
  dataSource = new MatTableDataSource();
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      const filtros: InspectionFilter = new InspectionFilter();
      filtros.initial = true;
      const inspections = this.dataService.getDadosFiltrados(filtros);
      inspections.subscribe((elements: Inspection[]) => {
        console.log('ElementsFiltered: ' + elements);

        // Atualize o dataSource do mat-accordion com os dados filtrados
        this.dataService.setInspections(elements);
        this.dataSource = new MatTableDataSource<Inspection>(elements);
        this.dataSource.paginator = this.paginator;
        this.items = this.dataSource.connect();
      });
    });
  }
  expansionUnit(index) {
    this.step = index;
  }
  headers: Header = new Header();
}
