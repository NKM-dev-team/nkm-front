import React from "react";
import Navbar from "./Navbar";
import { Container } from "@material-ui/core";

interface MyProps {
  children?: React.ReactNode;
}
export default function MainLayout({ children }: MyProps) {
  return (
    <>
      <Navbar />
      <Container>
        <>{children}</>
      </Container>
    </>
  );
}
