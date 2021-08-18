import React from 'react'
import PropTypes from 'prop-types'
import PostShort from './PostShort'

const Posts = props => {
  const { posts, showPost, getUsersPosts } = props

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">
          {posts.map(post => (<PostShort key={post.post_id} post={post} showPost={showPost} getUsersPosts={getUsersPosts} />))}
        </div>
      </div>
    </div>
  )
}

Posts.propTypes = {
  Posts: PropTypes.arrayOf(PropTypes.shape({
    post_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    created_at: PropTypes.string
  })),
  showPerson: PropTypes.func.isRequired
}

export default Posts
