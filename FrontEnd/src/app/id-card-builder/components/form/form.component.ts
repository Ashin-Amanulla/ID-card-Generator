import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HeroIDService } from '../../hero-id.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css',
    '../../../../assets/css/normalize.css',
    '../../../../assets/css/skeleton.css'

  ]
})
export class FormComponent {

  constructor(private IdService: HeroIDService, private router: Router) { }

  //Initialization
  selectedFile: any = null;
  fd = new FormData();
  images: any;
  ifUploaded:Boolean=false; //to ensure uploading is complete

  //Form Control
  profileForm: any = new FormGroup({
    "name": new FormControl(''),
    "email": new FormControl(''),
    "number": new FormControl(''),
    "course_enrolled": new FormControl(''),
    // "Photo": new FormControl('') is not done beacuse of fake path string.Ref backend

  });


  //Image upload
  passportPhoto(event: any) {
    if(event.target.files.length >0){      
      this.selectedFile = <File>event.target.files[0];
    }
  }


  //Submission of data to backend
  onSubmit() {

    let idDetails = this.profileForm.value;

    for (const prop in idDetails) {
      this.fd.append(prop, idDetails[prop])
    }
    this.fd.append('image', this.selectedFile, this.selectedFile.name); //image appended last due to bug

    this.IdService.IdInput(this.fd)
      .subscribe(res => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Your have successfully Applied',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/user/home'])
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Network Error, Please try after sometime',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/user/home'])
          })
        }
      })

  }


}
