import { useEffect, useRef } from "react";
import { useVar } from "@/stores";

interface SimpleWaveAnimationProps {
    /** Variable name for wave speed */
    speedVarName?: string;
    /** Default speed if no variable */
    defaultSpeed?: number;
    /** Height of the visualization */
    height?: number;
}

/**
 * A simple animated wave visualization for introducing the concept of waves.
 * Shows a smooth, flowing wave that students can observe moving.
 */
export function SimpleWaveAnimation({
    speedVarName = "waveSpeed",
    defaultSpeed = 1,
    height = 300,
}: SimpleWaveAnimationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const timeRef = useRef(0);

    // Get wave speed from global variable store
    const speed = useVar(speedVarName, defaultSpeed) as number;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size to match container
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const animate = () => {
            const rect = canvas.getBoundingClientRect();
            const width = rect.width;
            const canvasHeight = rect.height;

            // Clear canvas
            ctx.clearRect(0, 0, width, canvasHeight);

            // Draw background gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
            gradient.addColorStop(0, "#f0f9ff");
            gradient.addColorStop(1, "#e0f2fe");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, canvasHeight);

            // Center line (equilibrium)
            const centerY = canvasHeight / 2;

            // Draw center line (dashed)
            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(width, centerY);
            ctx.stroke();
            ctx.setLineDash([]);

            // Wave parameters
            const amplitude = canvasHeight * 0.25;
            const wavelength = 150;
            const frequency = (2 * Math.PI) / wavelength;

            // Draw the wave
            ctx.strokeStyle = "#3b82f6";
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.beginPath();

            for (let x = 0; x <= width; x++) {
                const y = centerY + amplitude * Math.sin(frequency * x - timeRef.current * speed);
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            // Draw a moving dot on the wave to show the motion
            const dotX = width * 0.5;
            const dotY = centerY + amplitude * Math.sin(frequency * dotX - timeRef.current * speed);

            // Dot shadow
            ctx.fillStyle = "rgba(59, 130, 246, 0.3)";
            ctx.beginPath();
            ctx.arc(dotX, dotY + 3, 12, 0, Math.PI * 2);
            ctx.fill();

            // Main dot
            ctx.fillStyle = "#ef4444";
            ctx.beginPath();
            ctx.arc(dotX, dotY, 10, 0, Math.PI * 2);
            ctx.fill();

            // Dot highlight
            ctx.fillStyle = "#fca5a5";
            ctx.beginPath();
            ctx.arc(dotX - 3, dotY - 3, 4, 0, Math.PI * 2);
            ctx.fill();

            // Draw arrows to show up-down motion
            const arrowY = dotY < centerY ? dotY - 25 : dotY + 25;
            const arrowDirection = dotY < centerY ? -1 : 1;

            ctx.fillStyle = "#10b981";
            ctx.beginPath();
            ctx.moveTo(dotX, arrowY);
            ctx.lineTo(dotX - 8, arrowY + arrowDirection * 12);
            ctx.lineTo(dotX + 8, arrowY + arrowDirection * 12);
            ctx.closePath();
            ctx.fill();

            // Labels
            ctx.fillStyle = "#475569";
            ctx.font = "bold 14px system-ui, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText("↑ Up", 20, 30);
            ctx.fillText("↓ Down", 20, canvasHeight - 20);

            // Update time
            timeRef.current += 0.05;

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [speed]);

    return (
        <div className="w-full rounded-xl overflow-hidden shadow-lg border border-slate-200">
            <canvas
                ref={canvasRef}
                style={{ width: "100%", height: `${height}px` }}
                className="block"
            />
        </div>
    );
}
