import React, { PropsWithChildren, ReactNode } from 'react'

import { Meta } from '../../atoms/Meta'

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
    <div className="grid grid-rows-[1fr,1fr,1fr] md:grid-rows-[auto,1fr,auto] h-full">
      <Meta title={title} description={description} />
      {header && (
        <div className="flex-none py-2 md:py-8 text-center flex items-center md:min-h-[200px]">
          {header}
        </div>
      )}
      {children}
      {footer && (
        <div className="md:py-8 md:min-h-[200px] flex items-center flex-none py-2 text-center">
          {footer}
        </div>
      )}
    </div>
  )
}
