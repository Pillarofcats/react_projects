import React from 'react';

const Home = ({user, logged_in}) => {
  return (
    <div>
      <h1> Hello, {logged_in ? user.username : "Stranger"}! You have logged in {user.num_login} times!</h1>
      <h3>This is a proof of concept application demonstrating user registration, user login, authentication, data encryption, react router, and a postgreSQL database</h3>
    </div>
  )
};

export default Home;