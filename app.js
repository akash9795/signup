// 552eba7d79
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});


app.post("/", function(req, res) {
    const f_name = req.body.fname;
    const l_name = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: f_name,
                    LNAME: l_name
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url =  'https://us21.api.mailchimp.com/3.0/lists/552eba7d79';

    const options =   {
        method: "POST",
        auth: "akash9795:7e2b190bc459be13e3bad4a9320d51a6-us21"
    }
    const request = https.request(url, options, function(response) {
        
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();

     
});

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(3000 , function() {
    console.log("Server started on port 3000 !");
})
