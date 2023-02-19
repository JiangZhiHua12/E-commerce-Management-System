import {post} from '@/axios'

export const login=p=>post('/login',p)

