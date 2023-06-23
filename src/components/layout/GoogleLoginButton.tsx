import React from "react";
import { useDispatch } from "react-redux";
import { authenticateOauthGoogle } from "../../features/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

interface GoogleOauthJwtToken {
  iss: string;
  nbf: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: string;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: string;
  exp: string;
  jti: string;
  alg: string;
  kid: string;
  typ: string;
}

export default function GoogleLoginButton() {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        if (credentialResponse.credential) {
          const jwtData = jwtDecode<GoogleOauthJwtToken>(
            credentialResponse.credential
          );

          dispatch(
            authenticateOauthGoogle(
              jwtData.email,
              credentialResponse.credential
            )
          );
        }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
