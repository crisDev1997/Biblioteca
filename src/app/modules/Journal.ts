export interface Journal{
    id:Number;
    id_rev:Number;
    titulo:String;
    titular:String;
    num_volumen:Number;
    num_revista:Number;
    fecha_publicacion:Date;
    cantidad:Number;
    cantidad_disponible:Number;
    link_pdf_ref:String;

}
export interface JournalModel{
    id:Number;
    titulo:String;
    titular:String;
    num_volumen:Number;
    num_revista:Number;
    fecha_publicacion:Date;
    cantidad:Number;
    disponibles:Number;
    link_pdf_ref:String;
}