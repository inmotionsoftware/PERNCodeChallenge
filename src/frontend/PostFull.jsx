import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { dateFmt } from './lib'

const PostFull = props => {
  const { post } = props

  return (
    <div className="container">
      <h4><ReactMarkdown>{post.title}</ReactMarkdown></h4>
      <div><small className="text-muted">{dateFmt(post.created_at)} by {post.name}</small></div>
      <div className="col-sm-10 col-md-9">
        <div className="card-text"><ReactMarkdown>{post.body}</ReactMarkdown></div>
      </div>
    </div>
  )
}

PostFull.propTypes = {
  post: PropTypes.shape({
    post_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    created_at: PropTypes.string,
  })
}

export default PostFull
