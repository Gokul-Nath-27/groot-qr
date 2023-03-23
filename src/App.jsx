import { useState, useEffect } from "react";
import qr from "./assets/qr.svg";
import "./App.css";
import supabase from "./supabase";
import QRCode from "react-qr-code";

function App() {
  const [Data, setData] = useState([]);

  supabase
    .channel("any")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "verify" },
      (payload) => {
        console.log("Change received!", payload);
        handleData();
      }
    )
    .subscribe();

  const handleData = async () => {
    const { data, error } = await supabase
      .from("verify")
      .select("verified")
      .eq("prodid", 123);
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    handleData();
  }, []);
  return (
    <div className={`App ${Data[0]?.verified}`}>
      <QRCode value="https://tourmaline-chebakia-60518f.netlify.app/" />
      {/* <img src={qr} style={{ height: "500px" }} /> */}
    </div>
  );
}

export default App;
