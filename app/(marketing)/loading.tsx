export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-brand-bg">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-brand-border border-t-brand-crimson" />
        <p className="mt-5 font-heading text-xl font-bold text-brand-text-primary">
          TECH<span className="text-brand-crimson">AIM</span>
        </p>
      </div>
    </div>
  );
}
