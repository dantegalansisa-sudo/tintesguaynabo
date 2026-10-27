import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  magnetRadius?: number;
  magnetStrength?: number;
  target?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  magnetRadius = 90,
  magnetStrength = 0.35,
  target,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(dx, dy) < magnetRadius + rect.width / 2) setPos({ x: dx * magnetStrength, y: dy * magnetStrength });
  };

  const Component = href ? 'a' : 'button';

  return (
    <div ref={ref} className="magnetic" onMouseMove={handleMouseMove} onMouseLeave={() => setPos({ x: 0, y: 0 })}>
      <motion.div animate={{ x: pos.x, y: pos.y }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
        <Component
          href={href}
          onClick={onClick}
          className={className}
          target={target}
          rel={target ? 'noopener noreferrer' : undefined}
        >
          {children}
        </Component>
      </motion.div>
    </div>
  );
}
