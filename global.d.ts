declare type UnknownObj = Record<string, unknown>

declare type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

declare module '*.css' {
  interface ClassNames {
    [className: string]: string
  }
  const classNames: ClassNames
  export = classNames
}
