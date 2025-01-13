import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Order } from 'src/app/modules/Order';
import { OrderService } from 'src/app/services/order.service';
import { OrderUser } from 'src/app/modules/Order_User';
import { OrdersUserService } from 'src/app/services/orders-user.service';
@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  public ReloadList!:Function;
  public Reset!:Function;
  filterorders='';
  reset!:boolean;
  id_admin!:Number;
  check!:string;
  ordersAll$!:Observable <Order[]>;
  ordersAdmin$!:Observable <Order[]>;
  ordersUsers$!:Observable <OrderUser[]>;
  constructor(private orderService:OrderService,private router:Router,private orderUserService:OrdersUserService) { }

  ngOnInit(): void {
    this.check="all";
    this.reset=false;
    this.id_admin=Number(localStorage.getItem("id_admin"));
    this.ordersAll$=this.orderService.getAll();
    this.ordersAdmin$=this.orderService.getOrdersByAdmin(this.id_admin);
    this.orderUserService.getAllOrdersFromUsers().subscribe(data=>{
      console.log(data)
    })
    this.ordersUsers$=this.orderUserService.getAllOrdersFromUsers();
    this.ReloadList=this.reloadList.bind(this);
    this.Reset=this.ReSet.bind(this);
    
  }
  navigateViewOrder(id:Number){
    this.router.navigate([`orders/view-order/${id}`])
  }
  Filter(filter:string){
    this.check=filter
  }
  reloadList():void{
    this.ordersAll$=this.orderService.getAll()
    this.ordersAdmin$=this.orderService.getOrdersByAdmin(this.id_admin)
  }
  ReSet():void{
    this.reset=!this.reset;
  }
  canConfirm(confirm:Number):Boolean{
    if(confirm>0){return true}else{return false} 
  }
  confirmOrder(id:Number):void{
    this.orderUserService.confirmOrder(id).subscribe(data=>{
    console.log(data)
    this.ordersUsers$=this.orderUserService.getAllOrdersFromUsers();
     })
  
  }  
  deleteOrder(id:Number):void{
    this.orderUserService.deleteOrder(id).subscribe(data=>{
      console.log(data)
      this.ordersUsers$=this.orderUserService.getAllOrdersFromUsers();
    })
  }


}
