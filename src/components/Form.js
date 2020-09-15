import React, { useState } from 'react'
import Error from './Error'

const Form = ({ setSearch }) => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(false)

  const searchImages = e => {
    e.preventDefault()

    if (query.trim() === '') {
      setError(true)
      return
    }
    setError(false)
    setSearch(query)
  }

  return (
    <form onSubmit={searchImages}>
      <div className='row'>
        <div className='form-group col-md-8'>
          <input type='text' className='form-control form-control-lg' placeholder='Search an image, ex: football or coffee' onChange={e => setQuery(e.target.value)} />
        </div>
        <div className='form-group col-md-4'>
          <input type='submit' className='btn btn-lg btn-danger btn-block' value='Search' />
        </div>
      </div>
      {error ? <Error message='Add a search term' /> : null}
    </form>
  )
}

export default Form
