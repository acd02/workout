import { useEffect, useRef } from 'react'

type Props = {
  func: () => void
  cleanup?: () => void
  deps?: React.DependencyList
}

/**
 * Equivalent to useEffect, but won't get executed on mount
 *
 */
export function useEffectAfterMount({ func, cleanup, deps = [] }: Props): void {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (!isInitialMount.current) func()

    /* eslint-disable-next-line fp/no-mutation */
    isInitialMount.current = false

    return () => cleanup?.()
  }, deps)
}
