import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Role } from '@app/_models';

const baseUrl = `${environment.apiUrl}/role`;

@Injectable({ providedIn: 'root' })
export class RoleService {
    private roleSubject: BehaviorSubject<Role>;
    public role: Observable<Role>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.roleSubject = new BehaviorSubject<Role>(null);
        this.role = this.roleSubject.asObservable();
    }

    public get roleValue(): Role {
        return this.roleSubject.value;
    }
    getAll() {
        return this.http.get<Role[]>(baseUrl);
    }

    getAllEnabled(id: string) {
        return this.http.get<Role>(`${baseUrl}/all-enabled}`);
    }

    getById(id: string) {
        return this.http.get<Role>(`${baseUrl}/${id}`);
    }
    
    create(params) {
        return this.http.post(baseUrl, params);
    }
    
    update(id, params) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((role: any) => {
                // update the current account if it was updated
                if (role.id === this.roleValue.id) {
                    // publish updated account to subscribers
                    role = { ...this.roleValue, ...role };
                    this.roleSubject.next(role);
                }
                return role;
            }));
    }
    
//    delete(id: string) {
//        return this.http.delete(`${baseUrl}/${id}`)
//            .pipe(finalize(() => {
//                // auto logout if the logged in account was deleted
//                if (id === this.accountValue.id)
//                    this.logout();
//            }));
//    }

    // helper methods

//    private refreshTokenTimeout;

//    private startRefreshTokenTimer() {
//        // parse json object from base64 encoded jwt token
//        const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));
//
        // set a timeout to refresh the token a minute before it expires
//        const expires = new Date(jwtToken.exp * 1000);
//        const timeout = expires.getTime() - Date.now() - (60 * 1000);
//        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
//    }

//    private stopRefreshTokenTimer() {
//        clearTimeout(this.refreshTokenTimeout);
//    }
}