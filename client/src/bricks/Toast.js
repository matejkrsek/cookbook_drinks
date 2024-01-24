import React, { useRef } from "react";

function Toast() {
  const toast = useRef(null);

  return toast.current.show({
    severity: "danger",
    summary: "Fail",
    detail: `Are you sure you want to delete this recipe?`,
    life: 3000,
  });
}

export default Toast;
