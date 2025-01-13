import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { LoanUser } from 'src/app/modules/Loan';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-edit-loan',
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.css']
})
export class EditLoanComponent implements OnInit {
  public ShowOperations!:Function;
  public ReloadData!:Function;
  id!:Number;
  loanUser$!:Observable<LoanUser[]>;
  fecha_prestamo!:String;
  fecha_vencimiento_entrega!:String;
  fecha_actual!:number;
  fecha_entrega!:number;
  amplied!:boolean;


  constructor(private loanService:LoanService,private router:Router, private accessId:ActivatedRoute) { }
  ngOnInit(): void {
    let id=Number(this.accessId.snapshot.paramMap.get('id'));
    this.loanUser$=this.loanService.getLoan(id)
    this.id=id
    this.fecha_actual=Date.now()
    this.amplied=false;
    this.loanService.getLoan(id).subscribe(data=>{
      this.fecha_entrega=new Date(String(data[0].fecha_prestamo_persona)).getTime()

      this.fecha_prestamo=new Date(data[0].fecha_prestamo_persona).toLocaleDateString('en-GB')
      this.fecha_vencimiento_entrega=new Date(data[0].fecha_vencimiento_entrega).toLocaleDateString('en-GB')
    })
    this.ShowOperations=this.changeToShowOperations.bind(this);
    this.ReloadData=this.reloadData.bind(this);
  }
  changeStateLoan(idAndState:{}):void{ 

    this.loanService.updateStateLoan(idAndState).pipe(first()).subscribe((data)=>{
      console.log(data)
      let id=Number(this.accessId.snapshot.paramMap.get('id'));
      this.loanUser$=this.loanService.getLoan(id)
    })
  }

  changeToExtendDate():void{
    this.amplied=true;
  }
  public changeToShowOperations():void{
    let id=Number(this.accessId.snapshot.paramMap.get('id'));
    this.amplied=false
    this.loanService.getLoan(id).pipe(first()).subscribe(data=>{
      this.fecha_entrega=new Date(String(data[0].fecha_prestamo_persona)).getTime()
    
      this.fecha_prestamo=new Date(data[0].fecha_prestamo_persona).toLocaleDateString('en-GB')
      this.fecha_vencimiento_entrega=new Date(data[0].fecha_vencimiento_entrega).toLocaleDateString('en-GB')
      this.loanUser$=this.loanService.getLoan(id)
    })
    
  }
  NavigateTo(id:Number):void{
    this.router.navigate([`loans/update-loan/${id}`])
  }
  reloadData():void{
    let id=Number(this.accessId.snapshot.paramMap.get('id'));
    this.loanUser$=this.loanService.getLoan(id)
    this.id=id
    this.fecha_actual=Date.now()
    this.amplied=false;
    this.loanService.getLoan(id).subscribe(data=>{
      this.fecha_entrega=new Date(String(data[0].fecha_prestamo_persona)).getTime()

      this.fecha_prestamo=new Date(data[0].fecha_prestamo_persona).toLocaleDateString('en-GB')
      this.fecha_vencimiento_entrega=new Date(data[0].fecha_vencimiento_entrega).toLocaleDateString('en-GB')
    })
  }
  deleteLoan():void{
    this.loanService.deleteLoan(this.id).subscribe(data=>{
      console.log(data)
      this.router.navigate(['loans/loans-list'])
    })
  
  }



}
