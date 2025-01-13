import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Purchase, PurchaseDetails } from 'src/app/modules/Purchase';
import { PurchaseService } from 'src/app/services/purchase.service';
import { BookService } from 'src/app/services/book.service';
import { BookSection } from 'src/app/modules/Book';
import { Compra } from 'src/app/Class/Compra';
import { AddJournalLoanComponent } from '../../loans/add-journal-loan/add-journal-loan.component';
@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.css']
})


export class PurchasesListComponent implements OnInit {
 
  check!:string;
  id_admin!:Number;
  purchasesAll$!:Observable <Purchase[]>;
  purchasesAdmin$!:Observable <Purchase[]>;
  idCompra!:Number;
  nombAdmin!:String;
  descCompra!:String;
  fechaCompra!:Date;
  details$!:Observable <PurchaseDetails []>;
  formPurchase!:FormGroup;
  booksAll$!:Observable <BookSection[]>;

  AddDetailspurchases$!:Array<Compra>;
  idL!:Number;
  lb!:String;

  constructor(private purchaseService:PurchaseService,private modalService: NgbModal, private bookService:BookService) { }

  ngOnInit(): void {
    this.check="all";
    this.id_admin=Number(localStorage.getItem("id_admin"));
    this.purchasesAll$=this.purchaseService.getAllPurchases()
    this.purchasesAdmin$=this.purchaseService.getAllMyPurchases(this.id_admin);
    this.details$=this.purchaseService.getDetailsFromPurchase(1);
    this.booksAll$=this.bookService.getAllBooks()
    this.idL=0
    this.lb=''
    this.AddDetailspurchases$=[]


    this.formPurchase=this.createFormGroup()
    let fecha_actual=new Date(Date.now()).toISOString().split("T")[0];
    this.formPurchase.controls['id_admin'].setValue(this.id_admin)
    this.formPurchase.controls['fecha_compra'].setValue(fecha_actual)
  }
  Filter(filter:string){
    this.check=filter
  }
  createFormGroup():FormGroup{
    return new FormGroup({
      id_admin:new FormControl('',[Validators.required,Validators.minLength(4)]),
      descripcion:new FormControl('',[Validators.required,Validators.minLength(4)]),
      fecha_compra:new FormControl('',[Validators.required,Validators.minLength(4)]),
      id_libro:new FormControl('',[Validators.required,Validators.minLength(1)]),
      cantidad_compra:new FormControl("",[Validators.required,Validators.minLength(1)]),
      precio_unitario:new FormControl("",[Validators.required,Validators.minLength(1)]),
    })
  }
  ShowDetailsModal(id_compra:Number,nomb_admin:String,descripcion:String,fecha_compra:Date,DetailsModal:any){
    this.idCompra=id_compra;
    this.nombAdmin=nomb_admin;
    this.descCompra=descripcion;
    this.fechaCompra=fecha_compra;
    this.details$=this.purchaseService.getDetailsFromPurchase(this.idCompra)
    this.modalService.open(DetailsModal, {size: 'lg'})
  }
  newPurchase(PurchaseForm:any){
    this.modalService.open(PurchaseForm,{size: 'xl'})
  }
  onSubmitPurchase():void{
    document.getElementById('btnClose2')?.click()
  }
  changeIdBook(event:any){
    this.idL=Number(event.target.value)
    this.bookService.getBook(this.idL).subscribe(data=>{
      this.lb=data[0].titulo
    })
  }
  AddPurchase(cantCompra:String,compPrecio:String){
    if(this.idL>0){
      let cantC=Number(cantCompra)
      let preC=Number(compPrecio)
      if(cantC>0 && preC>0){
        let compra=new Compra(this.idL,this.lb,cantC,preC,cantC*preC);  
        let found=this.AddDetailspurchases$.find(element=>element._id_libro==this.idL)
        if(!found){
          this.AddDetailspurchases$.push(compra)
          this.formPurchase.controls['id_libro'].setValue('2,3,4')
          this.formPurchase.controls['cantidad_compra'].setValue('2,3,4')
          this.formPurchase.controls['precio_unitario'].setValue('20,30,20')
        }else{

        }
      }
    }
  }
  removeDetails(detail:any){
    this.AddDetailspurchases$.splice(detail,1)
    if(this.AddDetailspurchases$.length==0){
      this.formPurchase.controls['id_libro'].setValue('')
    }
  }
  toSplit(arr:any,camp:String):String{
    let arre=''
    for(let i=0;i<arr.length;i++){
      arre+=arr[i][`${camp}`]+','
    }
    arre=arre.substring(0,arre.length-1)
    return arre;
  }
  addPurchase(){
    
    let idsLibros=this.toSplit(this.AddDetailspurchases$,'_id_libro')
    let canCompras=this.toSplit(this.AddDetailspurchases$,'_cantidad_compra')
    let precioCompras=this.toSplit(this.AddDetailspurchases$,'_precio_unitario')
    this.formPurchase.controls['id_libro'].setValue(idsLibros)
    this.formPurchase.controls['cantidad_compra'].setValue(canCompras)
    this.formPurchase.controls['precio_unitario'].setValue(precioCompras)
    this.purchaseService.addPurchase(this.formPurchase.value).subscribe(data=>{

      this.purchasesAll$=this.purchaseService.getAllPurchases()
      this.purchasesAdmin$=this.purchaseService.getAllMyPurchases(this.id_admin);
      this.AddDetailspurchases$=[]
    })
  }
}
