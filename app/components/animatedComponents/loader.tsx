/**
 * Reusable Loader Component
 * 
 * A spinning loader with radial gradient border animation
 * 
 * @example
 * // Small loader
 * <Loader size="sm" />
 * 
 * // Medium loader (default)
 * <Loader />
 * 
 * // Large loader with custom class
 * <Loader size="lg" className="text-primary" />
 */

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-6 h-6", // 24x24
  md: "w-8 h-8", // 32x32
  lg: "w-12 h-12", // 48x48
  xl: "w-16 h-16", // 64x64
};

export default function Loader({ size = "md", className = "" }: LoaderProps) {
  const baseClasses = `relative ${sizeMap[size]} ${className}`;
  
  return (
    <div className={baseClasses}>
      {/* Outer spinning gradient border */}
      <div 
        className="absolute inset-0 rounded-full animate-spin"
        style={{
          background: `radial-gradient(100% 100% at 50% 2.08%, #2563EB 0%, #FFFFFF 100%)`,
          borderRadius: '50%',
        }}
      >
        {/* Inner circle with background - creates the border effect */}
        <div 
          className="absolute inset-1 rounded-full bg-background"
          style={{
            background: 'var(--background, white)',
          }}
        />
      </div>
    </div>
  );
}

// Export the props type for TypeScript usage
export type { LoaderProps };
