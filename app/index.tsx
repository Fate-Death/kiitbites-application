import { Redirect } from 'expo-router'
import React, { memo } from 'react'

const index = memo(() => {
  return <Redirect href={"/login/LoginForm"}/>;
})

export default index  