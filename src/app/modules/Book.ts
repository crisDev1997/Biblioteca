export interface BookModel{
    id:Number;
    titulo:String;
    autor:String;
    genero:String;
    id_seccion:Number;
    cantidad:Number;
    disponibles:Number;
    link_pdf_ref:String;
}
export interface BookSection{
    id:Number;
    titulo:String;
    autor:String;
    genero:String;
    nombre_seccion:String;
    num_seccion:Number;
    id_seccion:Number;
    cantidad:Number;
    disponibles:Number;
    link_pdf_ref:String;
}