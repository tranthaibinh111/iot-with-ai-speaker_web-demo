//#region ReactJS
import React, { useState, useEffect } from "react";
//#endregion

const DetectEnum = {
  OnLights: 1, // Bật đèn
  OnFan: 2, // Bật quạt
  OffLights: 3, // Tắt đèn
  OffFan: 4, // Tắt quạt
};

const URL = "ws://localhost:8080";

const App = () => {
  //#region Parameters
  // Web Socket
  const [ws, setWs] = useState(new WebSocket(URL));

  const [detect, setDetect] = useState(0);
  const [showOnLights, setShowOnLights] = useState(false);
  const [showOnFan, setShowOnFan] = useState(false);
  const [showOffLights, setShowOffLights] = useState(true);
  const [showOffFan, setShowOffFan] = useState(true);
  //#endregion

  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (e) => {
      const now = new Date();
      const message = JSON.parse(e.data);

      console.log(now.toString("yyyy/MM/dd hh:mm:ss"));
      console.log(message);
      setDetect(message);
    };

    return () => {
      ws.onclose = () => {
        console.log("WebSocket Disconnected");
        setWs(new WebSocket(URL));
      };
    };
  }, [ws.onmessage, ws.onopen, ws.onclose]);

  useEffect(() => {
    if (!detect) return;

    if (detect === DetectEnum.OnLights) {
      setShowOnLights(true);
      setShowOffLights(false);
    } else if (detect === DetectEnum.OnFan) {
      setShowOnFan(true);
      setShowOffFan(false);
    } else if (detect === DetectEnum.OffLights) {
      setShowOnLights(false);
      setShowOffLights(true);
    } else if (detect === DetectEnum.OffFan) {
      setShowOnFan(false);
      setShowOffFan(true);
    }
  }, [detect]);

  //#region Render
  const renderHeader = (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
      {/* Brand */}
      <div className="navbar-brand">
        <img alt="Logo" src="/logo192.png" />
      </div>

      {/* Navbar links */}
      <div className="collapse navbar-collapse">
        <h2>DEMO LOA THÔNG MINH</h2>
      </div>
    </nav>
  );

  const renderDetect = () => {
    // if (readyState !== ReadyState.OPEN)
    //   return (
    //     <div className="detect">
    //       <h3>Trạng thái websocket: {connectionStatus}</h3>
    //     </div>
    //   );

    return (
      <div className="detect">
        {detect === DetectEnum.OnLights && <h3>DETECT: BẬT ĐÈN</h3>}
        {detect === DetectEnum.OnFan && <h3>DETECT: BẬT QUẠT</h3>}
        {detect === DetectEnum.OffLights && <h3>DETECT: TẮT ĐÈN</h3>}
        {detect === DetectEnum.OffFan && <h3>DETECT: TẮT QUẠT</h3>}
      </div>
    );
  };

  const renderLights = (off = true) => (
    <div className="card">
      <img
        className="card-img-top mx-auto"
        alt="Đèn"
        src={off ? "/images/den-tat.png" : "/images/den-sang.png"}
      />
      <div className="card-body">
        <h6 className="card-title">{off ? "Đèn tắt" : "Đèn sáng"}</h6>
      </div>
      <div className="card-footer d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setDetect(off ? DetectEnum.OnLights : DetectEnum.OffLights)
          }
        >
          {off ? "Bật Đèn" : "Tắt Đèn"}
        </button>
      </div>
    </div>
  );

  const renderFan = (off = true) => (
    <div className="card">
      <img
        className="card-img-top mx-auto"
        alt="Quạt"
        src={off ? "/images/quat-tat.png" : "/images/quat-bat.png"}
      />
      <div className="card-body">
        <h6 className="card-title">{off ? "Quạt tắt" : "Quạt bật"}</h6>
      </div>
      <div className="card-footer d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setDetect(off ? DetectEnum.OnFan : DetectEnum.OffFan)}
        >
          {off ? "Bật Quạt" : "Tắt Quạt"}
        </button>
      </div>
    </div>
  );

  const renderContainer = (
    <div className="container">
      <div className="row">
        {showOnLights && <div className="col-3">{renderLights(false)}</div>}
        {showOffLights && <div className="col-3">{renderLights()}</div>}
        {showOnFan && <div className="col-3">{renderFan(false)}</div>}
        {showOffFan && <div className="col-3">{renderFan()}</div>}
      </div>
    </div>
  );
  //#endregion

  return (
    <>
      {renderHeader}
      {renderDetect()}
      {renderContainer}
    </>
  );
};

export default App;
