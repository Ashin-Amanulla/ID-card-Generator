import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroIDService } from '../../hero-id.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';



export interface ID_DETAILS {
  position: string
  name: string;
  photo: string;
  email: string;
  number: string;
  course_enrolled: string;
  status: boolean
}

const ID_DATA: ID_DETAILS[] = [];






@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})


export class StatusComponent implements OnInit {

  //initialization
  selectedIdList: [] = []
  status: any = []
  loading: boolean = true;
  displayedColumns: string[] = ["position", "name", "photo", "email","status"];

  dataSource : any;

  selection = new SelectionModel<ID_DETAILS>(true, []);




  constructor(public idService: HeroIDService) { }
  ngOnInit(): void {
    this.idService.getApplication()
      .subscribe((data: any) => {
        this.dataSource = JSON.parse(JSON.stringify(data))
        console.log("data ", this.dataSource)
      })
  }


}




