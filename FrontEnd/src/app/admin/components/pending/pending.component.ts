import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})




export class PendingComponent {

  //initialization
  displayedColumns: string[] = ["position", "name", "photo", "email", "status"];
  dataSource = ELEMENT_DATA;


  constructor(public idAdminService: HeroadminService, private router: Router) { }


  ngOnInit() {
    this.idAdminService.get_Application_Admin()
      .subscribe((data: any) => {
        this.dataSource = JSON.parse(JSON.stringify(data))
        console.log("data ", this.dataSource)
      })
  }


  //----------------------------to approve

  adminApprove(id: any) {
    if (id) {
      Swal.fire({
        title: 'Are you sure ?',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
      }).then((result) => {
        if (result.isConfirmed) {
          this.idAdminService.adminApproved(id)
            .subscribe(
              response => {
                if (response) {
                  window.location.reload()
                }
                else {
                  Swal.fire("Network Error", "Please do after sometime ", "error")
                    .then(() => {
                      this.router.navigate(['/']);
                    })
                }
              })

        } else {
          Swal.fire("Cancelled", "Id not Approved ", "error");
        }
      })
    }
  }



  //----------------------------to reject

  adminReject(id: any) {
    Swal.fire({
      title: 'Are you sure to Reject?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        this.idAdminService.adminRejected(id)
          .subscribe(
            response => {
              if (response) {
                window.location.reload()
              }
              else {
                Swal.fire("Network Error", "Please do after sometime ", "error")
                  .then(() => {
                    this.router.navigate(['/']);
                  })
              }
            })

      } else {
        Swal.fire("Cancelled", "Id not Rejected ", "error");
      }
    })
  }
}







