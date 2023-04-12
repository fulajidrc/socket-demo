import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models';
import { SocketService } from 'src/app/services';
import { selectedUser } from '../store/user.selectors';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  addCategoryForm!: FormGroup;
  submitted = false
  constructor(
    private fb: FormBuilder,
    private socketService:SocketService,
    private store:Store
  ){
    this.createForm();
    this.store.select(selectedUser).subscribe(user => {
      this.user = user
      this.dTitle = this.user._id ? 'Edit User' : 'Add User'
      this.dButtonText = this.user._id ? 'Update' : 'Create'
      if(this.user._id){
        this.updateForm()
      }
      this.addCategoryForm.patchValue(this.user);
    })
  }
  dTitle = 'Add User'
  dButtonText = "Create"

  user!:User;

  createForm(){
    this.addCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  updateForm(){
    this.addCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', []],
    });
  }

  get form() {
    return this.addCategoryForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addCategoryForm.valid) {
      this.user._id 
      ? this.socketService.updateUser({_id: this.user._id, ...this.addCategoryForm.value})
      : this.socketService.createUser(this.addCategoryForm.value)
      
        this.addCategoryForm.markAsUntouched();
        this.addCategoryForm.removeAsyncValidators;
        this.addCategoryForm.reset();
        this.submitted = false
        this.createForm();
    }
  }
}
