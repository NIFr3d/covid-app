import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/entities/user';
import { VaccinationCenter } from 'src/app/entities/vaccination-center';
import { CenterService } from 'src/app/service/center.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

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
  selectedRole: string | null = null;
  selectedCenter: string | null = null;
  availableCenters: VaccinationCenter[] = [];

  constructor(private userService: UserService, private storageService: StorageService, private centerService: CenterService, private snackBar: MatSnackBar) { }

  searchUsers() {
    if(this.searchTerm.length < 3) {
      this.users = [];
      return;
    };
    this.userService.searchUser(this.searchTerm).subscribe({
      next: (data: User[]) => {
        this.users = data.filter(u => u.email !== this.storageService.getUser().email && !u.roles.includes('SUPERADMIN'));
        if(!this.storageService.isSuperAdmin()) {
          this.users = this.users.filter(u => !u.roles.includes('ADMIN'));
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.centerService.getAllVaccinationCenters().subscribe((centers) => {
      this.availableCenters = centers;
    });
    if(this.storageService.isSuperAdmin()) {
      this.availableRoles = this.allRoles.filter(role => !user.roles.includes(role));
    } else{
      this.availableRoles = this.allRoles.filter(role => !user.roles.includes(role) && role !== 'ADMIN');
    }

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

  addRole() {
    if (!this.selectedRole) {
      return;
    }
    if (!this.selectedUser.roles.includes(this.selectedRole)) {
      this.selectedUser.roles.push(this.selectedRole);
    }
    this.availableRoles = this.availableRoles.filter(r => r !== this.selectedRole);
    this.selectedRole = null;
  }

  removeRole(user: any, role: string) {
    if (user.roles.includes(role)) {
      user.roles.splice(user.roles.indexOf(role), 1);
    }
    this.availableRoles.push(role);
    this.selectedRole = 'null'; // Réinitialiser à une valeur non présente dans availableRoles
  }

  saveChanges() {
    if(!this.selectedCenter) {
      this.selectedUser.centre = null;
    }else{
      this.selectedUser.centre = this.selectedCenter;
    }
    this.userService.updateUser(this.selectedUser).subscribe({
      next: (data: any) => {
        this.selectedUser = {} as User;
        this.availableRoles = [];
        this.searchUsers();
      },
      error: (error: any) => {
        console.error(error);
        this.snackBar.open(error, 'Fermer', {
          duration: 5000, // La notification disparaîtra après 5 secondes
          verticalPosition: 'top', // La notification apparaîtra en haut de la page
        });
      }
    });
  }
}
