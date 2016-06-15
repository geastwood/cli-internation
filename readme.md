# CLI-internation (require node 6.0)

A command line interface for user management.

It has two commands, i.e. *user* and *group*. Each of them has a set of sub commands.

## Get helps

* `node um.js -h`
* `node um.js user -h`
* `node um.js group -h`

## Usage and explanation

`node um.js user|group <cmd>`

### - `node um.js user` (same with `node um.js user list`)
show a list of defined users and its associated group if any.

### - `node um.js user create`
create a user by specifying a username.

### - `node um.js user delete`
delete a user by specifying a username, if this user has been assign to any group, it will be removed as well.

### - `node um.js user add-to-groups`
add a user to multiple groups. 

### - `node um.js group` (same with `node um.js group list)
show a list of defined groups and its associated users if any.

### - `node um.js group create`
create a group by specifying a group name.

### - `node um.js group delete`
delete a group, if the group contains any user, it cannot be deleted.

### - `node um.js group add-users`
add multiple users to a group, it will only show the users that are currently not assigned to this group.

### - `node um.js group remove-users`
remove multiple user from a group.

## Dependencies

* commander 
* inquirer 
* sha1
* q
