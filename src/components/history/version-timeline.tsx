"use client";

import { Clock, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/src/lib/api";

interface Props {
  versions: any[];
  selected: any;
  onSelect: (v: any) => void;
  reload: () => void;
}

export default function VersionTimeline({
  versions,
  selected,
  onSelect,
  reload,
}: Props) {

async function restore(id:string){
    try{
       await api.patch("/versions", {
  versionId: id,
});
        reload();
    }catch(err){
        console.log(err);
    }

}

return(

<div className="space-y-4">

{versions.map((version,index)=>(

<motion.div
key={version.id}
initial={{opacity:0,x:-20}}
animate={{opacity:1,x:0}}
transition={{delay:index*.05}}
onClick={()=>onSelect(version)}
className={`cursor-pointer rounded-3xl border p-5
${
selected?.id===version.id
?"border-violet-500 bg-violet-500/10"
:"border-white/10 bg-white/5"
}`}
>

<div className="flex justify-between">

<div>

<h3 className="font-semibold">
{version.version}
</h3>

<p className="text-zinc-400">
{version.author}
</p>

<div className="mt-2 flex items-center gap-2 text-sm">

<Clock size={14}/>

{new Date(version.createdAt).toLocaleString()}

</div>

</div>

<button
onClick={(e)=>{

e.stopPropagation();

restore(version.id);

}}
className="rounded-xl border border-violet-500/30 px-4 py-2 hover:bg-violet-500/10"
>

<RotateCcw size={16}/>

</button>

</div>

</motion.div>

))}

</div>

);

}