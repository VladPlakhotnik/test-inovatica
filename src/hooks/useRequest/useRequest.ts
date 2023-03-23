import { useState, useCallback, useContext } from 'react'
import { Modal } from 'antd'

import { CacheContext } from '../../context/CacheProvider'

export const useRequest = <T>(
  request: () => Promise<Response>,
  queryKey: any,
) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>()
  const { readCache, modifyCache } = useContext(CacheContext)

  const fetchData = useCallback(() => {
    const cachedData = readCache(JSON.stringify(queryKey))
    if (cachedData) {
      setData(cachedData as T)
      return
    }
    setLoading(true)
    request()
      .then(req => req.json())
      .then(json => {
        modifyCache(JSON.stringify(queryKey), json)
        setData(json)
      })
      .catch(() => {
        showErrorModal()
      })
      .finally(() => {
        setLoading(false)
      })
  }, [request, queryKey])

  return { loading, data, fetchData }
}

const showErrorModal = () => {
  Modal.error({
    title: 'Problems with the request',
    onOk() {},
  })
}
