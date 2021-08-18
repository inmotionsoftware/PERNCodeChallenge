import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getCookies } from './lib'

export default class Signin extends Component {
  constructor(props) {
    super(props)
    const cookies = getCookies()
    this.state = { username: (cookies?.username || ''), password: '', remember: !!(cookies?.username) }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange() {
    return event => {
      const obj = {}
      obj[event.target.id] = event.target.hasOwnProperty('checked') ? event.target.checked : event.target.value
      this.setState(obj)
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { login } = this.props
    login(this.state)
  }

  signUpPage(event) {
    event.preventDefault()
    const { setPage } = this.props
    setPage('SignUp')
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="container col-md-4">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input type="email" id="username" className="form-control" placeholder="Email address" required autoFocus value={this.state.username} onChange={this.handleChange()}/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" id="password" className="form-control" placeholder="Password" required value={this.state.password} onChange={this.handleChange()
              }/>
            <div className="checkbox mb-3">
              <label>
                <input id="remember" type="checkbox"
                  value={this.state.password}
                  checked={this.state.remember}
                  onChange={this.handleChange()}/> Remember me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p className="text-center pt-2 display-5" >or</p>
              <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={(e)=> this.signUpPage(e)}>Sign up</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
          </form>
        </div>
      </div>
    )
  }
}

Signin.propTypes = {
  login: PropTypes.func.isRequired
}
