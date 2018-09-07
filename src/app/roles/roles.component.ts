import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';
import { RolesService } from '../_services/roles.service';

@Component({
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
	roleForm: FormGroup;
	loading = false;
	submitted = false;


	constructor(
	private formBuilder: FormBuilder,
	private router: Router,
	private userService: UserService,
	private roleService: RolesService,
	private alertService: AlertService) { }


  ngOnInit() {
        this.roleForm = this.formBuilder.group({
            roleName: ['', Validators.required]
        });
    }
	// convenience getter for easy access to form fields
    get f() { return this.roleForm.controls; }
	onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.roleForm.invalid) {
            return;
        }

        this.loading = true;
        this.roleService.register(this.roleForm.value)
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
