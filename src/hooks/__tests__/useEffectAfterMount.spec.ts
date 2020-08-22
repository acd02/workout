import { renderHook } from '@testing-library/react-hooks'

import { useEffectAfterMount } from '../useEffectAfterMount'

/* eslint-disable fp/no-mutation,fp/no-let */

let counterDep = 0

function updateCounterDep() {
  counterDep++
}

afterEach(() => {
  counterDep = 0
})

describe('useEffectAfterMount', () => {
  it('should not execute the func on the first render', () => {
    let localCount = 0

    renderHook(() =>
      useEffectAfterMount({
        func: () => localCount++,
        cleanup: () => localCount++,
      })
    )

    expect(localCount).toEqual(0)
  })

  it('should execute the func and the cleanup func on subsequent renders when deps did changed', () => {
    let localCount = 0

    const { rerender } = renderHook(() =>
      useEffectAfterMount({
        func: () => localCount++,
        cleanup: () => (localCount += 2),
        deps: [counterDep],
      })
    )

    updateCounterDep()
    rerender()
    expect(localCount).toEqual(3)

    updateCounterDep()
    rerender()
    expect(localCount).toEqual(6)
  })

  it("should not execute the func nor the cleanup func on subsequent renders when deps didn't changed", () => {
    let localCount = 0

    const { rerender } = renderHook(() =>
      useEffectAfterMount({
        func: () => localCount++,
        cleanup: () => localCount++,
        deps: [counterDep],
      })
    )

    rerender()
    expect(localCount).toEqual(0)
  })

  it('should execute the cleanup function on unmount', () => {
    let localCount = 0

    const { unmount, rerender } = renderHook(() =>
      useEffectAfterMount({
        func: () => localCount++,
        cleanup: () => (localCount += 2),
        deps: [counterDep],
      })
    )

    updateCounterDep()
    rerender()
    expect(localCount).toEqual(3)

    unmount()
    expect(localCount).toEqual(5)
  })

  it('should execute the cleanup function on unmount even when deps never changed', () => {
    let localCount = 0

    const { unmount, rerender } = renderHook(() =>
      useEffectAfterMount({
        func: () => localCount++,
        cleanup: () => localCount++,
      })
    )

    rerender()
    unmount()
    expect(localCount).toEqual(1)
  })
})
