import React, { useState } from "react";
import AsyncSelect from "../../components/AsyncSelect/AsyncSelect";
import axios from "axios";

function AssingToOthers() {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchUserOptions = async (query) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    return data
      .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
      .map((user) => ({
        label: user.name,
        value: user.id,
      }));
  };

  return (
    <>
      <AsyncSelect
        label="Search Users"
        multiple
        value={selectedUsers}
        onChange={setSelectedUsers}
        fetchOptions={fetchUserOptions}
        onSelectOption={(item) => console.log("Selected:", item)}
        onClearAll={() => console.log("Cleared all")}
      />
    </>
  );
}

export default AssingToOthers;
