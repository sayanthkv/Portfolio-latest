import { useEffect } from "react";
import Matter from "matter-js";

interface PhysicsItem {
  el: HTMLElement;
  body: Matter.Body;
  width: number;
  height: number;
  scale: number;
  vortexAngle: number;
  vortexRadius: number;
  vortexSpin: number;
}

interface DrawnFloatingShape {
  body: Matter.Body;
  localPoints: { x: number; y: number }[];
  color: string;
}

type Stage = "floating" | "vortex" | "drawing";
type DrawTool = "pencil" | "hand";

export function usePhysicsPlayground(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const { Engine, Runner, Bodies, Composite, Events, Body, Query } = Matter;

    // 1. Lock scroll on BOTH <html> and <body> so zero scrollbar appears on the right
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevUserSelect = document.body.style.userSelect;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";

    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const center = { x: vw / 2, y: vh / 2 };

    // 2. Zero-gravity Matter.js world
    const engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0 },
    });

    // 3. Elastic viewport walls
    const wallThickness = 140;
    const topMargin = 84;
    const walls = [
      Bodies.rectangle(vw / 2, vh + wallThickness / 2, vw * 2, wallThickness, {
        isStatic: true,
        restitution: 0.9,
        friction: 0,
      }),
      Bodies.rectangle(vw / 2, topMargin - wallThickness / 2, vw * 2, wallThickness, {
        isStatic: true,
        restitution: 0.9,
        friction: 0,
      }),
      Bodies.rectangle(-wallThickness / 2, vh / 2, wallThickness, vh * 2, {
        isStatic: true,
        restitution: 0.9,
        friction: 0,
      }),
      Bodies.rectangle(vw + wallThickness / 2, vh / 2, wallThickness, vh * 2, {
        isStatic: true,
        restitution: 0.9,
        friction: 0,
      }),
    ];
    Composite.add(engine.world, walls);

    // 4. Measure Hero (#top) words & buttons, clone cleanly, and hide original Hero foreground
    const heroRoot = document.querySelector("#top") as HTMLElement | null;
    const heroForeground = heroRoot?.querySelector(".z-20") as HTMLElement | null;
    const prevForegroundOpacity = heroForeground?.style.opacity ?? "";
    const prevForegroundVisibility = heroForeground?.style.visibility ?? "";

    const items: PhysicsItem[] = [];
    const clonedElements: HTMLElement[] = [];

    if (heroRoot) {
      const pillButtons = Array.from(heroRoot.querySelectorAll("a, button")) as HTMLElement[];

      const walker = document.createTreeWalker(heroRoot, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.textContent || !node.textContent.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.closest("a, button, [data-physics-ignore]")) {
            return NodeFilter.FILTER_REJECT;
          }
          const style = window.getComputedStyle(parent);
          if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      const textNodes: Text[] = [];
      let current = walker.nextNode();
      while (current) {
        textNodes.push(current as Text);
        current = walker.nextNode();
      }

      interface MeasuredToken {
        text: string;
        rect: DOMRect;
        computed: CSSStyleDeclaration;
        isButton: boolean;
        buttonEl?: HTMLElement;
      }

      const measuredTokens: MeasuredToken[] = [];

      pillButtons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        if (rect.width > 4 && rect.height > 4) {
          measuredTokens.push({
            text: btn.textContent?.trim() || "",
            rect,
            computed: window.getComputedStyle(btn),
            isButton: true,
            buttonEl: btn,
          });
        }
      });

      const range = document.createRange();
      textNodes.forEach((textNode) => {
        const parent = textNode.parentElement;
        if (!parent) return;
        const computed = window.getComputedStyle(parent);
        const raw = textNode.textContent || "";
        const wordRegex = /\S+/g;
        let match: RegExpExecArray | null;

        while ((match = wordRegex.exec(raw)) !== null) {
          range.setStart(textNode, match.index);
          range.setEnd(textNode, match.index + match[0].length);
          const rect = range.getBoundingClientRect();
          if (rect.width > 1 && rect.height > 1) {
            measuredTokens.push({
              text: match[0],
              rect,
              computed,
              isButton: false,
            });
          }
        }
      });

      if (heroForeground) {
        heroForeground.style.opacity = "0";
        heroForeground.style.visibility = "hidden";
      }

      measuredTokens.forEach(({ text, rect, computed, isButton, buttonEl }) => {
        let clone: HTMLElement;

        if (isButton && buttonEl) {
          clone = buttonEl.cloneNode(true) as HTMLElement;
          clone.removeAttribute("href");
        } else {
          clone = document.createElement("span");
          clone.textContent = text;
        }

        clone.style.position = "fixed";
        clone.style.left = "0px";
        clone.style.top = "0px";
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.margin = "0";
        clone.style.zIndex = "45";
        clone.style.pointerEvents = "none";
        clone.style.willChange = "transform, opacity";
        clone.style.fontFamily = computed.fontFamily;
        clone.style.fontSize = computed.fontSize;
        clone.style.fontWeight = computed.fontWeight;
        clone.style.fontStyle = computed.fontStyle;
        clone.style.letterSpacing = computed.letterSpacing;
        clone.style.lineHeight = computed.lineHeight;
        clone.style.textTransform = computed.textTransform;
        clone.style.color = computed.color;
        clone.style.whiteSpace = "nowrap";
        clone.style.transformOrigin = "center center";

        if (isButton) {
          clone.style.backgroundColor = computed.backgroundColor;
          clone.style.borderRadius = computed.borderRadius;
          clone.style.border = computed.border;
          clone.style.padding = computed.padding;
          clone.style.display = "inline-flex";
          clone.style.alignItems = "center";
          clone.style.justifyContent = "center";
          clone.style.gap = computed.gap;
        } else {
          clone.style.display = "inline-flex";
          clone.style.alignItems = "center";
          clone.style.justifyContent = "center";
        }

        document.body.appendChild(clone);
        clonedElements.push(clone);

        const centerX = rect.left + rect.width / 2;
        const centerY = Math.max(topMargin + rect.height / 2 + 4, rect.top + rect.height / 2);

        const hitW = Math.max(46, rect.width + 14);
        const hitH = Math.max(38, rect.height + 14);

        const body = Bodies.rectangle(centerX, centerY, hitW, hitH, {
          restitution: 0.88,
          friction: 0.02,
          frictionAir: 0.003,
          chamfer: { radius: 8 },
        });

        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.018);
        Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 2.2,
          y: (Math.random() - 0.5) * 2.2,
        });

        Composite.add(engine.world, body);

        items.push({
          el: clone,
          body,
          width: rect.width,
          height: rect.height,
          scale: 1,
          vortexAngle: 0,
          vortexRadius: 0,
          vortexSpin: 0,
        });
      });
    }

    // 5. Full-screen interactive drag & draw layer
    const interactionLayer = document.createElement("div");
    interactionLayer.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 48;
      touch-action: none;
      cursor: grab;
    `;
    document.body.appendChild(interactionLayer);

    // 6. Sketch Canvas
    const sketchCanvas = document.createElement("canvas");
    sketchCanvas.width = vw * window.devicePixelRatio;
    sketchCanvas.height = vh * window.devicePixelRatio;
    sketchCanvas.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 47;
      pointer-events: none;
    `;
    document.body.appendChild(sketchCanvas);
    const ctx = sketchCanvas.getContext("2d")!;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // 7. Countdown Timer Pill (appears after 10s inactivity, counts 10 -> 0)
    const countdownBadge = document.createElement("div");
    countdownBadge.style.cssText = `
      position: fixed;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 49;
      pointer-events: none;
      padding: 7px 16px;
      border-radius: 9999px;
      border: 1px solid rgba(255,255,255,0.18);
      background: rgba(5,5,5,0.78);
      backdrop-filter: blur(10px);
      color: rgba(255,255,255,0.9);
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      opacity: 0;
      transition: opacity 0.25s ease;
      white-space: nowrap;
    `;
    document.body.appendChild(countdownBadge);

    // 8. Drawing Toolbar (Pencil, Hand, Clear)
    const toolbar = document.createElement("div");
    toolbar.style.cssText = `
      position: fixed;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 49;
      display: none;
      align-items: center;
      gap: 6px;
      padding: 6px;
      border-radius: 9999px;
      border: 1px solid rgba(255,255,255,0.18);
      background: rgba(5,5,5,0.82);
      backdrop-filter: blur(12px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.65);
    `;

    const makeToolBtn = (label: string, svgPath: string) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", label);
      btn.title = label;
      btn.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 34px;
        padding: 0 13px;
        border-radius: 9999px;
        border: 1px solid transparent;
        background: transparent;
        color: rgba(255,255,255,0.78);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s ease;
      `;
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${svgPath}
        </svg>
        <span>${label}</span>
      `;
      return btn;
    };

    const pencilBtn = makeToolBtn(
      "Pencil",
      `<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>`
    );
    const handBtn = makeToolBtn(
      "Hand",
      `<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`
    );
    const clearBtn = makeToolBtn(
      "Clear",
      `<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>`
    );

    toolbar.appendChild(pencilBtn);
    toolbar.appendChild(handBtn);
    toolbar.appendChild(clearBtn);
    document.body.appendChild(toolbar);

    // 9. Direct Pointer Dragging State (works on EVERY word, button & drawn shape)
    let stage: Stage = "floating";
    let activeTool: DrawTool = "pencil";
    let lastActivityTime = performance.now();

    let draggedBody: Matter.Body | null = null;
    let dragPointerId: number | null = null;
    let dragOffset = { x: 0, y: 0 };
    let pointerPos = { x: 0, y: 0 };
    let prevPointerPos = { x: 0, y: 0 };

    // Drawing state
    let isDrawingStroke = false;
    let drawPointerId: number | null = null;
    let currentStrokePoints: { x: number; y: number }[] = [];
    const floatingDrawings: DrawnFloatingShape[] = [];

    const setActiveTool = (tool: DrawTool) => {
      activeTool = tool;
      draggedBody = null;
      dragPointerId = null;
      if (tool === "pencil") {
        pencilBtn.style.background = "#ffffff";
        pencilBtn.style.color = "#050505";
        handBtn.style.background = "transparent";
        handBtn.style.color = "rgba(255,255,255,0.78)";
        interactionLayer.style.cursor = "crosshair";
      } else {
        handBtn.style.background = "#ffffff";
        handBtn.style.color = "#050505";
        pencilBtn.style.background = "transparent";
        pencilBtn.style.color = "rgba(255,255,255,0.78)";
        interactionLayer.style.cursor = "grab";
      }
    };

    pencilBtn.addEventListener("click", () => setActiveTool("pencil"));
    handBtn.addEventListener("click", () => setActiveTool("hand"));
    clearBtn.addEventListener("click", () => {
      for (let i = 0; i < floatingDrawings.length; i++) {
        const shape = floatingDrawings[i];
        if (shape) Composite.remove(engine.world, shape.body);
      }
      floatingDrawings.length = 0;
      currentStrokePoints = [];
      isDrawingStroke = false;
      drawPointerId = null;
      draggedBody = null;
      dragPointerId = null;
    });

    const startVortexFlush = () => {
      if (stage !== "floating") return;
      stage = "vortex";
      draggedBody = null;
      dragPointerId = null;
      countdownBadge.style.opacity = "0";
      interactionLayer.style.cursor = "crosshair";

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item) continue;
        const dx = item.body.position.x - center.x;
        const dy = item.body.position.y - center.y;
        item.vortexRadius = Math.max(10, Math.hypot(dx, dy));
        item.vortexAngle = Math.atan2(dy, dx);
        item.vortexSpin = item.body.angle;
        item.body.collisionFilter.mask = 0;
        Body.setStatic(item.body, true);
      }
    };

    const registerActivity = () => {
      if (stage === "floating") {
        lastActivityTime = performance.now();
        countdownBadge.style.opacity = "0";
      }
    };

    // Hit-test helper: finds exact body under pointer, or closest body within 24px
    const pickBodyAtPoint = (x: number, y: number, candidateBodies: Matter.Body[]): Matter.Body | null => {
      const point = { x, y };
      const exactHits = Query.point(candidateBodies, point);
      if (exactHits.length > 0) {
        const hit = exactHits[0]!;
        return hit.parent || hit;
      }

      // Fallback proximity check (24px forgiveness radius)
      let closest: Matter.Body | null = null;
      let minDist = 24;
      for (let i = 0; i < candidateBodies.length; i++) {
        const b = candidateBodies[i];
        if (!b || b.isStatic) continue;
        const dist = Math.hypot(b.position.x - x, b.position.y - y);
        if (dist < minDist) {
          minDist = dist;
          closest = b;
        }
      }
      return closest;
    };

    const finalizeStrokeIntoFloatingBody = (rawPoints: { x: number; y: number }[]) => {
      if (rawPoints.length < 2) return;

      const parts: Matter.Body[] = [];
      const strokeThickness = 14;

      for (let i = 0; i < rawPoints.length - 1; i++) {
        const p1 = rawPoints[i]!;
        const p2 = rawPoints[i + 1]!;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.hypot(dx, dy);
        if (len < 1) continue;

        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        const angle = Math.atan2(dy, dx);

        const seg = Bodies.rectangle(midX, midY, len + strokeThickness * 0.5, strokeThickness, {
          angle,
          chamfer: { radius: strokeThickness / 2 },
        });
        parts.push(seg);
      }

      if (parts.length === 0) return;

      const compoundBody = Body.create({
        parts,
        restitution: 0.88,
        friction: 0.04,
        frictionAir: 0.004,
      });

      const com = compoundBody.position;
      const alignedLocalPoints = rawPoints.map((p) => ({
        x: p.x - com.x,
        y: p.y - com.y,
      }));

      Body.setVelocity(compoundBody, {
        x: (Math.random() - 0.5) * 1.8,
        y: -0.6 - Math.random() * 0.8,
      });
      Body.setAngularVelocity(compoundBody, (Math.random() - 0.5) * 0.025);

      Composite.add(engine.world, compoundBody);
      floatingDrawings.push({
        body: compoundBody,
        localPoints: alignedLocalPoints,
        color: "#ffffff",
      });
    };

    // 10. Unified Pointer Handlers for Dragging (Stage 1 + Hand Tool) & Drawing (Pencil Tool)
    const onPointerDown = (e: PointerEvent) => {
      registerActivity();

      // Stage 1: Floating words & buttons -> grab any body directly
      if (stage === "floating") {
        if (draggedBody) return;
        const bodies = items.map((item) => item.body);
        const hit = pickBodyAtPoint(e.clientX, e.clientY, bodies);
        if (hit) {
          draggedBody = hit;
          dragPointerId = e.pointerId;
          dragOffset = {
            x: hit.position.x - e.clientX,
            y: hit.position.y - e.clientY,
          };
          pointerPos = { x: e.clientX, y: e.clientY };
          prevPointerPos = { x: e.clientX, y: e.clientY };
          interactionLayer.setPointerCapture(e.pointerId);
          interactionLayer.style.cursor = "grabbing";
        }
        return;
      }

      // Stage 3: Drawing mode with Hand tool -> grab any floating sketch
      if (stage === "drawing" && activeTool === "hand") {
        if (draggedBody) return;
        const bodies = floatingDrawings.map((d) => d.body);
        const hit = pickBodyAtPoint(e.clientX, e.clientY, bodies);
        if (hit) {
          draggedBody = hit;
          dragPointerId = e.pointerId;
          dragOffset = {
            x: hit.position.x - e.clientX,
            y: hit.position.y - e.clientY,
          };
          pointerPos = { x: e.clientX, y: e.clientY };
          prevPointerPos = { x: e.clientX, y: e.clientY };
          interactionLayer.setPointerCapture(e.pointerId);
          interactionLayer.style.cursor = "grabbing";
        }
        return;
      }

      // Stage 3: Drawing mode with Pencil tool -> 1 continuous stroke
      if (stage === "drawing" && activeTool === "pencil") {
        if (isDrawingStroke) return;
        isDrawingStroke = true;
        drawPointerId = e.pointerId;
        interactionLayer.setPointerCapture(e.pointerId);
        currentStrokePoints = [{ x: e.clientX, y: e.clientY }];
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      registerActivity();

      if (draggedBody && e.pointerId === dragPointerId) {
        prevPointerPos = { ...pointerPos };
        pointerPos = { x: e.clientX, y: e.clientY };
        return;
      }

      if (
        stage === "drawing" &&
        activeTool === "pencil" &&
        isDrawingStroke &&
        e.pointerId === drawPointerId
      ) {
        const last = currentStrokePoints[currentStrokePoints.length - 1];
        const dist = last ? Math.hypot(e.clientX - last.x, e.clientY - last.y) : 999;
        if (dist >= 6) {
          currentStrokePoints.push({ x: e.clientX, y: e.clientY });
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      registerActivity();

      if (draggedBody && e.pointerId === dragPointerId) {
        // Impart release throw velocity so flung elements glide across the tunnel
        const throwVx = Math.max(-18, Math.min(18, (pointerPos.x - prevPointerPos.x) * 0.65));
        const throwVy = Math.max(-18, Math.min(18, (pointerPos.y - prevPointerPos.y) * 0.65));
        Body.setVelocity(draggedBody, { x: throwVx, y: throwVy });

        draggedBody = null;
        dragPointerId = null;
        if (interactionLayer.hasPointerCapture(e.pointerId)) {
          interactionLayer.releasePointerCapture(e.pointerId);
        }
        interactionLayer.style.cursor = "grab";
        return;
      }

      if (isDrawingStroke && e.pointerId === drawPointerId) {
        isDrawingStroke = false;
        drawPointerId = null;
        if (interactionLayer.hasPointerCapture(e.pointerId)) {
          interactionLayer.releasePointerCapture(e.pointerId);
        }
        finalizeStrokeIntoFloatingBody(currentStrokePoints);
        currentStrokePoints = [];
      }
    };

    interactionLayer.addEventListener("pointerdown", onPointerDown);
    interactionLayer.addEventListener("pointermove", onPointerMove);
    interactionLayer.addEventListener("pointerup", onPointerUp);
    interactionLayer.addEventListener("pointercancel", onPointerUp);

    // 11. Physics update loop
    const maxStartRadius = Math.hypot(vw / 2, vh / 2);

    Events.on(engine, "beforeUpdate", () => {
      // If user is actively dragging a body, smoothly lock/pull it to the cursor
      if (draggedBody) {
        const targetX = Math.max(24, Math.min(vw - 24, pointerPos.x + dragOffset.x));
        const targetY = Math.max(topMargin + 16, Math.min(vh - 24, pointerPos.y + dragOffset.y));
        const vx = (targetX - draggedBody.position.x) * 0.35;
        const vy = (targetY - draggedBody.position.y) * 0.35;
        Body.setVelocity(draggedBody, { x: vx, y: vy });
        Body.setAngularVelocity(draggedBody, draggedBody.angularVelocity * 0.85);
      }

      if (stage === "floating") {
        const idleSeconds = (performance.now() - lastActivityTime) / 1000;

        if (idleSeconds >= 20) {
          startVortexFlush();
          return;
        } else if (idleSeconds >= 10) {
          const remaining = Math.max(0, Math.ceil(20 - idleSeconds));
          countdownBadge.textContent = `Vortex in ${remaining}s`;
          countdownBadge.style.opacity = "1";
        } else {
          countdownBadge.style.opacity = "0";
        }

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (!item || item.body === draggedBody) continue;
          if (item.body.speed < 0.25) {
            Body.applyForce(item.body, item.body.position, {
              x: (Math.random() - 0.5) * 0.00008,
              y: (Math.random() - 0.5) * 0.00008,
            });
          }
        }
      } else if (stage === "vortex") {
        let remainingVisible = 0;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (!item || item.scale <= 0.01) continue;

          const pullRate = Math.max(2.4, item.vortexRadius * 0.034);
          item.vortexRadius = Math.max(0, item.vortexRadius - pullRate);
          item.vortexAngle += 0.08 + (1 - Math.min(1, item.vortexRadius / maxStartRadius)) * 0.15;
          item.vortexSpin += 0.15;

          const nextX = center.x + Math.cos(item.vortexAngle) * item.vortexRadius;
          const nextY = center.y + Math.sin(item.vortexAngle) * item.vortexRadius;
          Body.setPosition(item.body, { x: nextX, y: nextY });
          Body.setAngle(item.body, item.vortexSpin);

          item.scale = Math.min(1, Math.pow(item.vortexRadius / (maxStartRadius * 0.55), 0.85));
          item.el.style.opacity = `${Math.min(1, item.scale * 1.4)}`;

          if (item.vortexRadius <= 4 || item.scale <= 0.02) {
            item.scale = 0;
            item.el.style.opacity = "0";
            Composite.remove(engine.world, item.body);
          } else {
            remainingVisible++;
          }
        }

        if (remainingVisible === 0) {
          stage = "drawing";
          toolbar.style.display = "flex";
          setActiveTool("pencil");
        }
      } else if (stage === "drawing") {
        for (let i = 0; i < floatingDrawings.length; i++) {
          const shape = floatingDrawings[i];
          if (!shape || shape.body === draggedBody) continue;
          if (shape.body.speed < 0.25) {
            Body.applyForce(shape.body, shape.body.position, {
              x: (Math.random() - 0.5) * 0.00008,
              y: (Math.random() - 0.5) * 0.00008,
            });
          }
        }
      }
    });

    // 12. Render loop
    const runner = Runner.create();
    let rafId = 0;

    const renderLoop = () => {
      if (stage === "floating" || stage === "vortex") {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (!item || item.scale <= 0) continue;
          const x = item.body.position.x - item.width / 2;
          const y = item.body.position.y - item.height / 2;
          item.el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${item.body.angle}rad) scale(${item.scale})`;
        }
      }

      ctx.clearRect(0, 0, vw, vh);

      if (floatingDrawings.length > 0) {
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 4;
        ctx.shadowColor = "rgba(255, 255, 255, 0.65)";
        ctx.shadowBlur = 12;

        for (let i = 0; i < floatingDrawings.length; i++) {
          const shape = floatingDrawings[i];
          if (!shape || shape.localPoints.length < 2) continue;

          ctx.save();
          ctx.translate(shape.body.position.x, shape.body.position.y);
          ctx.rotate(shape.body.angle);
          ctx.strokeStyle = shape.color;

          ctx.beginPath();
          const first = shape.localPoints[0]!;
          ctx.moveTo(first.x, first.y);
          for (let j = 1; j < shape.localPoints.length; j++) {
            const pt = shape.localPoints[j]!;
            ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
          ctx.restore();
        }
        ctx.restore();
      }

      if (isDrawingStroke && currentStrokePoints.length > 1) {
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#34d399";
        ctx.shadowColor = "rgba(52, 211, 153, 0.8)";
        ctx.shadowBlur = 14;

        ctx.beginPath();
        const first = currentStrokePoints[0]!;
        ctx.moveTo(first.x, first.y);
        for (let i = 1; i < currentStrokePoints.length; i++) {
          const pt = currentStrokePoints[i]!;
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        ctx.restore();
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    Runner.run(runner, engine);
    rafId = requestAnimationFrame(renderLoop);

    // 13. Cleanup when user clicks Reset
    return () => {
      cancelAnimationFrame(rafId);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);

      interactionLayer.removeEventListener("pointerdown", onPointerDown);
      interactionLayer.removeEventListener("pointermove", onPointerMove);
      interactionLayer.removeEventListener("pointerup", onPointerUp);
      interactionLayer.removeEventListener("pointercancel", onPointerUp);

      interactionLayer.remove();
      sketchCanvas.remove();
      countdownBadge.remove();
      toolbar.remove();

      clonedElements.forEach((el) => el.remove());

      if (heroForeground) {
        heroForeground.style.opacity = prevForegroundOpacity;
        heroForeground.style.visibility = prevForegroundVisibility;
      }

      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.userSelect = prevUserSelect;
    };
  }, [active]);
}