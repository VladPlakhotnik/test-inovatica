import { useState, useCallback } from 'react'
import { Modal } from 'antd'

export const useRequest = <T>(request: () => Promise<Response>) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>()

  const fetchData = useCallback(() => {
    setLoading(true)
    request()
      .then(req => req.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(() => {
        showErrorModal()
        setLoading(false)
      })
  }, [request])

  return { loading, data, fetchData }
}

const showErrorModal = () => {
  Modal.error({
    title: 'Problems with the request',
    onOk() {},
  })
}
