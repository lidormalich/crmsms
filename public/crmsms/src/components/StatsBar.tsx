import React from "react";

interface StatsBarProps {
  confirmed: number;
  maybe: number;
  notComing: number;
  noResponse: number;
}

const cardStyle: React.CSSProperties = {
  borderRadius: 16,
  boxShadow: "0 2px 8px #0002",
  padding: 20,
  minWidth: 120,
  textAlign: "center",
  background: "#fff",
  margin: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const StatsBar: React.FC<StatsBarProps> = ({
  confirmed,
  maybe,
  notComing,
  noResponse,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: 16,
      marginBottom: 24,
    }}>
    <div style={{ ...cardStyle, border: "2px solid #4caf50" }}>
      <div style={{ color: "#4caf50", fontWeight: 700, fontSize: 18 }}>
        אישרו הגעה
      </div>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{confirmed}</div>
    </div>
    <div style={{ ...cardStyle, border: "2px solid #2196f3" }}>
      <div style={{ color: "#2196f3", fontWeight: 700, fontSize: 18 }}>
        אולי
      </div>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{maybe}</div>
    </div>
    <div style={{ ...cardStyle, border: "2px solid #f44336" }}>
      <div style={{ color: "#f44336", fontWeight: 700, fontSize: 18 }}>
        לא מגיעים
      </div>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{notComing}</div>
    </div>
    <div style={{ ...cardStyle, border: "2px solid #ffb300" }}>
      <div style={{ color: "#ffb300", fontWeight: 700, fontSize: 18 }}>
        טרם ענו
      </div>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{noResponse}</div>
    </div>
  </div>
);

export default StatsBar;
