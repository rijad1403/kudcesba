export interface ICarType{
    id: number,
    name: string,
    caption: string,
    status_id: number,
    created_at: string|Date,
    updated_at?: string|Date,
    created_by?: any;
    updated_by? : any;
}
