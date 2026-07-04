"use client";

interface User {
  id: string;
  email: string;
}

interface Props {
  users: User[];
}

export default function Collaborators({
  users,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">

      {users.length === 0 && (
        <span className="text-sm text-zinc-500">
          No collaborators online
        </span>
      )}

      {users.map((user) => {

        const initials = user.email
          .substring(0, 2)
          .toUpperCase();

        return (
          <div
            key={user.id}
            title={user.email}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-violet-500 to-cyan-500 text-sm font-bold text-white"
          >
            {initials}
          </div>
        );

      })}

    </div>
  );
}