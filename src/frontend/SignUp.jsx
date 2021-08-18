import React, {useEffect,useState} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const SignUp = props => {
  const { setPage, setState, makeCall } = props
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ password2, setPassword2 ] = useState('')
  const [ error, setError ] = useState({name: false, email: false, pass1: false, pass2: false, msg: ''})
  const passOk = (pass) => pass.length > 7 && pass.match(/[^a-zA-Z]/) != null
  const values = () => !(name.length & email.length & password.length & password2.length) 
  useEffect(() => {
    if (name.length > 0) {
      setError({...error, name: false, msg: ''})
    } else {
      setError({...error, name: true, msg: 'Name must be entered'})
    }
  }, [name])
  useEffect(() => {
    if (email.length > 5 && email.match(/^[^\s]+@[^\s]+\.[a-zA-Z]+$/) != null) {
      setError({...error, email: false, msg: ''})
    } else {
      setError({...error, email: true, msg: 'Email must be valid'})
    }
  }, [email])
  useEffect(() => {
    let pass1err = false
    let pass2err = false
    let passMsg = ''
    if (password != '') {
      if (!passOk(password)) {
        pass1err = true
        passMsg = 'passwords must be at least 8 characters and have a special character'
        //setError({...error, pass1: true, msg: 'passwords must be at least 8 characters and have a special character'})
      }
    }
    if (password2 != '') {
      if (!passOk(password2) && !pass1err) {
        pass2err = true
        passMsg = 'passwords must be at least 8 characters and have a special character'
      }
    }
    if (!pass1err && !pass2err && password != password2) {
      pass2err = true
      passMsg = 'passwords must match'
    }
    setError({...error, pass1: pass1err, pass2: pass2err, msg: passMsg})
  }, [password, password2])
  const update = (fn) => (evt) => fn(evt.target.value)
  const doit = (e) => {
    e.preventDefault()
    if (!error.name&&!error.email&&!error.pass1&&!error.pass2) {
      makeCall({api: 'user', route: 'add', key: null, args: [{name, username: email, password}]})
        .then(res => {
          setState({logged_in: true, page: 'Movies'})
        })
    }
  }
  return (
    <div className="jumbotron">
      <div className="container col-md-4">
        <form className="form-signin" >
          <h1 className="h3 mb-3 font-weight-normal">Sign up</h1>
          <label htmlFor="inputEmail" className="sr-only">Name</label>
          <input type="text" id="name" className="form-control" placeholder="Name" required autoFocus value={name} onChange={update(setName)}/>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="username" className="form-control" placeholder="Email address" required autoFocus value={email} onChange={update(setEmail)}/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Password" required value={password}
            onChange={update(setPassword)}/>
          <label htmlFor="inputPassword2" className="sr-only">Password again</label>
          <input type="password" id="password2" className="form-control" placeholder="Password" required value={password2}
            onChange={update(setPassword2)}/>
          <div className="text-danger" style={{minHeight: '2rem'}} >{values() && error.msg.length > 0 ? error.msg : null }</div>
          <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={doit}>Sign up</button>
        </form>
      </div>
      <div className="container col-md-4 pt-3">
        <a className="text-center" href="" onClick={(e)=>{e.preventDefault(); setPage('Login')}}>
            <span >Already have an account? </span>
            <span >Sign in</span>
        </a>
        <p className="mt-2 mb-3 text-muted">&copy; 2021</p>
      </div>
    </div>
  )
}

export default SignUp
