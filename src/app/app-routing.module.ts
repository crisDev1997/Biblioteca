import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from './components/admin/sign-in/sign-in.component';
import {AddUserComponent} from './components/user/add-user/add-user.component';
import {UsersListComponent} from './components/user/users-list/users-list.component';
import {EditUserComponent} from './components/user/edit-user/edit-user.component'
import {UpdateUserComponent} from './components/user/update-user/update-user.component';
import {EditBanComponent} from './components/user/edit-ban/edit-ban.component';
import {UpdateBanComponent } from './components/user/update-ban/update-ban.component';
import {BannedUsersListComponent } from './components/user/banned-users-list/banned-users-list.component';
import {AddUserBanComponent } from './components/user/add-user-ban/add-user-ban.component';
import {LoansListComponent } from './components/loans/loans-list/loans-list.component';
import {EditLoanComponent } from './components/loans/edit-loan/edit-loan.component';
import {AddLoanComponent } from './components/loans/add-loan/add-loan.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { UpdateLoanComponent } from './components/loans/update-loan/update-loan.component';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { AddBookComponent } from './components/books/add-book/add-book.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UpdateBookComponent } from './components/books/update-book/update-book.component';
import { EditBookComponent } from './components/books/edit-book/edit-book.component';
import { JournalsListComponent } from './components/journals/journals-list/journals-list.component';
import { EditJournalComponent } from './components/journals/edit-journal/edit-journal.component';
import { AddJournalLoanComponent } from './components/loans/add-journal-loan/add-journal-loan.component';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { ReservationsListComponent } from './components/reservations/reservations-list/reservations-list.component';
import { PurchasesListComponent } from './components/purchases/purchases-list/purchases-list.component';
const routes: Routes = [
  //Login
  {path:'sign-in', component:SignInComponent },
  {path:'users/add-user',component:AddUserComponent,canActivate:[AuthGuardService]},
  {path:'users/users-list',component:UsersListComponent,canActivate:[AuthGuardService]},
  {path:'users/view-user/:ci',component:EditUserComponent,canActivate:[AuthGuardService]},
  {path:'users/update-user/:ci',component:UpdateUserComponent,canActivate:[AuthGuardService]},
  {path:'users/view-ban/:ci',component:EditBanComponent,canActivate:[AuthGuardService]},
  {path:'users/update-ban/:id',component:UpdateBanComponent,canActivate:[AuthGuardService]},
  {path:'users/banned-users-list',component:BannedUsersListComponent,canActivate:[AuthGuardService]},
  {path:'users/add-user-ban/:ci',component:AddUserBanComponent,canActivate:[AuthGuardService]},
  {path:'loans/loans-list',component:LoansListComponent,canActivate:[AuthGuardService]},
  {path:'loans/view-loan/:id',component:EditLoanComponent,canActivate:[AuthGuardService]},
  {path:'loans/add-loan',component:AddLoanComponent,canActivate:[AuthGuardService]},
  {path:'loans/add-journal-loan',component:AddJournalLoanComponent,canActivate:[AuthGuardService]},
  {path:'header-navbar',component:HeaderNavComponent,canActivate:[AuthGuardService]},
  {path:'loans/update-loan/:id',component:UpdateLoanComponent, canActivate:[AuthGuardService]},
  {path: 'books/books-list',component:BooksListComponent, canActivate:[AuthGuardService]},
  {path: 'books/view-book/:id',component:EditBookComponent, canActivate:[AuthGuardService]},
  {path: 'books/add-new-book',component:AddBookComponent, canActivate:[AuthGuardService]},
  {path: 'books/update-book/:id',component:UpdateBookComponent, canActivate:[AuthGuardService]},
  {path: 'journals/journals-list',component:JournalsListComponent, canActivate:[AuthGuardService]},
  {path: 'journals/view-journal/:id',component:EditJournalComponent, canActivate:[AuthGuardService]},
  {path: 'orders/orders-list',component:OrdersListComponent, canActivate:[AuthGuardService]},
  {path: 'reservations/reservations-list',component:ReservationsListComponent,canActivate:[AuthGuardService]},
  {path: 'purchases/purchases-list',component:PurchasesListComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
