import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import PropTypes from 'prop-types'

const Search = props => {
  const { search, showMovie, showPerson } = props
  const [text, setText] = useState('')
  const [visible, setVisibility] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [value] = useDebounce(text, 300, { leading: true })
  const [results, setResults] = useState([])

  useEffect(() => {
    let finished = false

    if (value.length > 2) {
      search.find(value)
        .then((res) => {
          setResults(res)
          setSelectedItem(null)
        })
        .catch((err) => {console.log(err)})
    }

    return () => {finished = true}
  }, [value])

  const onBlur = (evt) => {
    evt.preventDefault()
    setTimeout(() => {
      setVisibility(false)
      setText('')
      setResults([])
    }, 300)
  }

  const onFocus = () => {
    setVisibility(true)
  }

  const onKeyDown = (evt) => {
    switch (evt.key) {
      case 'Escape':
      case 'Esc':
        setVisibility(false)
        break
      case 'Enter':
      case 'Return':
        evt.preventDefault()
        if (selectedItem >= 0 && selectedItem < results.length) {
          setText('')
          setResults([])
          const s = results[selectedItem]
          if (s.match == 'person') {
            showPerson(s)
          } else {
            showMovie(s)
          }
        }
        break
      case 'ArrowDown':
        if (selectedItem == null || selectedItem >= (results.length - 1)) {
          setSelectedItem(0)
        } else {
          setSelectedItem(c => c + 1)
        }
        evt.preventDefault()
        break
      case 'ArrowUp':
        if (selectedItem == null) {
          setSelectedItem(0)
        } else if (selectedItem == 0) {
          setSelectedItem(results.length - 1)
        } else {
          setSelectedItem(c => c - 1)
        }
        evt.preventDefault()
        break
    }
  }

  const onClick = (result) => {
    if (result.match == 'movie' || result.match == 'role') {
      return (evt) => {
        evt.preventDefault()
        setText('')
        setResults([])
        showMovie(result)
      }
    }
    if (result.match == 'person') {
      return (evt) => {
        evt.preventDefault()
        setText('')
        setResults([])
        showPerson(result)
      }
    }
  }

  return (
    <form className="form-inline my-2 my-lg-0">
      <input
        className="form-control mr-sm-2"
        type="text"
        onKeyDown={onKeyDown}
        onChange={(evt) => setText(evt.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        value={text}
        placeholder="Search"
        aria-label="Search"
      />
      <div className={"dropdown-menu dropdown-menu-right " + ((results.length && visible) && 'show')} >
        {results.map((result, i) => {
          const selected = "dropdown-item " + ( i == selectedItem ? ' active' : '')
          return <a key={`key-${i}`} className={selected} href="#" onClick={onClick(result)}>{result.matching_text}</a>
        })}
      </div>
    </form>
  )
}

Search.propTypes = {
  showMovie: PropTypes.func,
  showPerson: PropTypes.func,
}

export default Search;
