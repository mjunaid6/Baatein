const AdminBG2 = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      
      {/* Small bubbles (far) */}
      <div className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-blue-400/40" />
      <div className="absolute bottom-14 left-14 w-3 h-3 rounded-full bg-blue-400/40" />
      <div className="absolute bottom-20 left-18 w-4 h-4 rounded-full bg-blue-400/40" />

      {/* Medium bubbles */}
      <div className="absolute bottom-28 left-24 w-8 h-8 rounded-full 
                      bg-blue-400/30 
                      shadow-[inset_0_0_10px_rgba(255,255,255,0.3)]" />

      <div className="absolute bottom-40 left-36 w-12 h-12 rounded-full 
                      bg-blue-400/25 
                      shadow-[inset_0_0_14px_rgba(255,255,255,0.25)]" />

      {/* Large bubbles (near) */}
      <div className="absolute bottom-52 left-52 w-20 h-20 rounded-full 
                      bg-blue-400/20 
                      shadow-[inset_0_0_20px_rgba(255,255,255,0.25)]" />

      <div className="absolute bottom-72 left-72 w-28 h-28 rounded-full 
                      bg-blue-400/15 
                      shadow-[inset_0_0_30px_rgba(255,255,255,0.25)]" />

      {/* Accent glow */}
      <div className="absolute bottom-96 left-96 w-40 h-40 rounded-full 
                      bg-cyan-300/10" />
    </div>
  );
};

export default AdminBG2;
