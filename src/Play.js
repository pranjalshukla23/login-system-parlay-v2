const Play = ({ token }) => {
  console.log("token2", token);
  let str = `https://static-stage-instantgames.yggafrica.com/init/launchClient.html?gameid=10173&lang=en&currency=ZAR&org=ParLay&channel=pc&key=${token}`;
  return (
    <>
      <iframe
        src={str}
        title="ygg iframe1"
        width="1500px"
        height="700px"
      ></iframe>
      <h1>Welcome to parlay games v2</h1>
    </>
  );
};

export default Play;
