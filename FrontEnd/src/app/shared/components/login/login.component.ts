import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  constructor(private _auth: AuthService,
    private _router: Router
  ) { }

  signinForm: any = new FormGroup(

    {
      "email": new FormControl(''),
      "password": new FormControl('')
    }
  )

  ngOnInit() { }

  loginUser() {
    let user = this.signinForm.value;

    this._auth.loginUser(user)
      .subscribe(
        response => {
          let result = response;

          if (result.accessToken) {
            //local storage
            localStorage.setItem('accessToken', result.accessToken)
            localStorage.setItem('refreshToken', result.refreshToken)


            // diverting as per userRole
            if (this._auth.isAdmin() || this._auth.isSuper()) {
              this._router.navigate(['/admin/home']);
            } else {
              this._router.navigate(['/user/home']);
            }

          }
          else {
            Swal.fire(
              'Warning!!',
              'User not found!',
              'error')
              .then(
                refresh => {
                  localStorage.clear()
                  window.location.reload();
                })
          }
        })




  }




}
