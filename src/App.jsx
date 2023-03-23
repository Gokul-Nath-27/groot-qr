import { useState, useEffect } from "react";
import "./App.css";
import supabase from "./supabase";

function App() {
  const [Data, setData] = useState([]);
  const [Realtime, setRealtime] = useState([]);

  supabase
    .channel("any")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "verify" },
      (payload) => {
        console.log("Change received!", payload);
        handleData();
        // setRealtime(payload);
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
    <div className="App">
      <div>Hello</div>
      {Data[0]?.verified ? "true" : "false"}
    </div>
  );
}

export default App;
