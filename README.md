nichijou
============
Nichijou(日常) is a simple and clean blog system powered by Node.js and AngularJS.

##Install

    git clone https://github.com/ricterz/nichijou.git
    cd nichijou
    npm install -d

##Set the username and password

    vi init.js

##Initialize the database

    node init

##Run

    nohup node app &
    
##Add a post

    cd post
    vi article.md
    
And `esc :wq` to save and exit vi, then

    node post

##Delete a post
Unfished, but you can use `Postman` and login access `http://foo.com/api-auth`, and post a json data with username and password.

    {
        'username': 'rixb',
        'password': 'admin'
    }

then will return:

    {
        "token": "MaJ+EMjpnAXPsJCgFWsdZj3dPLT7x84CwB/WQJfz"
    }
    
and set headers:

    Content-Type: application/json
    Authorization: MaJ+EMjpnAXPsJCgFWsdZj3dPLT7x84CwB/WQJfz
    
you can use `DELETE`, `PUT` method to delete or modify a post.
