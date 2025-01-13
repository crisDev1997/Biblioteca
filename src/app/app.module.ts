import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterBook } from './components/Filter/filter.book.pipe'; 

import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { UsersListComponent } from './components/user/users-list/users-list.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { AddLoanComponent } from './components/loans/add-loan/add-loan.component';
import { LoansListComponent } from './components/loans/loans-list/loans-list.component';
import { ExtendedLoansListComponent } from './components/loans/extended-loans-list/extended-loans-list.component';
import { AddExtendDateComponent } from './components/loans/add-extend-date/add-extend-date.component';
import { UpdateLoanComponent } from './components/loans/update-loan/update-loan.component';
import { UpdateExtendDateComponent } from './components/loans/update-extend-date/update-extend-date.component';
import { EditLoanComponent } from './components/loans/edit-loan/edit-loan.component';
import { EditExtendDateComponent } from './components/loans/edit-extend-date/edit-extend-date.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { AddBookComponent } from './components/books/add-book/add-book.component';
import { BooksListComponent } from './components/books/books-list/books-list.component';
import { EditBookComponent } from './components/books/edit-book/edit-book.component';
import { UpdateBookComponent } from './components/books/update-book/update-book.component';
import { AddMoreBooksComponent } from './components/books/add-more-books/add-more-books.component';
import { AddJournalComponent } from './components/journals/add-journal/add-journal.component';
import { JournalsListComponent } from './components/journals/journals-list/journals-list.component';
import { EditJournalComponent } from './components/journals/edit-journal/edit-journal.component';
import { EditNumJournalComponent } from './components/journals/edit-num-journal/edit-num-journal.component';
import { UpdateJournalComponent } from './components/journals/update-journal/update-journal.component';
import { UpdateNumJournalComponent } from './components/journals/update-num-journal/update-num-journal.component';
import { JournalNumberListComponent } from './components/journals/journal-number-list/journal-number-list.component';
import { AddNumJournalComponent } from './components/journals/add-num-journal/add-num-journal.component';
import { AddOrderComponent } from './components/orders/add-order/add-order.component';
import { EditOrderComponent } from './components/orders/edit-order/edit-order.component';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { BannedUsersListComponent } from './components/user/banned-users-list/banned-users-list.component';
import { EditBanComponent } from './components/user/edit-ban/edit-ban.component';
import { UpdateBanComponent } from './components/user/update-ban/update-ban.component';
import { AddReservationComponent } from './components/reservations/add-reservation/add-reservation.component';
import { ReservationsListComponent } from './components/reservations/reservations-list/reservations-list.component';
import { EditReservationComponent } from './components/reservations/edit-reservation/edit-reservation.component';
import { AddPurchaseComponent } from './components/purchases/add-purchase/add-purchase.component';
import { EditPurchaseComponent } from './components/purchases/edit-purchase/edit-purchase.component';
import { PurchasesListComponent } from './components/purchases/purchases-list/purchases-list.component';
import { PurchasesDetailsListComponent } from './components/purchases/purchases-details-list/purchases-details-list.component';
import { EditDetailComponent } from './components/purchases/edit-detail/edit-detail.component';
import { MainComponent } from './components/statitics/main/main.component';
import { BooksComponent } from './components/statitics/books/books.component';
import { UsersComponent } from './components/statitics/users/users.component';
import { PurchasesComponent } from './components/statitics/purchases/purchases.component';
import { OrdersComponent } from './components/statitics/orders/orders.component';
import { ReservationsComponent } from './components/statitics/reservations/reservations.component';

import { SignInComponent } from './components/admin/sign-in/sign-in.component';
import { InfoEditAdminComponent } from './components/admin/info-edit-admin/info-edit-admin.component';
import { AddUserBanComponent } from './components/user/add-user-ban/add-user-ban.component';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AddJournalLoanComponent } from './components/loans/add-journal-loan/add-journal-loan.component';
import { AddBookFromOrdersListComponent } from './components/orders/add-book-from-orders-list/add-book-from-orders-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterUser } from './components/Filter/filter.user.pipe';
import { FilterLoan } from './components/Filter/filter.loan.pipe';
import { FilterOrder } from './components/Filter/filter.order.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    AddUserComponent,
    UsersListComponent,
    UpdateUserComponent,
    AddLoanComponent,
    LoansListComponent,
    ExtendedLoansListComponent,
    AddExtendDateComponent,
    UpdateLoanComponent,
    UpdateExtendDateComponent,
    EditLoanComponent,
    EditExtendDateComponent,
    EditUserComponent,
    AddBookComponent,
    BooksListComponent,
    EditBookComponent,
    UpdateBookComponent,
    AddMoreBooksComponent,
    AddJournalComponent,
    JournalsListComponent,
    EditJournalComponent,
    EditNumJournalComponent,
    UpdateJournalComponent,
    UpdateNumJournalComponent,
    JournalNumberListComponent,
    AddNumJournalComponent,
    AddOrderComponent,
    EditOrderComponent,
    OrdersListComponent,
    BannedUsersListComponent,
    EditBanComponent,
    UpdateBanComponent,
    AddReservationComponent,
    ReservationsListComponent,
    EditReservationComponent,
    AddPurchaseComponent,
    EditPurchaseComponent,
    PurchasesListComponent,
    PurchasesDetailsListComponent,
    EditDetailComponent,
    MainComponent,
    BooksComponent,
    UsersComponent,
    PurchasesComponent,
    OrdersComponent,
    ReservationsComponent,
 
    SignInComponent,
    InfoEditAdminComponent,
    AddUserBanComponent,
    AddJournalLoanComponent,
    AddBookFromOrdersListComponent,
    FilterBook,
    FilterUser,
    FilterLoan,
    FilterOrder
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
