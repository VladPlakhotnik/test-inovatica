import { useState, useEffect } from 'react'
import { Button, Modal as ModalAntd } from 'antd'

import { useRequest } from '../../hooks/useRequest'
import { ModalType } from './Modal.types'

interface ModalProps {
  id: string
}

export const Modal: React.FC<ModalProps> = ({ id }) => {
  const [open, setOpen] = useState(false)
  const { loading, data, fetchData } = useRequest<ModalType>(() =>
    fetch(`https://cat-fact.herokuapp.com/facts/${id}`),
  )

  useEffect(() => {
    data && setOpen(true)
  }, [data])

  return (
    <>
      <Button onClick={fetchData} loading={loading}>
        More Details
      </Button>
      <ModalAntd
        title='Details Information'
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <h2>{data?.text}</h2>
        <p>Id: {data?._id}</p>
        <p>Type animal : {data?.type}</p>
        <p>Created : {data?.createdAt}</p>
        <p>Updated : {data?.updatedAt}</p>
      </ModalAntd>
    </>
  )
}
