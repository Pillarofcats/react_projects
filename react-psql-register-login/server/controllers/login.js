const { default: knex } = require("knex");

const login = async (req, res, DB_API, bcrypt) => {
  console.log("\nReceived Client Login:", req.body);
  const {log_email, log_password} = req.body;

  //Get user hashed password from DB to compare
  let db_hash_pass = await DB_API('users').where({email: log_email}).select('pass').then(user => user);
  console.log('has pass in db', db_hash_pass[0].pass);
  //Check database for user and validate credentials (HASH NEEDS TO BE A STRING)
  const chk_hash_pass = await bcrypt.compare(log_password, db_hash_pass[0].pass);

  console.log('pass=pass', chk_hash_pass);

  //If valid credentials, server response with user login credentials from database
  if(chk_hash_pass === true) {
    //Get DB user info {id, name, email, joined}
    try {
      await DB_API.transaction(async trx => {
        // //Increment number of times user has logged in, update num_login in DB
        await trx('users').where({email: log_email}).increment({num_login: 1});
        //Get user DB data and send to front-end
        await trx('users').select('*').where({email: log_email}).then((user)=> {
          console.log(user);
          return res.json({type: 'successful_login', message: 'Successful Login',
            id: user[0].id, username: user[0].name, email: user[0].email, joined: user[0].joined, num_login: user[0].num_login});
        });
      });
    } catch(error) {
        console.error(error);
    }
  } else {
    res.json({type: 'failed_login', message: 'Failed Login'});
  }
};

module.exports = {
  login: login
};