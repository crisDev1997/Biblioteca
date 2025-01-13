import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterloan'
})
export class FilterLoan implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    if(value){
      for(const loan of value){
          let userNamelower=this.removeAccents(loan.nombres.toLowerCase());
          let userLastNamelower=this.removeAccents(loan.apellidos.toLowerCase());
          let lib=this.removeAccents(loan.titulo.toLowerCase());
          let argg=this.removeAccents(arg.toLowerCase())
          let usere=userNamelower+" "+userLastNamelower
        if( userNamelower.indexOf(argg) > -1 || userLastNamelower.indexOf(argg) > -1 || usere.indexOf(argg) >-1 ||lib.indexOf(argg) >-1){
           resultPosts.push(loan);
        };
      };
    }
    return resultPosts;
  }
  removeAccents = (str:String) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 
}