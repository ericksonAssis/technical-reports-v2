import { Injectable } from '@angular/core';
import { Inspection } from '../model/inspection.model';
import { InspectionFilter } from '../model/inspection-filter.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private inspections: Inspection[];

  setInspections(inpectionsList: Inspection[]): void {
    this.inspections = inpectionsList;
  }

  getInspections(): Inspection[] {
    return this.inspections;
  }

  private dadosFiltradosSubject = new BehaviorSubject<Inspection[]>([]);

  getDadosFiltrados(filtro: InspectionFilter): Observable<Inspection[]> {
    var dados: Inspection[];
    if (filtro.initial) {
      dados = this.mockDados();
      this.setDadosFiltrados(dados);
    } else {
      dados = this.filtra(filtro);
      this.setDadosFiltrados(dados);
    }
    const dadosFiltrados = this.dadosFiltradosSubject.asObservable();
    return dadosFiltrados;
  }

  // TO passar para o get do backend filtros

  setDadosFiltrados(dadosFiltrados: Inspection[]) {
    this.dadosFiltradosSubject.next(dadosFiltrados);
  }

  filtra(filterData: InspectionFilter): Inspection[] {
    this.inspections = this.mockDados();
    if (filterData.idRelatorio.length > 0) {
      this.inspections = this.filterByIdReport(filterData);
    } else if (filterData.cpfCnpj.length > 0) {
      this.inspections = this.filterByCpfCnpj(filterData);
    } else if (filterData.postalCode.length > 0) {
      this.inspections = this.filterByPostalCode(filterData);
    } else if (filterData.dataInicio) {
      this.inspections = this.filterByPeriod(filterData);
    }
    return this.inspections;
  }

  filterByPostalCode(filterData: InspectionFilter): Inspection[] {
    var elements: Inspection[] = this.inspections.filter((element) => {
      // Implemente a lógica de filtro aqui com base em filterData
      // Por exemplo, compare os campos de element com os critérios em filterData
      // Se o elemento corresponder aos critérios, retorne true, caso contrário, retorne false
      return filterData.postalCode
        ? element.postalCode === filterData.postalCode
        : true;
      // Adicione mais critérios de filtro conforme necessário
    });
    console.log('filterByPostalCode: ' + elements);
    return elements;
  }
  filterByCpfCnpj(filterData: InspectionFilter): Inspection[] {
    var elements: Inspection[] = this.inspections.filter((element) => {
      // Implemente a lógica de filtro aqui com base em filterData
      // Por exemplo, compare os campos de element com os critérios em filterData
      // Se o elemento corresponder aos critérios, retorne true, caso contrário, retorne false
      return filterData.cpfCnpj
        ? element.proponentCpfCnpj === filterData.cpfCnpj
        : true;
      // Adicione mais critérios de filtro conforme necessário
    });
    console.log('filterByCpfCnpj: ' + elements);
    return elements;
  }
  filterByIdReport(filterData: InspectionFilter): Inspection[] {
    var elements: Inspection[] = this.inspections.filter((element) => {
      // Implemente a lógica de filtro aqui com base em filterData
      // Por exemplo, compare os campos de element com os critérios em filterData
      // Se o elemento corresponder aos critérios, retorne true, caso contrário, retorne false
      return filterData.idRelatorio
        ? element.inspectionNumber === filterData.idRelatorio
        : true;
      // Adicione mais critérios de filtro conforme necessário
    });
    console.log('filterByIdReport: ' + elements);
    return elements;
  }
  filterByPeriod(filterData: InspectionFilter): Inspection[] {
    const elements: Inspection[] = this.inspections.filter((element) => {
      // Verifique se a data de validação do relatório está dentro do período
      if (filterData.dataInicio && filterData.dataFim) {
        return (
          element.reportValidationDate >= filterData.dataInicio &&
          element.reportValidationDate <= filterData.dataFim
        );
      }

      // Se apenas a data de início for fornecida, verifique se a data é maior ou igual
      if (filterData.dataInicio) {
        return element.reportValidationDate >= filterData.dataInicio;
      }

      // Se apenas a data de fim for fornecida, verifique se a data é menor ou igual
      if (filterData.dataFim) {
        return element.reportValidationDate <= filterData.dataFim;
      }

      // Se nenhuma data for fornecida, retorne true para incluir todos os elementos
      return true;
    });

    return elements;
  }

  mockDados() {
    return (this.inspections = [
      {
        inspectionNumber: '5555',
        proponentCpfCnpj: '11111111111111',
        proponentName: 'Erickson',
        postalCode: '06410200',
        opinion: 'opinion Teste',
        addressComplement: 'addressComplement',
        analystObservation: 'analystObservation',
        reportPath: 'reportPath',
        reportValidationDate: new Date(),
        reportReturnDate: new Date(),
      },

      {
        inspectionNumber: '1234',
        proponentCpfCnpj: '22222222222222',
        proponentName: 'Empresa Teste Com nome Comprimdo SA',
        postalCode: '05960200',
        opinion: 'opinion',
        addressComplement: 'addressComplement',
        analystObservation: 'analystObservation',
        reportPath: 'reportPath',
        reportValidationDate: new Date(),
        reportReturnDate: new Date(),
      },

      {
        inspectionNumber: '1234',
        proponentCpfCnpj: '22222',
        proponentName: 'proponentName',
        postalCode: '05960200',
        opinion: 'opinion',
        addressComplement: 'addressComplement',
        analystObservation: 'analystObservation',
        reportPath: 'reportPath',
        reportValidationDate: new Date(),
        reportReturnDate: new Date(),
      },
      {
        inspectionNumber: '1234',
        proponentCpfCnpj: '22222',
        proponentName: 'proponentName',
        postalCode: '05960200',
        opinion: 'opinion',
        addressComplement: 'addressComplement',
        analystObservation: 'analystObservation',
        reportPath: 'reportPath',
        reportValidationDate: new Date(),
        reportReturnDate: new Date(),
      },
      {
        inspectionNumber: '1234',
        proponentCpfCnpj: '22222',
        proponentName: 'proponentName',
        postalCode: '05960200',
        opinion: 'opinion',
        addressComplement: 'addressComplement',
        analystObservation: 'analystObservation',
        reportPath: 'reportPath',
        reportValidationDate: new Date(),
        reportReturnDate: new Date(),
      },
      {
        inspectionNumber: '1234',
        proponentCpfCnpj: '22222',
        proponentName: 'proponentName',
        postalCode: '05960200',
        opinion: 'opinion',
        addressComplement: 'addressComplement',
        analystObservation: 'analystObservation',
        reportPath: 'reportPath',
        reportValidationDate: new Date(),
        reportReturnDate: new Date(),
      },
      {
        inspectionNumber: '1234',
        proponentCpfCnpj: '22222',
        proponentName: 'proponentName',
        postalCode: '05960200',
        opinion: 'opinion',
        addressComplement: 'addressComplement',
        analystObservation: 'analystObservation',
        reportPath: 'reportPath',
        reportValidationDate: new Date(),
        reportReturnDate: new Date(),
      },
      {
        inspectionNumber: '1234',
        proponentCpfCnpj: '22222',
        proponentName: 'proponentName',
        postalCode: '05960200',
        opinion: 'opinion',
        addressComplement: 'addressComplement',
        analystObservation: 'analystObservation',
        reportPath: 'reportPath',
        reportValidationDate: new Date(),
        reportReturnDate: new Date(),
      },
      {
        inspectionNumber: '1234',
        proponentCpfCnpj: '22222',
        proponentName: 'proponentName',
        postalCode: '05960200',
        opinion: 'opinion',
        addressComplement: 'addressComplement',
        analystObservation: 'analystObservation',
        reportPath: 'reportPath',
        reportValidationDate: new Date(),
        reportReturnDate: new Date(),
      },
    ]);
  }
}
