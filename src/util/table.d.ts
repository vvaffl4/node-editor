
declare type TableObject<T extends number | string, U> = {
  [i in T]: U
}

declare type Table <T extends number | string, U> = {
  byId: TableObject<T, U>,
  allIds: T[]
}