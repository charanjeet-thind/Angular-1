import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Role } from '../_models/role';
import { AlertService, UserService } from '../_services';
import { RolesService } from '../_services/roles.service';



@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
	
	dropdownList = [];
	selectedItems = [];
	dropdownSettings = {};
	roles: Role[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
		private roleService: RolesService,
        private alertService: AlertService) { }

    ngOnInit() {
		this.loadAllRoles();
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            roles: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
		this.dropdownList = [];
		this.selectedItems = [];
		this.dropdownSettings = {
		  singleSelection: false,
		  idField: 'id',
		  textField: 'roleName',
		  selectAllText: 'Select All',
		  unSelectAllText: 'UnSelect All',
		  itemsShowLimit: 10,
		  allowSearchFilter: true
		};
    }
	
	private loadAllRoles() {
        this.roleService.getAll().pipe(first()).subscribe(roles => {		 
            this.dropdownList = roles; 
        });
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
		//return false;
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
