export class Compra{
    public _id_libro!: Number;
    public get id_libro_(): Number {
        return this._id_libro;
    }
    public set id_libro_(value: Number) {
        this._id_libro = value;
    }
    public _libro!: String;
    public get libro(): String {
        return this._libro;
    }
    public set libro(value: String) {
        this._libro = value;
    }
    public _cantidad_compra!: Number;
    public get cantidad_compra(): Number {
        return this._cantidad_compra;
    }
    public set cantidad_compra(value: Number) {
        this._cantidad_compra = value;
    }
    public _precio_unitario!: Number;
    public get precio_unitario(): Number {
        return this._precio_unitario;
    }
    public set precio_unitario(value: Number) {
        this._precio_unitario = value;
    }
    public _subtotal!: Number;
    public get subtotal(): Number {
        return this._subtotal;
    }
    public set subtotal(value: Number) {
        this._subtotal = value;
    }
    constructor(id_libro:Number, libro:String,cantidad_compra:Number,precio_unitario:Number,subtotal:Number){
      this._id_libro=id_libro
      this._libro=libro
      this._cantidad_compra=cantidad_compra
      this._precio_unitario=precio_unitario
      this._subtotal=subtotal
    }
  
 
  }