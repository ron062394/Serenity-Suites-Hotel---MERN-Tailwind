import React from 'react'

function UserSignup() {
  return (
    <section>
      {/* Signup Banner */}
      <div>
        <h2>Create an account and get started</h2>
        <h3>Why should you join us</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat quo dolorum nesciunt deserunt velit.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam exercitationem molestias ducimus!</p>
      </div>

      {/* Signup form */}
      <form>
        <label htmlFor="">First Name</label>
        <input type="text" />
        <label htmlFor="">Email Address</label>
        <input type="email" />
        <label htmlFor="">Password</label>
        <input type="password" name="" id="" />
        <button>Sign up</button>
      </form>
    </section>
  )
}

export default UserSignup
