import { Component, OnInit } from '@angular/core';
import { HeroadminService } from '../../heroadmin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


export interface ID_DATA {
  position: string
  id: string;
  name: string;
  photo: string;
  email: string;
  number: string;
  course_enrolled: string;
  admin_approve: boolean
}

const ELEMENT_DATA: ID_DATA[] = [];


@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.css']
})
export class ApprovedListComponent implements OnInit {

  //initialization
  displayedColumns: string[] = ["position", "name", "photo", "email"];
  dataSource = ELEMENT_DATA;


  constructor(public idAdminService: HeroadminService, private router: Router) { }

  ngOnInit() {
    this.idAdminService.get_Approved_Admin()
      .subscribe((data: any) => {
        this.dataSource = JSON.parse(JSON.stringify(data))
        console.log("data ", this.dataSource)
      })
  }

}
