import { Component } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/service/user.service';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-gestion-user-list',
  templateUrl: './gestion-user-list.component.html',
  styleUrls: ['./gestion-user-list.component.scss']
})
export class GestionUserListComponent {
  users: User[] = [];
  searchTerm: string = '';
  allRoles = ['ADMIN', 'MEDECIN', 'USER'];
  availableRoles: string[] = [];
  selectedUser : User = {} as User;
  selectedRole: string = "";

  constructor(private userService: UserService) { }

  searchUsers() {
    if(this.searchTerm.length < 3) {
      this.users = [];
      return;
    };
    this.userService.searchUser(this.searchTerm).subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.availableRoles = this.allRoles.filter(role => !user.roles.includes(role));
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe({
      next: (data: any) => {
        this.users = this.users.filter(u => u.email !== user.email);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  addRole(role: string) {
    if (!this.selectedUser.roles.includes(role)) {
      this.selectedUser.roles.push(role);
    }
    this.availableRoles = this.availableRoles.filter(r => r !== role);
    this.selectedRole = '';
  }

  removeRole(user: any, role: string) {
    if (user.roles.includes(role)) {
      user.roles.splice(user.roles.indexOf(role), 1);
    }
    this.availableRoles.push(role);
    this.selectedRole = '';
  }

  saveChanges() {
    this.userService.updateUser(this.selectedUser).subscribe({
      next: (data: any) => {
        this.users = this.users.map(u => u.email === this.selectedUser.email ? this.selectedUser : u);
        this.selectedUser = {} as User;
        this.availableRoles = [];
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
