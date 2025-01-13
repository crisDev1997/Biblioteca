export interface Section {
    id_seccion:Number;
    nombre_seccion:String;
    num_seccion:Number;
    tags:String;
}
export interface SectionBooks{
    id_seccion:Number;
    id_libro:Number;
    libro:String;
    genero:String;
    cantidad:Number;
    disponibles:Number;
    nombre_seccion:String;
    num_seccion:Number;
    tags:String;
}

export interface SectionInsertUpdate{
    nombre_seccion:String;
    num_seccion:Number;
    tags:String;
}