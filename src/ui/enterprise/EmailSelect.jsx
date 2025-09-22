import React, { useState } from "react";
import Select from "react-select";
import useGetUserUserNameEmail from "../../hooks/orgs/useGetUserUserNameEmail";

const EmailSelect = ({ selectedUsers, setSelectedUsers }) => {
  const [inputValue, setInputValue] = useState("");
  const { data: userData, isLoading } = useGetUserUserNameEmail(inputValue);

  const options = Array.isArray(userData)
    ? userData.map((user) => ({
        value: user.id,
        label: user.email,
      }))
    : userData
    ? [{ value: userData.id, label: userData.email }]
    : [];

  return (
    <div>
      <label className="form-label">البريد الإلكتروني</label>
      <Select
        isMulti
        isLoading={isLoading}
        options={options}
        value={selectedUsers}
        onChange={setSelectedUsers}
        onInputChange={(value) => setInputValue(value)}
        placeholder="اكتب البريد للبحث..."
        noOptionsMessage={() => "لا يوجد نتائج"}
      />
    </div>
  );
};

export default EmailSelect;
