import { useEffect, useCallback } from 'react';
import { Direction } from '../types/game';

interface SwipeGesturesProps {
  onSwipe: (direction: Direction) => void;
  isEnabled: boolean;
}

export const useSwipeGestures = ({ onSwipe, isEnabled }: SwipeGesturesProps) => {
  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (!isEnabled) return;
    
    const touch = event.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    const startTime = Date.now();

    const handleTouchMove = (moveEvent: TouchEvent) => {
      // Prevent scrolling while swiping on the game
      const target = moveEvent.target as Element;
      if (target.closest('.game-board') || target.closest('[data-game-area]')) {
        moveEvent.preventDefault();
      }
    };

    const handleTouchEnd = (endEvent: TouchEvent) => {
      const endTouch = endEvent.changedTouches[0];
      const endX = endTouch.clientX;
      const endY = endTouch.clientY;
      const endTime = Date.now();

      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const deltaTime = endTime - startTime;
      
      // Minimum distance and maximum time for a valid swipe
      const minDistance = 30;
      const maxTime = 1000;
      
      // Check if it's a valid swipe (not too slow, not too short)
      if (deltaTime > maxTime) return;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance < minDistance) return;

      // Determine direction based on the larger delta
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        onSwipe(deltaX > 0 ? 'right' : 'left');
      } else {
        // Vertical swipe
        onSwipe(deltaY > 0 ? 'down' : 'up');
      }

      document.removeEventListener('touchmove', handleTouchMove, { passive: false });
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  }, [onSwipe, isEnabled]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, [handleTouchStart]);
};