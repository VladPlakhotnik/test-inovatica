import { CACHE_LIFETIME } from '../consts/common'

export const isExpired = (expires: number): boolean => Date.now() > expires

export const getExpires = (): number => Date.now() + CACHE_LIFETIME
