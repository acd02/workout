import { Badge } from 'components/atoms/Badge'
import { WorkoutContext } from 'machines/workout'
import React from 'react'

import styles from './styles.module.css'

type Props = {
  context: WorkoutContext
}

export function Header({ context }: Props) {
  return (
    <div className="w-full text-center">
      <div className="text-gray-900 text-xl leading-5 font-medium">
        <div className="mb-4">
          mode: <Badge label={context.mode ?? ''} color="orange" />
        </div>
        <div className="py">
          {context.mode === 'single' ? (
            <>💪</>
          ) : (
            <>
              💪 <span className={styles.flip}>💪</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
