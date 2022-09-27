import { useState } from "react";
import React from "react";

export const SearchPanel = ({ users, param, setParam }) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          // setParam(Object.assign({}, param, { name: evt.target.value }));
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) => setParam({ ...param, personId: evt.target.value })}
        >
          <option value={""}>负责人</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
