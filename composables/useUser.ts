import { useState } from '#app'
import { User } from '@auth0/auth0-spa-js'

export default function () {
  return useState<User>('user', () => null)
}