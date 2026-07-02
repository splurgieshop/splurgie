export default function ProductImage({ product, className = "" }) {
  const overlay = (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.08)_0%,transparent_40%)]" />
      <div className="absolute bottom-4 left-4 h-12 w-12 rounded-full bg-white/20 blur-sm" />
      <div className="absolute right-6 top-6 h-8 w-8 rounded-full bg-white/15 blur-sm" />
    </>
  );

  const isTailwindGradient = product.gradient?.startsWith("from-");

  if (isTailwindGradient) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${product.gradient} ${className}`}
      >
        {overlay}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: product.gradient }}
    >
      {overlay}
    </div>
  );
}
