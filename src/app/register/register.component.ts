import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';



@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
	
	dropdownList = [];
	selectedItems = [];
	dropdownSettings = {};

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            skills: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
		this.dropdownList = [
			  { item_id: 1, item_text: 'Mumbai' },
			  { item_id: 2, item_text: 'Bangaluru' },
			  { item_id: 3, item_text: 'Pune' },
			  { item_id: 4, item_text: 'Navsari' },
			  { item_id: 5, item_text: 'New Delhi' }
			];
			this.selectedItems = [
			  { item_id: 3, item_text: 'Pune' },
			  { item_id: 4, item_text: 'Navsari' }
			];
			this.dropdownSettings = {
			  singleSelection: false,
			  idField: 'item_id',
			  textField: 'item_text',
			  selectAllText: 'Select All',
			  unSelectAllText: 'UnSelect All',
			  itemsShowLimit: 10,
			  allowSearchFilter: true
			};
    }
	
	onItemSelect (item:any) {
		console.log(item);
	  }
	  onSelectAll (items: any) {
		console.log(items);
	  }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
		console.log(this.registerForm.value);
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
