import { useRouter } from 'next/router'
import React from 'react'

function TestPage() {

    const router = useRouter()

    console.log(router.query.slug)

    const testSlug = router.query.slug

  return (
    <ul>
        { testSlug && testSlug.map((slug, index) => <li key={index} >{slug}</li> )}
    </ul>
  )
}

export default TestPage