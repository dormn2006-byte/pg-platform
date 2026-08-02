import React, { useState, useRef, useCallback, useEffect } from 'react';

const MacOSDock = ({ 
  apps, 
  onAppClick, 
  openApps = [],
  className = ''
}) => {
  const [mouseX, setMouseX] = useState(null);
  const [hoveredApp, setHoveredApp] = useState(null);
  const [currentScales, setCurrentScales] = useState(apps.map(() => 1));
  const [currentPositions, setCurrentPositions] = useState([]);
  
  // Refs to store scales and positions to optimize animation frames and prevent lag
  const scalesRef = useRef(apps.map(() => 1));
  const positionsRef = useRef([]);

  const dockRef = useRef(null);
  const iconRefs = useRef([]);
  const touchedAppIndexRef = useRef(null); // Cache the touched index to prevent layout shift misalignments
  const animationFrameRef = useRef(undefined);
  const lastMouseMoveTime = useRef(0);

  const activeApp = apps.find(app => openApps.includes(app.id));
  const activeAppId = activeApp ? activeApp.id : null;
  const expandedAppId = hoveredApp ? hoveredApp.id : activeAppId;

  // Helper to return a constant label width for uniform sizing across all boxes
  const getLabelWidth = () => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      if (w < 400) return 80;
      if (w < 480) return 90;
      if (w < 1024) return 100;
    }
    return 150;
  };

  // Responsive size calculations based on viewport
  const getResponsiveConfig = useCallback(() => {
    if (typeof window === 'undefined') {
      return { baseIconSize: 72, maxScale: 1.5, effectWidth: 300, baseSpacing: 16, isBottom: false };
    }

    const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
    const isMobile = window.innerWidth < 1024;
    
    if (smallerDimension < 400) {
      return {
        baseIconSize: 28,
        maxScale: 1.2,
        effectWidth: smallerDimension * 0.4,
        baseSpacing: 4,
        isBottom: isMobile
      };
    } else if (smallerDimension < 480) {
      return {
        baseIconSize: 32,
        maxScale: 1.3,
        effectWidth: smallerDimension * 0.4,
        baseSpacing: 5,
        isBottom: isMobile
      };
    } else if (smallerDimension < 768) {
      return {
        baseIconSize: 40,
        maxScale: 1.35,
        effectWidth: smallerDimension * 0.35,
        baseSpacing: 6,
        isBottom: isMobile
      };
    } else {
      // Desktop / Laptop
      return {
        baseIconSize: 56,
        maxScale: 1.3,
        effectWidth: 320,
        baseSpacing: 12,
        isBottom: isMobile
      };
    }
  }, []);

  const [config, setConfig] = useState(getResponsiveConfig);
  const { baseIconSize, maxScale, effectWidth, baseSpacing, isBottom } = config;
  const minScale = 1.0;

  useEffect(() => {
    const handleResize = () => setConfig(getResponsiveConfig());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveConfig]);

  // Authentic macOS cosine-based magnification algorithm
  const calculateTargetMagnification = useCallback((mousePosition) => {
    if (mousePosition === null) return apps.map(() => minScale);

    return apps.map((_, index) => {
      const normalIconCenter = (index * (baseIconSize + baseSpacing)) + (baseIconSize / 2);
      const minX = mousePosition - (effectWidth / 2);
      const maxX = mousePosition + (effectWidth / 2);
      
      if (normalIconCenter < minX || normalIconCenter > maxX) return minScale;
      
      const theta = ((normalIconCenter - minX) / effectWidth) * 2 * Math.PI;
      const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI);
      const scaleFactor = (1 - Math.cos(cappedTheta)) / 2;
      
      return minScale + (scaleFactor * (maxScale - minScale));
    });
  }, [apps, baseIconSize, baseSpacing, effectWidth, maxScale, minScale]);

  // Calculate positions based on current scales and account for the expanded label width
  const calculatePositions = useCallback((scales, expandedId) => {
    let currentX = 0;
    return scales.map((scale, index) => {
      const app = apps[index];
      const isExpanded = app.id === expandedId;
      const labelW = isExpanded ? getLabelWidth() : 0;
      
      const scaledWidth = baseIconSize * scale;
      const centerX = currentX + (scaledWidth / 2);
      currentX += scaledWidth + labelW + baseSpacing;
      return centerX;
    });
  }, [apps, baseIconSize, baseSpacing]);

  useEffect(() => {
    const initialScales = apps.map(() => minScale);
    const initialPositions = calculatePositions(initialScales, expandedAppId);
    scalesRef.current = initialScales;
    positionsRef.current = initialPositions;
    setCurrentScales(initialScales);
    setCurrentPositions(initialPositions);
  }, [apps, calculatePositions, minScale, config, expandedAppId]);

  const animateToTarget = useCallback(() => {
    const targetScales = calculateTargetMagnification(mouseX);
    const targetPositions = calculatePositions(targetScales, expandedAppId);
    const lerpFactor = mouseX !== null ? 0.22 : 0.14; // Snappy physics interpolation

    let changed = false;
    const nextScales = scalesRef.current.map((curr, i) => {
      const diff = targetScales[i] - curr;
      if (Math.abs(diff) > 0.001) changed = true;
      return curr + diff * lerpFactor;
    });

    const nextPositions = positionsRef.current.map((curr, i) => {
      const diff = targetPositions[i] - curr;
      if (Math.abs(diff) > 0.05) changed = true;
      return curr + diff * lerpFactor;
    });

    scalesRef.current = nextScales;
    positionsRef.current = nextPositions;

    if (changed) {
      setCurrentScales(nextScales);
      setCurrentPositions(nextPositions);
    }
    
    if (changed || mouseX !== null) {
      animationFrameRef.current = requestAnimationFrame(animateToTarget);
    }
  }, [mouseX, calculateTargetMagnification, calculatePositions, expandedAppId]);

  useEffect(() => {
    if (mouseX !== null) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(animateToTarget);
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animateToTarget, mouseX]);

  const dockRectRef = useRef(null);

  const updateDockRect = useCallback(() => {
    if (dockRef.current) {
      dockRectRef.current = dockRef.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    updateDockRect();
  }, [updateDockRect]);

  const handleMouseMove = useCallback((e) => {
    const now = performance.now();
    if (now - lastMouseMoveTime.current < 16) return;
    lastMouseMoveTime.current = now;
    
    if (!dockRectRef.current && dockRef.current) {
      updateDockRect();
    }
    if (dockRectRef.current) {
      const padding = Math.max(8, baseIconSize * 0.12);
      setMouseX(e.clientX - dockRectRef.current.left - padding);
    }
  }, [baseIconSize, updateDockRect]);

  const handleMouseLeave = useCallback(() => {
    dockRectRef.current = null;
    setMouseX(null);
    setHoveredApp(null);
  }, []);

  // Multi-device Touch Drag gesture logic
  const handleTouchStart = useCallback((e) => {
    if (e.cancelable) e.preventDefault(); // Prevent text selection/scrolling behavior
    updateDockRect();
    if (dockRectRef.current) {
      const padding = Math.max(8, baseIconSize * 0.12);
      const touchX = e.touches[0].clientX - dockRectRef.current.left - padding;
      setMouseX(touchX);
      
      let closestIndex = 0;
      let minDistance = Infinity;
      currentPositions.forEach((pos, index) => {
        const dist = Math.abs(pos - touchX);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = index;
        }
      });
      touchedAppIndexRef.current = closestIndex;
      setHoveredApp(apps[closestIndex]);
    }
  }, [baseIconSize, currentPositions, apps, updateDockRect]);

  const handleTouchMove = useCallback((e) => {
    if (e.cancelable) e.preventDefault(); // Prevent scrolling page while dragging icons
    if (!dockRectRef.current && dockRef.current) {
      updateDockRect();
    }
    if (dockRectRef.current) {
      const padding = Math.max(8, baseIconSize * 0.12);
      const touchX = e.touches[0].clientX - dockRectRef.current.left - padding;
      setMouseX(touchX);

      let closestIndex = 0;
      let minDistance = Infinity;
      currentPositions.forEach((pos, index) => {
        const dist = Math.abs(pos - touchX);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = index;
        }
      });
      touchedAppIndexRef.current = closestIndex;
      setHoveredApp(apps[closestIndex]);
    }
  }, [baseIconSize, currentPositions, apps]);

  const handleTouchEnd = useCallback((e) => {
    if (e.cancelable) e.preventDefault(); // Prevent ghost click / click penetration issues
    
    if (touchedAppIndexRef.current !== null) {
      const targetIndex = touchedAppIndexRef.current;
      handleAppClick(apps[targetIndex].id, targetIndex);
    }
    
    setMouseX(null);
    setHoveredApp(null);
    touchedAppIndexRef.current = null;
  }, [apps]);

  const createBounceAnimation = (element) => {
    const bounceHeight = isBottom 
      ? Math.min(-8, -baseIconSize * 0.15) // Bounce UPWARDS when mounted at bottom (mobile)
      : Math.max(8, baseIconSize * 0.15);  // Bounce DOWNWARDS when mounted at top (desktop)
    element.style.transition = 'transform 0.2s ease-out';
    element.style.transform = `translateY(${bounceHeight}px)`;
    
    setTimeout(() => {
      element.style.transform = 'translateY(0px)';
    }, 200);
  };

  const handleAppClick = (appId, index) => {
    if (iconRefs.current[index]) {
      createBounceAnimation(iconRefs.current[index]);
    }
    onAppClick(appId);
  };

  const contentWidth = currentPositions.length > 0 
    ? Math.max(...currentPositions.map((pos, index) => {
        const app = apps[index];
        const isExpanded = app.id === expandedAppId;
        const labelW = isExpanded ? getLabelWidth() : 0;
        return pos + (baseIconSize * currentScales[index]) / 2 + labelW;
      }))
    : (apps.length * (baseIconSize + baseSpacing)) - baseSpacing;

  const padding = Math.max(8, baseIconSize * 0.12);

  return (
    <div 
      ref={dockRef}
      className={`backdrop-blur-xl flex items-center ${className}`}
      style={{
        background: isBottom 
          ? 'rgba(255, 255, 255, 0.85)' 
          : 'rgba(255, 255, 255, 0.7)', 
        borderRadius: `${Math.max(16, baseIconSize * 0.5)}px`,
        border: isBottom 
          ? '1px solid rgba(255, 255, 255, 0.4)' 
          : '1px solid rgba(255, 255, 255, 0.5)', 
        boxShadow: isBottom
          ? `
            0 ${Math.max(4, baseIconSize * 0.1)}px ${Math.max(16, baseIconSize * 0.4)}px rgba(0, 0, 0, 0.08),
            0 ${Math.max(2, baseIconSize * 0.05)}px ${Math.max(8, baseIconSize * 0.2)}px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.8)
          `
          : `
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.9)
          `,
        padding: `${padding}px`,
        margin: '0 auto',
        width: 'fit-content'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="relative transition-[width] duration-200"
        style={{
          height: `${baseIconSize}px`,
          width: `${contentWidth}px`
        }}
      >
        {apps.map((app, index) => {
          const scale = currentScales[index];
          const position = currentPositions[index] || 0;
          const scaledSize = baseIconSize * scale;
          const isExpanded = app.id === expandedAppId;
          const labelW = isExpanded ? getLabelWidth() : 0;
          
          return (
            <div
              key={app.id}
              ref={(el) => { iconRefs.current[index] = el; }}
              className="absolute cursor-pointer flex items-center group"
              onClick={() => handleAppClick(app.id, index)}
              onMouseEnter={() => setHoveredApp(app)}
              style={{
                left: `${position - scaledSize / 2}px`,
                bottom: isBottom ? '0px' : 'auto', // Bottom aligned on mobile
                top: isBottom ? 'auto' : '0px',     // Top aligned on desktop
                width: `${scaledSize + labelW}px`,
                height: `${scaledSize}px`,
                transformOrigin: isBottom ? 'bottom center' : 'top center', // Scale upwards on mobile, downwards on desktop
                zIndex: Math.round(scale * 10)
              }}
            >
              {/* Icon Container */}
              <div 
                style={{ width: `${scaledSize}px`, height: `${scaledSize}px` }}
                className="flex-shrink-0"
              >
                {typeof app.icon === 'string' ? (
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 text-[#0D3A1D] transition-colors group-hover:bg-[#93B733] group-hover:text-white group-hover:border-[#93B733] [&>svg]:w-3/5 [&>svg]:h-3/5 [&>svg]:transition-colors"
                    style={{
                      filter: `drop-shadow(0 ${scale > 1.2 ? 4 : 2}px ${scale > 1.2 ? 8 : 4}px rgba(0,0,0,0.1))`
                    }}
                  >
                    {app.icon}
                  </div>
                )}
              </div>

              {/* Fast Inline Sliding Page Name Label Box */}
              <div
                className="ml-2 bg-white text-[#4E700F] text-sm sm:text-base font-black rounded-xl shadow-md border border-gray-200/80 flex items-center justify-center h-[40px] lg:h-[56px]"
                style={{
                  width: isExpanded ? labelW - 12 : 0,
                  opacity: isExpanded ? 1 : 0,
                  transition: 'width 150ms ease-out, opacity 150ms ease-out',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
              >
                {app.name}
              </div>
              
              {/* Active App Indicator Dot */}
              {openApps.includes(app.id) && (
                <div 
                  className="absolute"
                  style={{
                    bottom: isBottom ? 'auto' : `${Math.max(-8, -baseIconSize * 0.15)}px`, // Bottom dot for top dock
                    top: isBottom ? `${Math.max(-8, -baseIconSize * 0.15)}px` : 'auto',     // Top dot for bottom dock
                    left: `${scaledSize / 2}px`,
                    transform: 'translateX(-50%)',
                    width: `${Math.max(4, baseIconSize * 0.08)}px`,
                    height: `${Math.max(4, baseIconSize * 0.08)}px`,
                    borderRadius: '50%',
                    backgroundColor: '#93B733',
                    boxShadow: '0 0 6px rgba(147, 183, 51, 0.4)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MacOSDock;
