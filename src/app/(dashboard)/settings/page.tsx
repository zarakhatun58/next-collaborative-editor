"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/api";

export default function SettingsPage() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [autoSync,setAutoSync] = useState(true);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);


  useEffect(()=>{

    async function loadProfile(){

      try {

        const {data} = await api.get("/auth/me");

        setName(data.user.name);
        setEmail(data.user.email);


        const saved =
          window.localStorage.getItem("autoSync");

        setAutoSync(saved !== "false");


      } catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }

    }


    loadProfile();

  },[]);



  const updateProfile = async()=>{

    try{

      setSaving(true);


      await api.patch("/auth/me",{
        name,
        email
      });


      alert("Profile updated");


    }catch(err){

      console.log(err);

    }finally{

      setSaving(false);

    }

  };



  const toggleSync=(value:boolean)=>{

    setAutoSync(value);

    window.localStorage.setItem(
      "autoSync",
      String(value)
    );

  };



  if(loading){
    return <div>Loading...</div>
  }


  return (

    <div className="max-w-3xl space-y-8">


      <div>
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage account preferences.
        </p>
      </div>



      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Profile
        </h2>


        <div className="space-y-4">


          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Name"
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
          />


          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
          />



          <button
            onClick={updateProfile}
            className="
            rounded-xl
            bg-gradient-to-r
            from-violet-600
            to-cyan-600
            px-5
            py-3
            "
          >

            {saving ? "Saving..." : "Save Changes"}

          </button>


        </div>

      </div>





      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Preferences
        </h2>


        <label className="flex items-center gap-3">


          <input
            type="checkbox"
            checked={autoSync}
            onChange={(e)=>toggleSync(e.target.checked)}
          />


          Auto Sync


        </label>


      </div>


    </div>

  );
}