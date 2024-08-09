const KaKaoLogin = () => {
  const Rest_api_key = "8ec1c2d801a094cbc3c525fe5f6a53d4"; //REST API KEY
  const redirect_uri = "http://localhost:3000/lend/login"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  const getAccessToken = async (code) => {
    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: Rest_api_key, // REST API 키
        redirect_uri: redirect_uri, // Redirect URI
        code: code, // 인증 코드
      }),
    });

    const data = await response.json();
    return data.access_token;
  };

  const code = new URL(window.location.href).searchParams.get("code");
  return (
    <>
      <button onClick={handleLogin}>카카오 로그인</button>
    </>
  );
};
export default KaKaoLogin;
