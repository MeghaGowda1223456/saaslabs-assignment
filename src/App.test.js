import React from "react";
import { render, screen } from "@testing-library/react";
import ProjectsTable from "./pages/ProjectsTable";

test("renders the ProjectsTable component", () => {
  render(<ProjectsTable />);
  expect(
    screen.getByText(/Highly-Rated Kickstarter Projects/i)
  ).toBeInTheDocument();
});
