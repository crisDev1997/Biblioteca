import { Component, OnInit, Output, ViewChild , EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormControl,FormGroup,NgForm,Validators} from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserData } from 'src/app/modules/User';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  @ViewChild("formDirective") formDirective!:NgForm;
  @Output() create: EventEmitter<any>=new EventEmitter();

  user$!:Observable<UserData[]>;
  ci$!:string;
  form!: FormGroup;
  constructor(private userService:UserService,private authService:AuthService, private router:Router, private accessId:ActivatedRoute) { }

  ngOnInit(): void {
    let ci=String(this.accessId.snapshot.paramMap.get('ci'));
    this.user$=this.userService.getUser(ci);
    this.form=this.createFormGroup(ci);
    this.user$.subscribe(data=>{
      const fecha=new Date(data[0].fec_nac).toISOString().split("T")[0];
      this.form.setValue({ci:data[0].ci,nombres:data[0].nombres,apellidos:data[0].apellidos,fec_nac:fecha,num_telf:data[0].num_telf,correo:data[0].correo,correo1:data[0].correo,historial_prestamo:data[0].historial_prestamo,observacion:data[0].observacion})
    })
    this.ci$=ci
  }
    createFormGroup(ci:string):FormGroup{
      
    return new FormGroup({
      ci:new FormControl("",[Validators.required,Validators.minLength(7)]),
      nombres:new FormControl("",[Validators.required,Validators.minLength(4)]),
      apellidos:new FormControl("",[Validators.required,Validators.minLength(3)]),
      fec_nac: new FormControl("",[Validators.required,Validators.minLength(2)]),
      num_telf:new FormControl("",[Validators.required,Validators.minLength(2)]),
      correo:new FormControl("",[Validators.required,Validators.minLength(2),Validators.email]),
      correo1:new FormControl("",[Validators.required,Validators.minLength(2),Validators.email]),
      historial_prestamo:new FormControl("",[Validators.minLength(0)]),
      observacion:new FormControl("",[Validators.minLength(0)]),
    })
   
    
  }
  onSubmit(formData:Omit<UserData,"id">):void{
    this.userService.updateUser(this.ci$,formData).pipe(first()).subscribe((data)=>{
      const message1: HTMLElement | null = document.getElementById('message');
      console.log(data)
      const jsondata=JSON.stringify(data)
      if(message1 && jsondata.includes('invalid_message')){
        message1.innerHTML=""
        const p =document.createElement("p");
        const iniMessage=JSON.stringify(data).search('invalid_message":')+18
        const endMessage=JSON.stringify(data).search('!')+1
        const sliced=jsondata.slice(iniMessage,endMessage)
        p.textContent=sliced
        message1.appendChild(p)
      }else{
        this.create.emit(null);
        this.router.navigate([`users/view-user/${formData.ci}`])
      }
      
    })
  }
  resetForm():void{
    this.user$.subscribe(data=>{
      const fecha=new Date(data[0].fec_nac).toISOString().split("T")[0];
      this.form.setValue({ci:data[0].ci,nombres:data[0].nombres,apellidos:data[0].apellidos,fec_nac:fecha,num_telf:data[0].num_telf,correo:data[0].correo,historial_prestamo:data[0].historial_prestamo,observacion:data[0].observacion})
    })
  }
}
