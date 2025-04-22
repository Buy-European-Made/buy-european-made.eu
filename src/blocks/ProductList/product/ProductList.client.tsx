'use client'

import React, { useEffect, useState, useRef } from 'react'
import { EuProduct } from '@/payload-types'
import { ProductCard } from './Component'
import { useQueryState } from 'nuqs'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

export const ProductListClient: React.FC<{
  products: EuProduct[]
}> = ({ products: initialProducts }) => {
  const [products, setProducts] = useState<EuProduct[]>(initialProducts)
  const [search, setSearch] = useQueryState('s', {
    throttleMs: 500,
  })
  const [loading, setLoading] = useState(false)
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    const controller = new AbortController()
    const signal = controller.signal

    const fetchProducts = async () => {
      setLoading(true)
      console.log('Fetching products for client search:', search)
      try {
        const response = await fetch('/eu-products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ s: search }),
          signal,
        })
        if (!response.ok) {
          if (response.status === 0 && signal.aborted) {
            console.log('Fetch aborted')
            return
          }
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          console.log('Fetch aborted successfully.')
        } else {
          console.error('Failed to fetch products:', error)
          setProducts([])
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      controller.abort()
      setLoading(false)
    }
  }, [search])

  return (
    <div className="max-w-screen-lg mx-auto px-3">
      <Input
        className="mb-4 w-full"
        type="text"
        value={search ?? ''}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-screen">
        {loading ? (
          <>
            <Skeleton className="h-96 rounded-lg" />
            <Skeleton className="h-96 rounded-lg" />
            <Skeleton className="h-96 rounded-lg" />
            <Skeleton className="h-96 rounded-lg" />
          </>
        ) : products.length > 0 ? (
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />
          })
        ) : (
          <div className="col-span-full text-center bg-muted p-4 rounded-lg h-fit">
            No products found.
          </div>
        )}
      </div>
    </div>
  )
}
