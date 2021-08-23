const express = require("express")
const config = require("config")
const querystring = require("querystring");
const axios = require("axios")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const auth = require("./middlewear/auth")
const {userModel} = require("../models/models");


const router = express()


const key = config.get("key")
const clientSecret = config.get("GOOGLE_CLIENT_SECRET")
const clientID = config.get("GOOGLE_CLIENT_ID")
const COOKIE_NAME = config.get("COOKIE_NAME")
const SERVER_ROOT_URI = config.get("SERVER_ROOT_URI")
const redirectURI = "oauth/google"


function getGoogleAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: `${SERVER_ROOT_URI}/login/${redirectURI}`,
      client_id: clientID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
  
    return `${rootUrl}?${querystring.stringify(options)}`;
  }

  function getTokens({code, clientId, clientSecret, redirectUri}) {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
}
    return axios.post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch auth tokens`);
      throw new Error(error.message);
    });
};
   

router.get(`/oauth/google`, async (req, res) => {
    const code = req.query.code
    const { id_token, access_token } = await getTokens({
      code,
      clientId: clientID,
      clientSecret: clientSecret,
      redirectUri: `${SERVER_ROOT_URI}/login/${redirectURI}`,
    });

  
    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user`);
        throw new Error(error.message);
      });

    const user = await userModel.findOne({email: googleUser.email})
    if (!user) await saveUser(googleUser)

    const token = jwt.sign(googleUser, key);
  
    res.cookie(COOKIE_NAME, token, {
        maxAge: 15 * 60 * 1000, // 15 minutes on cookie age 
        httpOnly: true,
        secure: false,
    });
    res.redirect(SERVER_ROOT_URI);
  });
  
router.get("/", (req,res) => res.redirect(getGoogleAuthURL()))

router.get("/verify", auth, (req, res) => res.status(200).send({success: "logged in sucessfully"}))

async function saveUser(googleUser) {
  const { email, id, name } = googleUser
  const user = new userModel({email, google_id: id, name});
  const response = await user.save()
}

module.exports = router

