import { NextPage } from 'next'
import React from 'react'

type Props = {
  statusCode?: number
}

const Error: NextPage<Props, unknown> = ({ statusCode }) => {
  return (
    <div className="flex items-center justify-center h-full">
      {(() => {
        if (statusCode)
          return statusCode === 404
            ? 'Oops, missing page'
            : `An error ${statusCode} occurred on server`
        else return 'An error occurred on client'
      })()}
    </div>
  )
}

Error.getInitialProps = ({ err, res }) => {
  const statusCode = (() => {
    if (err) return err.statusCode
    if (res) return res.statusCode
    else return 404
  })()

  return { statusCode }
}

export default Error
