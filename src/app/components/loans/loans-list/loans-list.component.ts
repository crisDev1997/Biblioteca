import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


import { LoanUser,LoanExtended } from 'src/app/modules/Loan';
import { LoanService } from 'src/app/services/loan.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.css']
})
export class LoansListComponent implements OnInit {

  filterloans='';
  check!:string;
  loanUser$!:Observable<LoanUser[]>;
  loansAll$!:Observable <LoanUser[]>;
  loansReturned$!:Observable <LoanUser[]>;
  loansPending$!:Observable <LoanUser[]>;
  loansExpired$!:Observable <LoanUser []>;
  loansExtended$!:Observable <LoanExtended []>;
  constructor(private loanService:LoanService,private router:Router, private accessId:ActivatedRoute) { }

  ngOnInit(): void {

    this.check="all";
    this.loansAll$=this.loanService.getAll();
    this.loansReturned$=this.loanService.getAllReturned();
    this.loansPending$=this.loanService.getAllPending();
    this.loansExpired$=this.loanService.getAllExpired();
    this.loansExtended$=this.loanService.getAllExtended();
 
  }
  navigateViewLoan(id:Number){
    this.router.navigate([`loans/view-loan/${id}`])
  }
  Filter(filter:string){
    this.check=filter
  }
  canMarkDelivered(status:any):boolean{
    
    return status==1 ? true : false;
  }
  changeStateLoan(idAndState:{}):void{ 
    this.loanService.updateStateLoan(idAndState).pipe(first()).subscribe((data)=>{
      this.loansAll$=this.loanService.getAll();
      this.loansReturned$=this.loanService.getAllReturned();
      this.loansPending$=this.loanService.getAllPending();
      this.loansExpired$=this.loanService.getAllExpired();
      this.loansExtended$=this.loanService.getAllExtended();
    })
  }
  deleteLoan(id:Number):void{
    this.loanService.deleteLoan(id).subscribe(data=>{
      this.loansAll$=this.loanService.getAll();
      this.loansReturned$=this.loanService.getAllReturned();
      this.loansPending$=this.loanService.getAllPending();
      this.loansExpired$=this.loanService.getAllExpired();
      this.loansExtended$=this.loanService.getAllExtended();
    })
  
  }
}
