import React, { Fragment } from "react";

function DatasContainer({ datas }) {
  return (
    <>
      {datas.map((value, index) => (
        <Fragment key={index}>
          <ul className="mb-10 max-w-[30rem]">
            <li className="text-2xl font-bold">{value.message}</li>
            <li className="text-base">{value.title}</li>
            <li className="text-sm text-gray-500">{value.description}</li>
          </ul>
        </Fragment>
      ))}
    </>
  );
}

export default DatasContainer;
