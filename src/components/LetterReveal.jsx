import { AnimatePresence, motion } from "framer-motion";

export default function LetterReveal({ progress, story }) {
  const visible = progress > 0.88;
  return (
    <div className="letter-reveal" aria-live="polite">
      <AnimatePresence>
        {visible && (
          <motion.article
            className="letter-card"
            initial={{ opacity: 0, y: 42, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">Для {story.recipient}</p>
            <h2>{story.finale.title}</h2>
            <p>{story.finale.letter}</p>
            <strong>{story.signature}</strong>
            <span className="heartbeat" aria-hidden="true" />
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
