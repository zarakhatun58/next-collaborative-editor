export default function Collaborators() {
  const users = [
    "JK",
    "RA",
    "AM",
  ];

  return (
    <div className="flex items-center gap-2">
      {users.map((user) => (
        <div
          key={user}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-violet-500 to-cyan-500 text-sm font-bold"
        >
          {user}
        </div>
      ))}
    </div>
  );
}