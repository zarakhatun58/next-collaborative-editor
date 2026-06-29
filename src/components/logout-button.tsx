"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton(){

const router=useRouter();

const logout=()=>{

localStorage.removeItem("token");

router.replace("/login");

}

return(

<button
onClick={logout}
className="rounded-lg bg-red-600 px-4 py-2"
>

Logout

</button>

);

}