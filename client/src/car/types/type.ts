import internal from "stream"

export type User={
    id:number,
    name:string,
    email:string,
    password:string,


}

export type Car = {
    id:number
    name:string,
    staticCarId:number,
    userId:number
}


export type Favorite={
    id:number,
    title:string,
    lat:number,
    long:number,
    location:string,
    userId:number
}

export type Kategory = {
    id:number,
    name:string
}
export type StaticCar={
    id:number,
    km:number,
    company:string,
    model:string
}


export type AuthUser = {
    user: User,
    token: string
}