import React from "react";

const AssignAgent = () => {
  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    
    const pickedUpDetails = {
      agentName: formData.agent,
      agentAssigned: true,
    };
    console.log("pickedUpDetails", pickedUpDetails);
  }
  return (
    <div className="w-full flex flex-col my-5 text-sm max-sm:text-xs">
      <hr />
      <p className="text-center font-serif text-xl text-wrap max-sm:text-sm my-5">
        Assign An Agent For Order PickUp
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center justify-center gap-2"
      >
        <p>Assign Agent</p>
        <select name="agent" className="p-1 border rounded" required>
          <option value="">Select An Agent</option>
          <option value="Shouaib Ahmed">Shouaib Ahmed</option>
          <option value="Nizam Khan">Nizam Khan</option>
          <option value="Ameer Ahmed">Ameer Ahmed</option>
        </select>
        <button className="px-2 py-1 border rounded bg-green-600 text-white hover:bg-green-700">
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignAgent;
