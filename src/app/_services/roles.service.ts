import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Role } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

	constructor(private http: HttpClient) { }
	getAll() {
		return this.http.get<Role[]>(`${environment.apiUrl}/roles`);
	}

	getById(id: number) {
		return this.http.get(`${environment.apiUrl}/roles/` + id);
	}

	register(role: Role) {
		return this.http.post(`${environment.apiUrl}/roles/register`, role);
	}

	update(role: Role) {
		return this.http.put(`${environment.apiUrl}/roles/` + role.id, role);
	}

	delete(id: number) {
		return this.http.delete(`${environment.apiUrl}/roles/` + id);
	}
}
