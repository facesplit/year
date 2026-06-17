import { AnimatePresence, motion } from "framer-motion";

function getBeat(progress, story) {
  if (progress < 0.08) return { key: "intro", eyebrow: story.intro.eyebrow, title: story.intro.title, body: story.intro.body };
  if (progress < 0.16) return { key: "date", eyebrow: "Дата", title: story.anniversaryDate, body: "День, с которого начинается эта маленькая вселенная." };
  if (progress < 0.32) return { key: "memories", eyebrow: "Воспоминания", title: "Они появляются не сразу", body: "Каждый кадр всплывает медленно, как будто пространство вспоминает вместе с нами." };
  if (progress < 0.63) return { key: "flight", eyebrow: "Memory timeline", title: "Лети сквозь моменты", body: "Scroll ведёт камеру от одного кадра к другому, а каждый поворот открывает историю." };
  if (progress < 0.76) return { key: "calendar", eyebrow: "Календарь", title: "03.05.2025", body: "Одна дата становится дверью в главное воспоминание." };
  if (progress < 0.88) return { key: "heart", eyebrow: "Кульминация", title: "Смотри дальше", body: "Все фрагменты собираются в форму, которую можно понять только издалека." };
  return null;
}

export default function GlassOverlay({ progress, story }) {
  const beat = getBeat(progress, story);
  return (
    <div className="glass-overlay" aria-live="polite">
      <AnimatePresence mode="wait">
        {beat && (
          <motion.article
            key={beat.key}
            className="story-copy"
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">{beat.eyebrow}</p>
            <h1 className="headline">{beat.title}</h1>
            <p className="body-copy">{beat.body}</p>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
