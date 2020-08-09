import cx from 'classcat'
import React, { PropsWithChildren, ReactNode } from 'react'

import { Meta } from '../../atoms/Meta'
import styles from './styles.module.css'

type Props = Parameters<typeof Meta>[0] & {
  header?: ReactNode
  footer?: ReactNode
}

export function MainLayout({
  title,
  description,
  children,
  header,
  footer,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col h-full">
      <Meta title={title} description={description} />
      {header && (
        <div
          className={cx([
            'flex-none py-2 md:py-8 text-center flex items-center',
            styles.header,
          ])}
        >
          {header}
        </div>
      )}
      <div className="p-4 flex-grow">{children}</div>
      {footer && (
        <div
          className={cx([
            'flex-none py-2 md:py-8 text-center flex items-center',
            styles.footer,
          ])}
        >
          {footer}
        </div>
      )}
    </div>
  )
}
