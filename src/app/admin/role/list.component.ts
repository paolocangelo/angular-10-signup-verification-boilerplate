import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { RoleService } from '@app/_services';
import { Role } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    role: any[];

    constructor(private roleService: RoleService) {}

    ngOnInit() {
        this.roleService.getAll()
            .pipe(first())
            .subscribe(role => this.role = role);
    }

//    deleteAccount(id: string) {
//        const account = this.accounts.find(x => x.id === id);
//        account.isDeleting = true;
//        this.accountService.delete(id)
//            .pipe(first())
//            .subscribe(() => {
//                this.accounts = this.accounts.filter(x => x.id !== id) 
//            });
//    }
}