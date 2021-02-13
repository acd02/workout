import { ClassNameMapper } from './types'

function makeClassNameMapper({
  enterClassName,
  exitClassName,
}: {
  enterClassName?: string
  exitClassName?: string
}): ClassNameMapper {
  return {
    entering: enterClassName as string,
    exiting: exitClassName as string,
  }
}

export { makeClassNameMapper }
