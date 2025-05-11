import clsx from 'clsx'
import React from 'react'

import Image from 'next/image'
import logo from './go-eu-logo.png'
import logoSvg from './goEuropeanLogo.svg'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <Image
      alt="Go European Logo"
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[60px]', className)}
      src={logoSvg}
    />
  )
}
