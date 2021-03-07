import cx from 'classcat'
import React, { ReactElement, ReactNode, useRef } from 'react'
import { SwitchTransition, Transition } from 'react-transition-group'

import { makeClassNameMapper } from './utils'

type Props = {
  children: ReactNode[]
  activeIndex: number
  duration?: number
  shouldAnimateOnMount?: boolean
  enterClassName?: string
  exitClassName?: string
  className?: string
}

function AnimateSwitch({
  activeIndex,
  enterClassName,
  exitClassName,
  className,
  children: childrenProp,
  duration = 250,
  shouldAnimateOnMount,
}: Props): ReactElement {
  const children = Array.isArray(childrenProp) ? [...childrenProp] : [childrenProp]
  /*
    we use a ref here, because passing a dynamic value for the "exitClassName" prop
    will cause a desynchronization for one render (when exiting) everytime it changes
  */
  const exitClassNameRef = useRef<string | undefined>()
  exitClassNameRef.current = exitClassName

  return (
    <SwitchTransition mode="out-in">
      <Transition key={activeIndex} appear={shouldAnimateOnMount} timeout={duration}>
        {transitionStatus => {
          const classNameMapper = makeClassNameMapper({
            enterClassName,
            exitClassName: exitClassNameRef.current,
          })

          return (
            <div className={cx([classNameMapper[transitionStatus], className])}>
              {children[activeIndex]}
            </div>
          )
        }}
      </Transition>
    </SwitchTransition>
  )
}

export { AnimateSwitch }
