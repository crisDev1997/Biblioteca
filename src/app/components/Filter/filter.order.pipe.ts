import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbookorder'
})
export class FilterOrder implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    if(value){
    for(const order of value){
        let booklower=this.removeAccents(order.lib_pedido.toLowerCase())
        let argg=this.removeAccents(arg.toLowerCase())
      if(booklower.indexOf(argg) > -1){
         resultPosts.push(order);
      };
    };
  }
    return resultPosts;
  }
  removeAccents = (str:String) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 
}