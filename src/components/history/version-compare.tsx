"use client";

interface Props{
    version:any;
}

export default function VersionCompare({
    version,
}:Props){

if(!version){

return(

<div className="glass-card rounded-3xl p-8">

No Version Selected

</div>

);

}

return(

<div className="glass-card rounded-3xl p-6">

<h2 className="mb-5 text-xl font-bold">

{version.version}

</h2>

<div
className="prose prose-invert max-w-none"
dangerouslySetInnerHTML={{
__html:version.content
}}
/>

</div>

);

}