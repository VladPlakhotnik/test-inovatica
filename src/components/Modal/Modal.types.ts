interface UserType {
  name: { first: string; last: string }
  photo: string
  _id: string
}

export interface ModalType {
  _id: string
  text: string
  type: string
  updatedAt: string
  createdAt: string
  user: UserType
}
