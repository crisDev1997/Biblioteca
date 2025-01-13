import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteruser'
})
export class FilterUser implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    if(value){
      for(const user of value){
          let userNamelower=this.removeAccents(user.nombres.toLowerCase());
          let userLastNamelower=this.removeAccents(user.apellidos.toLowerCase());
          let argg=this.removeAccents(arg.toLowerCase())
          let usere=userNamelower+" "+userLastNamelower
        if( userNamelower.indexOf(argg) > -1 || userLastNamelower.indexOf(argg) > -1 || usere.indexOf(argg) >-1){
           resultPosts.push(user);
        };
      };
    }
    return resultPosts;
  }
  removeAccents = (str:String) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 
}