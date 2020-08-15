import React from 'react'
import { SwitchTransition, Transition } from 'react-transition-group'

type Props = {
  activeKey: 0 | 1
  enterClassName?: string
  exitClassName?: string
  elementsTuple: [JSX.Element, JSX.Element]
  timeout: number
  shouldAnimateOnMount?: boolean
}

export function AnimateSwitch({
  enterClassName,
  exitClassName,
  shouldAnimateOnMount = true,
  activeKey,
  elementsTuple,
  timeout,
}: Props) {
  const activeElm = getActiveElm(elementsTuple, activeKey)

  return (
    <SwitchTransition mode="out-in">
      <Transition
        appear={shouldAnimateOnMount}
        key={activeKey}
        timeout={timeout}
        onEnter={(e: HTMLElement) => {
          e?.classList.remove(exitClassName ?? '')
          e?.classList.add(enterClassName ?? '')
        }}
        onExit={(e: HTMLElement) => {
          e?.classList.remove(enterClassName ?? '')
          e?.classList.add(exitClassName ?? '')
        }}
      >
        <div>{activeElm}</div>
      </Transition>
    </SwitchTransition>
  )
}

// utils
function getActiveElm(
  elementsTuple: Props['elementsTuple'],
  activeKey: 0 | 1
): JSX.Element {
  return elementsTuple[activeKey]
}
