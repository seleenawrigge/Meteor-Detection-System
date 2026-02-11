export default function AlertPanel({ alertLevel }) {
  const alertConfig = {
    INFO: { color: "blue", text: "ℹ️ Sustained meteor detected" },
    TREND: { color: "orange", text: "⚠️ Meteor showing directional trend" },
    HIGH: { color: "red", text: "🔴 Persistent downward trajectory trend detected" }
  };

  if (!alertLevel || alertLevel === "NONE") return null;

  const config = alertConfig[alertLevel];
  if (!config) return null;

  return (
    <div className={`alert ${config.color}`}>
      {config.text}
    </div>
  );
}
