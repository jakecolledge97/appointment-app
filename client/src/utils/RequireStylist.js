import React from "react";
import { Navigate } from "react-router-dom";
import UnauthourisedPage from "../main/unauthorised/UnauthourisedPage";
import { useAuthContext } from "./AuthContext";
import { RequireAuth } from "./RequireAuth";

export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  MANAGER: "MANAGER",
};

export default function RequireRole({ children, requiredRole }) {
  const { userData } = useAuthContext();

  const userHasCorrectRole = () => {
      return userData?.data?.stylist;
  };
  return (
    // <RequireAuth>
    <>
      {userHasCorrectRole() ? children : <UnauthourisedPage/>}
    </>
    // </RequireAuth>
  );
}