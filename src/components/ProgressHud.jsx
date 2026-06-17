export default function ProgressHud({ progress }) {
  const percent = Math.round(progress * 100);
  return (
    <aside className="progress-hud" aria-label="Прогресс истории">
      <div className="progress-track">
        <div className="progress-fill" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <p>{percent}% memory timeline</p>
    </aside>
  );
}
