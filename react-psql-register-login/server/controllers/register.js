const register = async (req, res, DB_API, bcrypt) => {
  const {username, email, reg_password} = req.body;
  //If string is empty "" equates to false, so !empty_string = true
  if(!username || !email || !reg_password) {
    return res.status(400).json("Error");
  }
  console.log(!username);
  //Check if email exists already, looks for user email submission in DB
  let chk_email = await DB_API('users').where({email: email}).select('email').then(user => user);
  //If user.length() === 0, then the email can be used
  if(chk_email.length === 0 ) {
    //Insert user into database
    //Auto-gen a salt and hash with bcrypt
    const salt = 10;
    const hashed = await bcrypt.hash(reg_password, salt);

    //Store username, email, and HASHED reg_password into DB
    //Database columns (id[auto increment],name, email, joined, pass[encyrpted hash value])
    try {
      await DB_API.transaction(async trx => {
        await trx('users').insert({name: username, email: email, joined: new Date().toISOString().slice(0, 10), pass: hashed}).then(()=> {
          return res.json({type: 'register_success', message: 'Registration successful.'});
        });
      });
    } catch(error) {
        console.error(error);
    }
  }
  else {
    return res.json({type: 'email_in_use', message: 'This email is already in use.'});
  }
};

module.exports = {
  register: register
};