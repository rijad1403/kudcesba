export interface ICar{
    id: number,
    manufacturer: string,
    model: string,
    color: string,
    user_id: number,
    created_at: string|Date,
    updated_at: string|Date,
    seats: number,
    status_id: number,
    car_type_id: number
}
