export interface ICity{
    name: string
    id?: number
    id_str: string
}

export interface ICityQuery extends ICity{
    show: boolean
  }