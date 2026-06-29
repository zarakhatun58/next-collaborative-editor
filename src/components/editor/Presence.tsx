"use client";

import { Wifi } from "lucide-react";

interface User {
  id: string;
  name: string;
  color: string;
}

interface Props {
  users: User[];
}

export default function Presence({
  users,
}: Props) {
  return (
    <div className="glass-card rounded-3xl p-5">

      <div className="mb-5 flex items-center gap-2">

        <Wifi
          size={18}
          className="text-green-400"
        />

        <h3 className="font-semibold">
          Active Users
        </h3>

      </div>

      <div className="space-y-4">

        {users.map((user) => (

          <div
            key={user.id}
            className="flex items-center gap-3"
          >

            <div
              className="h-10 w-10 rounded-full"
              style={{
                background: user.color,
              }}
            />

            <div>

              <p className="font-medium">
                {user.name}
              </p>

              <p className="text-xs text-green-400">
                Online
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}