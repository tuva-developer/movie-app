import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

type HomeIntroProps = {
  onFinish: () => void;
};

type CardConfig = {
  delay: number;
  duration: number;
  targetX: string;
  targetY: string;
  width: string;
  height: string;
  startRotate: string;
  endRotate: string;
  scale: string;
  zIndex: number;
};

type Viewport = {
  width: number;
  height: number;
};

const EXIT_DURATION_MS = 650;
const CARD_ASPECT_RATIO = 1060 / 729;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const randomFromIndex = (index: number, seed: number) => {
  const value = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const easeOutPower = (value: number, power: number) =>
  1 - Math.pow(1 - value, power);

const buildCards = ({ width, height }: Viewport): CardConfig[] => {
  const cardWidth = clamp(Math.round(width * 0.17), 118, 206);
  const cardHeight = Math.round(cardWidth / CARD_ASPECT_RATIO);
  const horizontalBleed = Math.max(Math.round(cardWidth * 0.7), 84);
  const verticalBleed = Math.max(Math.round(cardHeight * 0.32), 42);
  const usableWidth = Math.max(width + horizontalBleed * 2, cardWidth);
  const usableHeight = Math.max(height + verticalBleed * 2, cardHeight);
  const colStep = Math.max(cardWidth * 0.82, 122);
  const rowStep = Math.max(cardHeight * 0.9, 112);
  const cols = Math.max(1, Math.ceil((usableWidth - cardWidth) / colStep) + 1);
  const rows = Math.max(1, Math.ceil((usableHeight - cardHeight) / rowStep) + 1);
  const gridWidth = (cols - 1) * colStep + cardWidth;
  const gridHeight = (rows - 1) * rowStep + cardHeight;
  const startLeft = -horizontalBleed + (usableWidth - gridWidth) / 2;
  const startTop = -verticalBleed + (usableHeight - gridHeight) / 2;
  const totalCards = rows * cols;
  const cards: CardConfig[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const index = row * cols + col;
      const landingOrder = (rows - 1 - row) * cols + col;
      const landingProgress =
        totalCards === 1 ? 0 : landingOrder / (totalCards - 1);
      const easedLandingProgress = easeOutPower(landingProgress, 2.35);
      const horizontalOffset = (randomFromIndex(index, 1) - 0.5) * 12;
      const verticalOffset = (randomFromIndex(index, 2) - 0.5) * 18;
      const startRotate = `${(randomFromIndex(index, 3) * 76 - 38).toFixed(2)}deg`;
      const endRotate = `${(randomFromIndex(index, 4) * 56 - 28).toFixed(2)}deg`;

      cards.push({
        delay: Math.round(easedLandingProgress * 1820) + row * 14,
        duration:
          980 -
          Math.round(easedLandingProgress * 180) +
          Math.round(randomFromIndex(index, 5) * 120),
        targetX: `${Math.round(startLeft + col * colStep + horizontalOffset)}px`,
        targetY: `${Math.round(startTop + row * rowStep + verticalOffset)}px`,
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        startRotate,
        endRotate,
        scale: (0.96 + randomFromIndex(index, 6) * 0.08).toFixed(2),
        zIndex: landingOrder + 1,
      });
    }
  }

  return cards;
};

const HomeIntro = ({ onFinish }: HomeIntroProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [viewport, setViewport] = useState<Viewport>(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cards = useMemo(() => buildCards(viewport), [viewport]);

  const totalDuration = useMemo(
    () => cards.reduce((max, card) => Math.max(max, card.delay + card.duration), 0),
    [cards],
  );

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, totalDuration);

    const finishTimer = window.setTimeout(() => {
      onFinish();
    }, totalDuration + EXIT_DURATION_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinish, totalDuration]);

  return (
    <div
      className={`home-intro ${isExiting ? "home-intro--exit" : ""}`}
      aria-hidden="true"
    >
      <div className="home-intro__glow home-intro__glow--left" />
      <div className="home-intro__glow home-intro__glow--right" />

      {cards.map((card, index) => {
        const style = {
          "--card-delay": `${card.delay}ms`,
          "--card-duration": `${card.duration}ms`,
          "--card-width": card.width,
          "--card-height": card.height,
          "--card-target-x": card.targetX,
          "--card-target-y": card.targetY,
          "--card-start-rotate": card.startRotate,
          "--card-end-rotate": card.endRotate,
          "--card-scale": card.scale,
          zIndex: card.zIndex,
        } as CSSProperties;

        return (
          <img
            key={index}
            src="/imgs/card.jpg"
            alt=""
            className="home-intro__card"
            style={style}
          />
        );
      })}
    </div>
  );
};

export default HomeIntro;
