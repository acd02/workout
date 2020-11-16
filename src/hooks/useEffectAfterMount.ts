import { DependencyList, useEffect, useRef } from 'react'

/**
 * Equivalent to useEffect, but won't get executed on mount
 *
 */
export function useEffectAfterMount(
  func: () => void,
  deps?: DependencyList,
  cleanup?: () => void
): void {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (!isInitialMount.current) func()

    /* eslint-disable-next-line fp/no-mutation */
    isInitialMount.current = false

    return () => cleanup?.()
  }, deps || [])
}
