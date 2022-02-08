import { Component, OnInit } from '@angular/core';
import { HeroIDService } from '../../hero-id.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-file',
  templateUrl: './pdf-file.component.html',
  styleUrls: ['./pdf-file.component.css']
})
export class PdfFileComponent implements OnInit {

  constructor(public idService: HeroIDService) { }

  idCard: any = [];

  ngOnInit(): void {

    this.idService.getIdCard()
      .subscribe((data: any) => {
        this.idCard = data;
      })

  }

  //-----------------------------------------------------jsPDF code-----------------------------//
  generatePdf() {

    let DATA = document.getElementById('htmlData') as HTMLCanvasElement;

    html2canvas(DATA, { useCORS: true }).then(canvas => {

      let fileWidth = 260;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')

      let PDF = new jsPDF('l', 'mm', [297, 210]);
      let position = 0;

      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('ICTAK ID Card.pdf');
    });
  }
  //-----------------------------------------------------jsPDF code-----------------------------------//

}
