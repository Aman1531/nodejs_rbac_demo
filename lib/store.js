exports = module.exports = Store;
var fs = require('fs');
/*fs.readFile(filepath, 'utf8', function (err, data) {
  if (err) {
    // handle error
    return;
  }

  jsonData = JSON.parse(data);
});*/
var jsonData=require('./db.json')
function Store() {
  // Mock data!
  var users = jsonData

  this.userGet = function(userId) {
    return new Promise(function(resolve, reject) {
      var usr = users.find(function(u) {
        return u.id === userId;
      });
      if(usr) {
        resolve(usr);
      } else {
        reject("Could not find user with id: " + userId);
      }
    });
  };

  this.userLogIn = function(email) {
    return new Promise(function(resolve, reject) {
      var usr = users.find(function(u) {
        return u.email === email;
      });
      if(usr) {
        resolve(usr);
      } else {
        reject("Could not find user with email: " + email);
      }
    })
  };
  this.getAll = function() {
    return users;
  };

  this.getEmp = function() {
    return users.filter(u => u.roles[0] === "Employee");
  };
this.getbyEmail = function(email) {
  return users.filter(u => u.email === email);
}
this.updateUser = function(u) {
  const index = users.findIndex(user => user.email === u.email)
  //users[index] = u;
  Object.keys(u).forEach(key => {
  users[index][key] = u[key]
  })
  fs.writeFileSync('./lib/db.json',JSON.stringify(users))
}
this.createUser = function(u) {
  //users[index] = u;
users.push(u)
  fs.writeFileSync('./lib/db.json',JSON.stringify(users))
}
this.delteUser = function(email) {
  const index = users.findIndex(user => user.email === email)
  users.splice(index,1)
  fs.writeFileSync('./lib/db.json',JSON.stringify(users))
}

}
