import React from 'react'
import type { Country } from '@/payload-types'

export type CountryBlockProps = {
  country: Country
}

export const CountryDescriptionBlock: React.FC<CountryBlockProps> = (props) => {
  const { country } = props

  return (
    <div className="container my-16">
      <label>ID: {country.id}</label>
      <br />
      <label>NAME: {country.name}</label>
      <br />
      <label>SLUG: {country.slug}</label>
      <br />
      <label>FLAG: {country.flag}</label>
    </div>
  )
}
