import AppleSignin from "react-apple-signin-auth";

const AppleSigninButton = ({ t, handleAppleAuth }) => (
  <AppleSignin
    authOptions={{
      clientId: import.meta.VITE_APPLE_CLIENT_ID,
      scope: "email name",
      redirectURI: import.meta.VITE_APPLE_REDIRECT_URI,
      state: "state",
      nonce: "nonce",
      usePopup: true,
    }}
    uiType="dark"
    buttonExtraChildren="Continue with Apple"
    onSuccess={(response) => handleAppleAuth(response)}
    onError={(error) => console.error(error)}
    skipScript={false}
    iconProp={{ style: { marginTop: "10px" } }}
    render={(props) => (
      <button {...props} className="auth_social_btn apple">
        <img src="/icons/Apple.svg" alt="apple" /> {t("auth.appleAccount")}
      </button>
    )}
  />
);

export default AppleSigninButton;
