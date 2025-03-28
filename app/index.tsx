import { Redirect } from 'expo-router'
import React, { memo } from 'react'

const index = memo(() => {
  return <Redirect href={"/LoginScreen"}/>;
})

export default index  