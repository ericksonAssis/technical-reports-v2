import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private http: HttpClient) {}

  downloadPDF(reportPath: string) {
    this.openPDF(reportPath);
  }

  openPDF(reportPath: string) {
    reportPath = '/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    window.open(reportPath, '_blank');
  }

  downloadFilePDF(reportPath: string) {
    // Substitua 'your_backend_url' pelo URL do seu backend e 'your_api_endpoint' pelo endpoint apropriado.
    const downloadUrl = '/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

    // Faz a chamada REST para baixar o PDF.
    this.http
      .get(downloadUrl, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        // Cria um objeto Blob com o conteúdo do PDF.
        const blob = new Blob([response], { type: 'application/pdf' });

        // Cria uma URL temporária para o Blob.
        const url = window.URL.createObjectURL(blob);

        // Cria um elemento <a> para iniciar o download.
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento.pdf'; // Nome do arquivo PDF.
        document.body.appendChild(a);
        a.click();

        // Libera a URL temporária.
        window.URL.revokeObjectURL(url);
      });
  }
}
