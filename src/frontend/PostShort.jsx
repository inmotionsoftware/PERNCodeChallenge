import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { dateFmt } from './lib'

const PostShort = props => {
  const { post, showPost, getUsersPosts } = props
  return (
    <div key={post.post_id} className="card mb-2 w-100">
      <div className="card-header">
        <h4 href="#" onClick={()=>showPost(post.post_id)}><ReactMarkdown>{post.title}</ReactMarkdown></h4>
      </div>
      <div className="card-body">
        <small className="text-muted">{dateFmt(post.created_at)} by&nbsp; 
          <a href="#" onClick={()=>getUsersPosts(post.user_id)}>{post.name}</a>
        </small>
        <div className="card-text"><ReactMarkdown>{post.slug}</ReactMarkdown></div>
      </div>
    </div>
  )
}

PostShort.propTypes = {
  post: PropTypes.shape({
    post_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    created_at: PropTypes.string
  }).isRequired,
  showPerson: PropTypes.func.isRequired
}

export default PostShort;
