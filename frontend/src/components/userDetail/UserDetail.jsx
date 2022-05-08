import React from "react";

const UserDetail = () => {
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="">City</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">City</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">
            Relationship(1: Single, 2: Couple, 3: Complecated)
          </label>
          <input type="number" max={3} />
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
