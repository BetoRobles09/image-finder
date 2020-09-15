import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import ImageList from './components/ImageList'

/*
  global fetch
*/

function App () {
  const [search, setSearch] = useState('')
  const [images, setImages] = useState([])
  const [currentpage, setCurrentPage] = useState(1)
  const [totalpages, setTotalPages] = useState(1)

  useEffect(() => {
    if (search === '') return
    const consultAPI = async () => {
      const pages = 30
      const apiKey = '15582674-a46db8d67328ff0370526a2c2'
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${search}&per_page=${pages}&page=${currentpage}`

      const response = await fetch(url)
      const result = await response.json()
      setImages(result.hits)
      console.log(result.totalHits)

      const totalPages = Math.ceil(result.totalHits / pages)
      setTotalPages(totalPages)

      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }
    consultAPI()
  }, [search, currentpage])

  const previousPage = () => {
    const newCurrentPage = currentpage - 1
    if (newCurrentPage === 0) return
    setCurrentPage(newCurrentPage)
  }
  const nextPage = () => {
    const newCurrentPage = currentpage + 1
    if (newCurrentPage > totalpages) return
    setCurrentPage(newCurrentPage)
  }

  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Image Finder by Pixabay</p>
        <Form setSearch={setSearch} />
      </div>
      <div className='row justify-content-center'>
        <ImageList images={images} />
        {(currentpage === 1) ? null : (
          <button type='button' className='btn btn-info mr-1 mb-2' onClick={previousPage}>&laquo; Previous</button>
        )}
        {(currentpage === totalpages) ? null : (
          <button type='button' className='btn btn-info mb-2' onClick={nextPage}>Next &raquo;</button>
        )}
      </div>
    </div>
  )
}

export default App
