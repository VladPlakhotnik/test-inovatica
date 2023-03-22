import { useState } from 'react'
import { Button, Modal as ModalAntd } from 'antd'
import { ModalProps } from './Modal.types'
import { FactsListType } from '../FactsList'

export const Modal: React.FC<ModalProps> = ({ id }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'open'>('idle')
  const [fact, setFact] = useState<FactsListType | null>(null)

  const handleDetailsClick = () => {
    setStatus('loading')
    fetch(`https://cat-fact.herokuapp.com/facts/${id}`)
      .then(req => req.json())
      .then(json => {
        setFact(json)
        setStatus('open')
      })
      .catch(() => {
        setStatus('idle')
        errorModal()
      })
  }

  const errorModal = () => {
    ModalAntd.error({
      title: 'Problems with the request',
      onOk() {},
    })
  }

  return (
    <>
      <Button onClick={handleDetailsClick} loading={status === 'loading'}>
        More Details
      </Button>
      <ModalAntd
        title='Details Information'
        centered
        open={status === 'open'}
        onOk={() => setStatus('idle')}
        onCancel={() => setStatus('idle')}
        width={1000}
      >
        <h2>{fact?.text}</h2>
        <p>Id: {fact?._id}</p>
        <p>Type animal : {fact?.type}</p>
        <p>Created : {fact?.createdAt}</p>
        <p>Updated : {fact?.updatedAt}</p>
      </ModalAntd>
    </>
  )
}
