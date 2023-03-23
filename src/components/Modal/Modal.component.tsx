import { useEffect } from 'react'
import { Modal as ModalAntd, Skeleton } from 'antd'

import { useRequest } from '../../hooks/useRequest'
import { ModalType } from './Modal.types'
import { Container, UserPhoto } from './Modal.styles'

interface ModalProps {
  id: string
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ id, onClose }) => {
  const { loading, data, fetchData } = useRequest<ModalType>(
    () => fetch(`https://cat-fact.herokuapp.com/facts/${id}`),
    ['fact', id],
  )

  useEffect(() => {
    if (id) fetchData()
  }, [id])

  return (
    <ModalAntd
      title='Details Information'
      centered
      open={!!id}
      onOk={onClose}
      onCancel={onClose}
      width={650}
    >
      {!loading ? (
        <div>
          <h2>{data?.text}</h2>
          <Container>
            <div>
              <UserPhoto src={data?.user.photo} alt='user' />
              <p>
                First Name: <b>{data?.user.name.first}</b>
              </p>
              <p>
                Last Name: <b>{data?.user.name.last}</b>
              </p>
            </div>
            <div>
              <p>
                Fact ID: <b>{data?._id}</b>
              </p>
              <p>
                User ID: <b>{data?.user._id}</b>
              </p>
              <p>
                Type animal: <b>{data?.type}</b>
              </p>
              <p>
                Created: <b>{data?.createdAt}</b>
              </p>
              <p>
                Updated: <b>{data?.updatedAt}</b>
              </p>
            </div>
          </Container>
        </div>
      ) : (
        <Skeleton active />
      )}
    </ModalAntd>
  )
}
