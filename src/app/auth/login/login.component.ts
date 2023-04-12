import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registerForm!: FormGroup;
  submitted = false

  constructor(
    private fb: FormBuilder,
    private socketService: SocketService
  ){
    this.createForm();
  }


  createForm(){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      // console.log(this,this.registerForm.value);
      this.socketService.loginUser(this.registerForm.value);
      // alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      // console.table(this.registerForm.value);
      //this.store.dispatch(loginAction(this.registerForm.value))
    }
  }
}
