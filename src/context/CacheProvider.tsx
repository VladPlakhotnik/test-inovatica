import { useState, createContext } from 'react'
import { isExpired, getExpires } from '../utils/date'
import { omit } from '../utils/object'

interface CacheItemType {
  data: JSON
  expires: number
}

interface ContextType {
  readCache: (queryKey: string) => JSON | undefined
  modifyCache: (queryKey: string, data: JSON) => void
}

export const CacheContext = createContext<ContextType>({
  readCache: (queryKey: string) => undefined,
  modifyCache: (queryKey: string, data: JSON) => {},
})

export const CacheProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cache, updateCache] = useState<Record<string, CacheItemType>>({})

  const modifyCache = (queryKey: string, data: JSON) => {
    updateCache(currentCache => ({
      ...currentCache,
      [queryKey]: { data, expires: getExpires() },
    }))
  }

  const readCache = (queryKey: string): JSON | undefined => {
    const cacheItem = cache[queryKey]
    if (!cacheItem) return

    if (isExpired(cacheItem.expires)) {
      updateCache(omit(cache, queryKey))
      return
    }

    return cacheItem.data
  }

  return (
    <CacheContext.Provider value={{ readCache, modifyCache }}>
      {children}
    </CacheContext.Provider>
  )
}
