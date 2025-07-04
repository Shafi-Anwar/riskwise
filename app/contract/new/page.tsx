// app/contracts/new/page.tsx
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function NewContractPage() {
  const [title, setTitle] = useState("");
  const [contract, setContract] = useState("");

  const generateContract = async () => {
    const res = await fetch("/api/contracts", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    setContract(data.generated);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create a Smart Contract</h1>
      <input
        type="text"
        placeholder="Project title"
        className="w-full mb-4 p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button onClick={generateContract}>Generate</Button>
      {contract && (
        <Textarea
          className="mt-6 w-full"
          rows={10}
          readOnly
          value={contract}
        />
      )}
    </div>
  );
}
